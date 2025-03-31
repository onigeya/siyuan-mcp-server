import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { client } from '../utils/client.js';

export function registerTemplatesTools(server: McpServer): void {
    // Render template
    server.tool(
        'siyuan_template_render',
        '渲染模板',
        {
            id: z.string().describe('模板文档块 ID'),
            path: z.string().optional().describe('可选的目标路径')
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
        '渲染 Sprig 模板',
        {
            template: z.string().describe('Sprig 模板内容')
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