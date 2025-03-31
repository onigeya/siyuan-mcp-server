import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { client } from '../utils/client.js';

export function registerFileTools(server: McpServer): void {
    // Get file
    server.tool(
        'siyuan_file_getFile',
        'Get file',
        {
            path: z.string().describe('The file path under the workspace path')
        },
        async ({ path }) => {
            const result = await client.post('/api/file/getFile', {
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

    // Put file
    server.tool(
        'siyuan_file_putFile',
        'Put file',
        {
            path: z.string().describe('The file path under the workspace path'),
            isDir: z.boolean().optional().describe('Whether it is a directory'),
            modTime: z.number().optional().describe('Modification time'),
            file: z.any().optional().describe('File content')
        },
        async ({ path, isDir, modTime, file }) => {
            const formData = new FormData();
            formData.append('path', path);
            if (isDir !== undefined) formData.append('isDir', String(isDir));
            if (modTime !== undefined) formData.append('modTime', String(modTime));
            if (file !== undefined) formData.append('file', file);
            
            const result = await client.post('/api/file/putFile', formData);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Remove file
    server.tool(
        'siyuan_file_removeFile',
        'Remove file',
        {
            path: z.string().describe('The file path under the workspace path')
        },
        async ({ path }) => {
            const result = await client.post('/api/file/removeFile', {
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

    // Rename file
    server.tool(
        'siyuan_file_renameFile',
        'Rename file',
        {
            path: z.string().describe('The file path under the workspace path'),
            newPath: z.string().describe('The new file path under the workspace path')
        },
        async ({ path, newPath }) => {
            const result = await client.post('/api/file/renameFile', {
                path,
                newPath
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // List files
    server.tool(
        'siyuan_file_readDir',
        'List files',
        {
            path: z.string().describe('The dir path under the workspace path')
        },
        async ({ path }) => {
            const result = await client.post('/api/file/readDir', {
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
} 