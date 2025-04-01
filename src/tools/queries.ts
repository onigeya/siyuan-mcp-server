import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registry } from '../utils/registry.js';

// 注册命令查询工具
export function registerQueryTool(server: McpServer) {
    server.tool(
        'queryCommands',
        '查询可用的命令列表',
        {
            namespace: z.string().optional().describe('命令命名空间过滤'),
            type: z.string().optional().describe('命令名称过滤')
        },
        async ({ namespace, type }) => {
            try {
                const result = registry.listCommands(namespace, type);
                const commands = (result._meta || []).map(cmd => ({
                    type: cmd.namespace ? `${cmd.namespace}.${cmd.name}` : cmd.name,
                    description: cmd.description,
                    params: Object.entries(cmd.params)
                        .map(([name, info]) => `${name}: ${info.type}${info.required ? ' (必填)' : ' (可选)'} - ${info.description}`)
                        .join('\n    ') || '无参数'
                }));
                
                const commandList = commands.map(cmd => 
                    `${cmd.type}: ${cmd.description}\n  参数: ${cmd.params}`
                ).join('\n');
                
                return {
                    content: [
                        {
                            type: 'text' as const,
                            text: `可用命令列表：\n${commandList}`
                        }
                    ],
                    _meta: {
                        commands: commands
                    },
                    isError: false
                };
            } catch (error) {
                return {
                    content: [
                        {
                            type: 'text' as const,
                            text: error instanceof Error ? error.message : '查询失败'
                        }
                    ],
                    isError: true
                };
            }
        }
    );
} 