import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { client } from '../utils/client.js';

export function registerNotificationTools(server: McpServer): void {
    // Push message
    server.tool(
        'siyuan_notification_pushMsg',
        'Push message',
        {
            msg: z.string().describe('Message content'),
            timeout: z.number().optional().describe('The duration of the message display in milliseconds. This field can be omitted, the default is 7000 milliseconds')
        },
        async ({ msg, timeout }) => {
            const result = await client.post('/api/notification/pushMsg', {
                msg,
                timeout
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Push error message
    server.tool(
        'siyuan_notification_pushErrMsg',
        'Push error message',
        {
            msg: z.string().describe('Message content'),
            timeout: z.number().optional().describe('The duration of the message display in milliseconds. This field can be omitted, the default is 7000 milliseconds')
        },
        async ({ msg, timeout }) => {
            const result = await client.post('/api/notification/pushErrMsg', {
                msg,
                timeout
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