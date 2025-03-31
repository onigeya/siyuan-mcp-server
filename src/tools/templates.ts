import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { client } from '../utils/client.js';

export function registerTemplatesTools(server: McpServer): void {
    // Render template
    server.tool(
        'siyuan_template_render',
        'Render a template',
        {
            id: z.string().describe('Template document block ID'),
            path: z.string().optional().describe('Optional target path')
        },
        async ({ id, path }) => {
            const result = await client.post('/api/template/render', {
                id,
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

    // Render Sprig
    server.tool(
        'siyuan_template_renderSprig',
        'Render Sprig',
        {
            template: z.string().describe('Sprig template content')
        },
        async ({ template }) => {
            const result = await client.post('/api/template/renderSprig', {
                template
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