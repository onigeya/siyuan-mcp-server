import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { client } from '../utils/client.js';

// Notebook related schemas
const NotebookSchema = {
    id: z.string().describe('Notebook ID'),
    name: z.string().describe('Notebook name'),
    icon: z.string().describe('Notebook icon'),
    sort: z.number().describe('Sort number'),
    closed: z.boolean().describe('Whether the notebook is closed')
} as const;

const NotebookConfSchema = {
    name: z.string().describe('Notebook name'),
    closed: z.boolean().describe('Whether the notebook is closed'),
    refCreateSavePath: z.string().describe('Reference creation save path'),
    createDocNameTemplate: z.string().describe('Document name creation template')
} as const;

// 参数 Schema 定义
const OpenNotebookSchema = {
    notebookId: z.string().describe('笔记本 ID')
} as const;

const RenameNotebookSchema = {
    notebookId: z.string().describe('笔记本 ID'),
    name: z.string().describe('新的笔记本名称')
} as const;

const CreateNotebookSchema = {
    name: z.string().describe('笔记本名称')
} as const;

const NotebookConfParamsSchema = {
    notebookId: z.string().describe('笔记本 ID'),
    conf: z.object(NotebookConfSchema).describe('笔记本配置')
} as const;

export function registerNotebookTools(server: McpServer): void {
    // List notebooks
    server.tool(
        'siyuan_notebook_lsNotebooks',
        'List notebooks',
        async () => {
            const result = await client.post('/api/notebook/lsNotebooks');
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Open a notebook
    server.tool(
        'siyuan_notebook_openNotebook',
        'Open a notebook',
        {
            notebookId: z.string().describe('Notebook ID')
        },
        async ({ notebookId }) => {
            const result = await client.post('/api/notebook/openNotebook', {
                notebook: notebookId
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Close a notebook
    server.tool(
        'siyuan_notebook_closeNotebook',
        'Close a notebook',
        {
            notebookId: z.string().describe('Notebook ID')
        },
        async ({ notebookId }) => {
            const result = await client.post('/api/notebook/closeNotebook', {
                notebook: notebookId
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Rename a notebook
    server.tool(
        'siyuan_notebook_renameNotebook',
        'Rename a notebook',
        {
            notebookId: z.string().describe('Notebook ID'),
            name: z.string().describe('New name for notebook')
        },
        async ({ notebookId, name }) => {
            const result = await client.post('/api/notebook/renameNotebook', {
                notebook: notebookId,
                name
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Create a notebook
    server.tool(
        'siyuan_notebook_createNotebook',
        'Create a notebook',
        {
            name: z.string().describe('Notebook name')
        },
        async ({ name }) => {
            const result = await client.post('/api/notebook/createNotebook', {
                name
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Remove a notebook
    server.tool(
        'siyuan_notebook_removeNotebook',
        'Remove a notebook',
        {
            notebookId: z.string().describe('Notebook ID')
        },
        async ({ notebookId }) => {
            const result = await client.post('/api/notebook/removeNotebook', {
                notebook: notebookId
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Get notebook configuration
    server.tool(
        'siyuan_notebook_getNotebookConf',
        'Get notebook configuration',
        {
            notebookId: z.string().describe('Notebook ID')
        },
        async ({ notebookId }) => {
            const result = await client.post('/api/notebook/getNotebookConf', {
                notebook: notebookId
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Save notebook configuration
    server.tool(
        'siyuan_notebook_setNotebookConf',
        'Save notebook configuration',
        {
            notebookId: z.string().describe('Notebook ID'),
            conf: z.object({
                name: z.string().describe('Notebook name'),
                closed: z.boolean().describe('Whether the notebook is closed'),
                refCreateSavePath: z.string().describe('Reference creation save path'),
                createDocNameTemplate: z.string().describe('Document name creation template')
            }).describe('Notebook configuration')
        },
        async ({ notebookId, conf }) => {
            const result = await client.post('/api/notebook/setNotebookConf', {
                notebook: notebookId,
                conf
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );
}