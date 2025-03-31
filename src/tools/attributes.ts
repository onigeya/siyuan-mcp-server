import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { client } from '../utils/client.js';

export function registerAttributesTools(server: McpServer): void {
    // Set block attributes
    server.tool(
        'siyuan_attr_setBlockAttrs',
        '设置块属性',
        {
            id: z.string().describe('块 ID'),
            attrs: z.record(z.string()).describe('属性键值对')
        },
        async ({ id, attrs }) => {
            const result = await client.post('/api/attr/setBlockAttrs', {
                id,
                attrs
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Get block attributes
    server.tool(
        'siyuan_attr_getBlockAttrs',
        '获取块属性',
        {
            id: z.string().describe('块 ID')
        },
        async ({ id }) => {
            const result = await client.post('/api/attr/getBlockAttrs', {
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
} 