import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { client } from '../utils/client.js';

export function registerExportTools(server: McpServer): void {
    // Export Markdown
    server.tool(
        'siyuan_export_exportMdContent',
        'Export Markdown',
        {
            id: z.string().describe('ID of the doc block to export')
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
        'Export files and folders',
        {
            paths: z.array(z.string()).describe('A list of file or folder paths to be exported, the same filename/folder name will be overwritten'),
            name: z.string().optional().describe('The exported file name, which defaults to export-YYYY-MM-DD_hh-mm-ss.zip when not set')
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