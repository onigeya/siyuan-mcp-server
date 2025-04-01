import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { ToolRegistry, CommandRequest } from './types.js';
import { notebookCommands } from './handlers/notebooks.js';
import { assetsCommands } from './handlers/assets.js';
import { attributesCommands } from './handlers/attributes.js';
import { blocksCommands } from './handlers/blocks.js';
import { conversionCommands } from './handlers/conversion.js';
import { documentsCommands } from './handlers/documents.js';
import { fileCommands } from './handlers/file.js';
import { notificationCommands } from './handlers/notification.js';
import { sqlCommands } from './handlers/sql.js';
import { templatesCommands } from './handlers/templates.js';

// 命令执行器映射表
const commandExecutors = {
    // 笔记本命令
    'notebook.create': notebookCommands.createNotebook,
    'notebook.remove': notebookCommands.removeNotebook,
    'notebook.rename': notebookCommands.renameNotebook,
    'notebook.setConf': notebookCommands.setNotebookConf,
    'notebook.open': notebookCommands.openNotebook,
    'notebook.close': notebookCommands.closeNotebook,

    // 资源命令
    'assets.upload': assetsCommands.upload,

    // 属性命令
    'attributes.setBlockAttrs': attributesCommands.setBlockAttrs,

    // 块命令
    'blocks.insert': blocksCommands.insertBlock,
    'blocks.prepend': blocksCommands.prependBlock,
    'blocks.append': blocksCommands.appendBlock,
    'blocks.update': blocksCommands.updateBlock,
    'blocks.delete': blocksCommands.deleteBlock,
    'blocks.move': blocksCommands.moveBlock,
    'blocks.fold': blocksCommands.foldBlock,
    'blocks.unfold': blocksCommands.unfoldBlock,
    'blocks.transferRef': blocksCommands.transferBlockRef,

    // 转换命令
    'conversion.pandoc': conversionCommands.pandoc,

    // 文档命令
    'documents.createDocWithMd': documentsCommands.createDocWithMd,
    'documents.rename': documentsCommands.renameDoc,
    'documents.renameById': documentsCommands.renameDocByID,
    'documents.remove': documentsCommands.removeDoc,
    'documents.removeById': documentsCommands.removeDocByID,
    'documents.move': documentsCommands.moveDocs,
    'documents.moveById': documentsCommands.moveDocsByID,

    // 文件命令
    'file.put': fileCommands.putFile,
    'file.remove': fileCommands.removeFile,

    // 通知命令
    'notification.push': notificationCommands.pushMsg,
    'notification.pushError': notificationCommands.pushErrMsg,

    // SQL命令
    'sql.flushTransaction': sqlCommands.flushTransaction,

    // 模板命令
    'templates.render': templatesCommands.render,
};

export function registerCommandTools(server: McpServer) {
    server.tool(
        'executeCommand',
        '执行指定的命令',
        {
            type: z.string().describe('命令类型'),
            params: z.record(z.unknown()).optional().describe('命令参数')
        },
        async (request: CommandRequest) => {
            const command = ToolRegistry.getCommand(request.type);
            if (!command) {
                throw new Error(`未找到命令类型: ${request.type}`);
            }

            const executor = commandExecutors[request.type];
            if (!executor) {
                throw new Error(`未找到命令执行器: ${request.type}`);
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