import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { client } from '../utils/client.js';

export function registerNotificationTools(server: McpServer): void {
    // Push message
    server.tool(
        'siyuan_notification_pushMsg',
        '推送普通消息',
        {
            msg: z.string().describe('消息内容'),
            timeout: z.number().optional().describe('消息显示时长（毫秒），默认 7000')
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
        '推送错误消息',
        {
            msg: z.string().describe('消息内容'),
            timeout: z.number().optional().describe('消息显示时长（毫秒），默认 7000')
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