import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { client } from '../utils/client.js';

export function registerSystemTools(server: McpServer): void {
    // Get boot progress
    server.tool(
        'siyuan_system_bootProgress',
        '获取启动进度',
        {},
        async () => {
            const result = await client.post('/api/system/bootProgress', {});
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Get system version
    server.tool(
        'siyuan_system_version',
        '获取系统版本',
        {},
        async () => {
            const result = await client.post('/api/system/version', {});
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Get current time
    server.tool(
        'siyuan_system_currentTime',
        '获取系统当前时间',
        {},
        async () => {
            const result = await client.post('/api/system/currentTime', {});
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );
} 