import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registry } from '../utils/registry.js';

// 注册命令执行工具
export function registerCommandTool(server: McpServer) {
    server.tool(
        'executeCommand',
        '执行指定的命令',
        {
            type: z.string().describe('命令类型'),
            params: z.record(z.any()).optional().describe('命令参数')
        },
        async ({ type, params = {} }) => {
            try {
                const result = await registry.executeCommand(type, params);
                return {
                    content: [
                        {
                            type: 'text' as const,
                            text: result.content[0].text
                        }
                    ],
                    _meta: {
                        result: result._meta || {}
                    },
                    isError: result.isError
                };
            } catch (error) {
                return {
                    content: [
                        {
                            type: 'text' as const,
                            text: error instanceof Error ? error.message : '命令执行失败'
                        }
                    ],
                    isError: true
                };
            }
        }
    );
} 