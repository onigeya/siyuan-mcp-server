import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { client } from '../utils/client.js';

export function registerFileTools(server: McpServer): void {
    // Get file
    server.tool(
        'siyuan_file_getFile',
        '获取文件',
        {
            path: z.string().describe('文件路径')
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
        '写入文件',
        {
            path: z.string().describe('文件路径'),
            isDir: z.boolean().optional().describe('是否为目录'),
            modTime: z.number().optional().describe('修改时间'),
            file: z.any().optional().describe('文件内容')
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
        '删除文件',
        {
            path: z.string().describe('文件路径')
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
        '重命名文件',
        {
            path: z.string().describe('原文件路径'),
            newPath: z.string().describe('新文件路径')
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
        '列出目录内容',
        {
            path: z.string().describe('目录路径')
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