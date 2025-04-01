import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { ToolRegistry, QueryRequest } from './types.js';
import { notebookQueries } from './handlers/notebooks.js';
import { attributesQueries } from './handlers/attributes.js';
import { blocksQueries } from './handlers/blocks.js';
import { documentsQueries } from './handlers/documents.js';
import { fileQueries } from './handlers/file.js';
import { sqlQueries } from './handlers/sql.js';
import { systemQueries } from './handlers/system.js';
import { templatesQueries } from './handlers/templates.js';

// 查询执行器映射表
const queryExecutors = {
    // 元数据查询
    'listTools': async () => {
        const commands = ToolRegistry.getAllCommands();
        const queries = ToolRegistry.getAllQueries();
        return {
            commands: commands.map(c => ({ type: c.type, description: c.description })),
            queries: queries.map(q => ({ type: q.type, description: q.description }))
        };
    },
    'man': async ({ type }: { type: string }) => {
        const command = ToolRegistry.getCommand(type);
        const query = ToolRegistry.getQuery(type);
        
        if (!command && !query) {
            throw new Error(`未找到类型为 "${type}" 的命令或查询`);
        }
        
        const item = command || query!;
        if (!item.documentation) {
            // 如果没有文档,返回基本信息
            return `# ${type}\n\n## 描述\n${item.description}\n\n## 参数\n暂无详细文档\n`;
        }

        const doc = item.documentation;
        let output = `# ${type}\n\n`;
        
        // 描述
        output += `## 描述\n${doc.description}\n\n`;
        
        // 参数
        if (doc.params) {
            output += `## 参数\n`;
            for (const [key, param] of Object.entries(doc.params)) {
                output += `* \`${key}\`: ${param.type}${param.required ? ' (必需)' : ' (可选)'}\n  * ${param.description}\n`;
            }
            output += '\n';
        }
        
        // 返回值
        if (doc.returns) {
            output += `## 返回值\n`;
            output += `* 类型: ${doc.returns.type}\n`;
            output += `* 描述: ${doc.returns.description}\n`;
            if (doc.returns.properties) {
                output += `* 属性:\n`;
                for (const [key, prop] of Object.entries(doc.returns.properties)) {
                    output += `  * \`${key}\`: ${prop.type}\n    * ${prop.description}\n`;
                }
            }
            output += '\n';
        }
        
        // 示例
        if (doc.examples && doc.examples.length > 0) {
            output += `## 示例\n`;
            doc.examples.forEach((example, index) => {
                output += `### 示例 ${index + 1}: ${example.description}\n`;
                output += `请求参数:\n\`\`\`json\n${JSON.stringify(example.params, null, 2)}\n\`\`\`\n\n`;
                output += `响应:\n\`\`\`json\n${JSON.stringify(example.response, null, 2)}\n\`\`\`\n\n`;
            });
        }
        
        // API文档链接
        if (doc.apiLink) {
            output += `## 参考\n[官方API文档](${doc.apiLink})\n`;
        }
        
        return output;
    },

    // 笔记本查询
    'notebook.list': notebookQueries.lsNotebooks,
    'notebook.getConf': notebookQueries.getNotebookConf,

    // 属性查询
    'attributes.getBlockAttrs': attributesQueries.getBlockAttrs,

    // 块查询
    'blocks.getKramdown': blocksQueries.getBlockKramdown,
    'blocks.getChildren': blocksQueries.getChildBlocks,

    // 文档查询
    'documents.getHPathByPath': documentsQueries.getHPathByPath,
    'documents.getHPathById': documentsQueries.getHPathByID,
    'documents.getPathById': documentsQueries.getPathByID,
    'documents.getIdsByHPath': documentsQueries.getIDsByHPath,

    // 文件查询
    'file.get': fileQueries.getFile,
    'file.list': fileQueries.readDir,

    // SQL查询
    'sql.query': sqlQueries.sql,

    // 系统查询
    'system.bootProgress': systemQueries.getBootProgress,
    'system.version': systemQueries.getVersion,
    'system.currentTime': systemQueries.getCurrentTime,

    // 模板查询
    'templates.renderSprig': templatesQueries.renderSprig,
};

export function registerQueryTools(server: McpServer) {
    server.tool(
        'executeQuery',
        '执行指定的查询',
        {
            type: z.string().describe('查询类型'),
            params: z.record(z.unknown()).optional().describe('查询参数')
        },
        async (request: QueryRequest) => {
            const query = ToolRegistry.getQuery(request.type);
            if (!query) {
                throw new Error(`未找到查询类型: ${request.type}`);
            }

            const executor = queryExecutors[request.type];
            if (!executor) {
                throw new Error(`未找到查询执行器: ${request.type}`);
            }

            try {
                const result = await executor(request.params || {});
                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify({
                            success: true,
                            data: result
                        })
                    }]
                };
            } catch (error) {
                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify({
                            success: false,
                            error: error instanceof Error ? error.message : String(error)
                        })
                    }]
                };
            }
        }
    );
} 