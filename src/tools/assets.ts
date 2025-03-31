import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { client } from '../utils/client.js';

export function registerAssetsTools(server: McpServer): void {
    // Upload assets
    server.tool(
        'siyuan_assets_upload',
        'Upload assets',
        {
            file: z.any().describe('The file to upload')
        },
        async ({ file }) => {
            const formData = new FormData();
            formData.append('file', file);
            
            const result = await client.post('/api/asset/upload', formData);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );
} 