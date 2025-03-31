import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { client } from '../utils/client.js';

export function registerDocumentTools(server: McpServer): void {
    // Create a document with Markdown
    server.tool(
        'siyuan_filetree_createDocWithMd',
        'Create a document with Markdown',
        {
            notebook: z.string().describe('Notebook ID'),
            path: z.string().describe('Document path, starting with /, using / as the level separator'),
            markdown: z.string().describe('GFM Markdown content')
        },
        async ({ notebook, path, markdown }) => {
            const result = await client.post('/api/filetree/createDocWithMd', {
                notebook,
                path,
                markdown
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Rename a document
    server.tool(
        'siyuan_filetree_renameDoc',
        'Rename a document',
        {
            notebook: z.string().describe('Notebook ID'),
            path: z.string().describe('Document path'),
            title: z.string().describe('New title')
        },
        async ({ notebook, path, title }) => {
            const result = await client.post('/api/filetree/renameDoc', {
                notebook,
                path,
                title
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Rename a document by ID
    server.tool(
        'siyuan_filetree_renameDocByID',
        'Rename a document by ID',
        {
            id: z.string().describe('Document ID'),
            title: z.string().describe('New title')
        },
        async ({ id, title }) => {
            const result = await client.post('/api/filetree/renameDocByID', {
                id,
                title
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Remove a document
    server.tool(
        'siyuan_filetree_removeDoc',
        'Remove a document',
        {
            notebook: z.string().describe('Notebook ID'),
            path: z.string().describe('Document path')
        },
        async ({ notebook, path }) => {
            const result = await client.post('/api/filetree/removeDoc', {
                notebook,
                path
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Remove a document by ID
    server.tool(
        'siyuan_filetree_removeDocByID',
        'Remove a document by ID',
        {
            id: z.string().describe('Document ID')
        },
        async ({ id }) => {
            const result = await client.post('/api/filetree/removeDocByID', {
                id
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Move documents
    server.tool(
        'siyuan_filetree_moveDocs',
        'Move documents',
        {
            fromPaths: z.array(z.string()).describe('Source paths'),
            toNotebook: z.string().describe('Target notebook ID'),
            toPath: z.string().describe('Target path')
        },
        async ({ fromPaths, toNotebook, toPath }) => {
            const result = await client.post('/api/filetree/moveDocs', {
                fromPaths,
                toNotebook,
                toPath
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Move documents by ID
    server.tool(
        'siyuan_filetree_moveDocsByID',
        'Move documents by ID',
        {
            fromIDs: z.array(z.string()).describe('Source docs\' IDs'),
            toID: z.string().describe('Target parent ID')
        },
        async ({ fromIDs, toID }) => {
            const result = await client.post('/api/filetree/moveDocsByID', {
                fromIDs,
                toID
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Get human-readable path based on path
    server.tool(
        'siyuan_filetree_getHPathByPath',
        'Get human-readable path based on path',
        {
            notebook: z.string().describe('Notebook ID'),
            path: z.string().describe('Document path')
        },
        async ({ notebook, path }) => {
            const result = await client.post('/api/filetree/getHPathByPath', {
                notebook,
                path
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Get human-readable path based on ID
    server.tool(
        'siyuan_filetree_getHPathByID',
        'Get human-readable path based on ID',
        {
            id: z.string().describe('Block ID')
        },
        async ({ id }) => {
            const result = await client.post('/api/filetree/getHPathByID', {
                id
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Get storage path based on ID
    server.tool(
        'siyuan_filetree_getPathByID',
        'Get storage path based on ID',
        {
            id: z.string().describe('Block ID')
        },
        async ({ id }) => {
            const result = await client.post('/api/filetree/getPathByID', {
                id
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Get IDs based on human-readable path
    server.tool(
        'siyuan_filetree_getIDsByHPath',
        'Get IDs based on human-readable path',
        {
            path: z.string().describe('Human-readable path'),
            notebook: z.string().describe('Notebook ID')
        },
        async ({ path, notebook }) => {
            const result = await client.post('/api/filetree/getIDsByHPath', {
                path,
                notebook
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