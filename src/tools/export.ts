import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { client } from '../utils/client.js';

export function registerExportTools(server: McpServer): void {
    // Export Markdown
    server.tool(
        'siyuan_export_exportMdContent',
        '导出 Markdown 内容',
        {
            id: z.string().describe('要导出的文档块 ID')
        },
        async ({ id }) => {
            const result = await client.post('/api/export/exportMdContent', {
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

    // Export files and folders
    server.tool(
        'siyuan_export_exportResources',
        '导出文件和文件夹',
        {
            paths: z.array(z.string()).describe('要导出的文件或文件夹路径列表'),
            name: z.string().optional().describe('导出的文件名，默认为 export-YYYY-MM-DD_hh-mm-ss.zip')
        },
        async ({ paths, name }) => {
            const result = await client.post('/api/export/exportResources', {
                paths,
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
} 