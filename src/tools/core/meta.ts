import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { ToolRegistry, Command, Query } from './types.js';

// 格式化文档输出
function formatDocumentation(type: string, item: Command | Query) {
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
}

// 注册查询
export function registerMetaTools(server: McpServer) {
    // 获取所有可用的命令和查询列表
    ToolRegistry.registerQuery({
        type: 'listTools',
        description: '获取所有可用的命令和查询列表',
        params: {
            random_string: z.string().optional().describe('Dummy parameter for no-parameter tools')
        },
        documentation: {
            description: '获取所有可用的命令和查询列表',
            returns: {
                type: 'object',
                description: '返回所有可用的命令和查询列表',
                properties: {
                    commands: {
                        type: 'array',
                        description: '命令列表'
                    },
                    queries: {
                        type: 'array',
                        description: '查询列表'
                    }
                }
            },
            examples: [{
                description: '获取所有工具列表',
                params: {},
                response: {
                    commands: [
                        { type: 'documents.createDocWithMd', description: '使用Markdown创建文档' }
                    ],
                    queries: [
                        { type: 'documents.getHPathByPath', description: '根据路径获取人类可读路径' }
                    ]
                }
            }]
        }
    });

    // man工具 - 获取命令或查询的详细说明
    ToolRegistry.registerQuery({
        type: 'man',
        description: '获取指定命令或查询的详细说明',
        params: {
            type: z.string().describe('命令或查询的类型')
        },
        documentation: {
            description: '获取指定命令或查询的详细说明',
            params: {
                type: {
                    type: 'string',
                    description: '命令或查询的类型',
                    required: true
                }
            },
            returns: {
                type: 'string',
                description: '返回命令或查询的详细说明(Markdown格式)'
            },
            examples: [{
                description: '获取createDocWithMd命令的说明',
                params: {
                    type: 'documents.createDocWithMd'
                },
                response: {
                    description: '使用Markdown创建文档',
                    params: {
                        notebook: '笔记本ID',
                        path: '文档路径',
                        markdown: 'Markdown内容'
                    }
                }
            }]
        }
    });

    // 注册工具
    server.tool(
        'listTools',
        '获取所有可用的命令和查询列表',
        {
            random_string: z.string().optional().describe('Dummy parameter for no-parameter tools')
        },
        async () => {
            const commands = ToolRegistry.getAllCommands();
            const queries = ToolRegistry.getAllQueries();
            
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify({
                        commands: commands.map(c => ({ type: c.type, description: c.description })),
                        queries: queries.map(q => ({ type: q.type, description: q.description }))
                    })
                }]
            };
        }
    );

    server.tool(
        'man',
        '获取指定命令或查询的详细说明',
        {
            type: z.string().describe('命令或查询的类型')
        },
        async ({ type }: { type: string }) => {
            const command = ToolRegistry.getCommand(type);
            const query = ToolRegistry.getQuery(type);
            
            if (!command && !query) {
                throw new Error(`未找到类型为 "${type}" 的命令或查询`);
            }
            
            const item = command || query!;
            if (!item.documentation) {
                // 如果没有文档,返回基本信息
                return {
                    content: [{
                        type: "text",
                        text: `# ${type}\n\n## 描述\n${item.description}\n\n## 参数\n暂无详细文档\n`
                    }]
                };
            }

            let output = `# ${type}\n\n`;
            
            // 描述
            output += `## 描述\n${item.documentation?.description || item.description}\n\n`;
            
            // 参数
            if (item.documentation?.params) {
                output += `## 参数\n`;
                for (const [key, param] of Object.entries(item.documentation.params)) {
                    output += `* \`${key}\`: ${param.type}${param.required ? ' (必需)' : ' (可选)'}\n  * ${param.description}\n`;
                }
                output += '\n';
            }
            
            // 返回值
            if (item.documentation?.returns) {
                output += `## 返回值\n`;
                output += `* 类型: ${item.documentation.returns.type}\n`;
                output += `* 描述: ${item.documentation.returns.description}\n`;
                if (item.documentation.returns.properties) {
                    output += `* 属性:\n`;
                    for (const [key, prop] of Object.entries(item.documentation.returns.properties)) {
                        output += `  * \`${key}\`: ${prop.type}\n    * ${prop.description}\n`;
                    }
                }
                output += '\n';
            }
            
            // 示例
            if (item.documentation?.examples && item.documentation.examples.length > 0) {
                output += `## 示例\n`;
                item.documentation.examples.forEach((example, index) => {
                    output += `### 示例 ${index + 1}: ${example.description}\n`;
                    output += `请求参数:\n\`\`\`json\n${JSON.stringify(example.params, null, 2)}\n\`\`\`\n\n`;
                    output += `响应:\n\`\`\`json\n${JSON.stringify(example.response, null, 2)}\n\`\`\`\n\n`;
                });
            }
            
            // API文档链接
            if (item.documentation?.apiLink) {
                output += `## 参考\n[官方API文档](${item.documentation.apiLink})\n`;
            }
            
            return {
                content: [{
                    type: "text",
                    text: output
                }]
            };
        }
    );
} 