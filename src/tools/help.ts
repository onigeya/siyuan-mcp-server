import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registry } from '../utils/registry.js';

// 注册帮助工具
export function registerHelpTool(server: McpServer) {
    server.tool(
        'help',
        '获取命令的帮助信息',
        {
            type: z.string().describe('命令类型')
        },
        async ({ type }) => {
            try {
                const result = registry.getCommandHelp(type);
                if (result.isError) {
                    return {
                        content: [
                            {
                                type: 'text' as const,
                                text: result.content[0].text
                            }
                        ],
                        isError: true
                    };
                }

                const doc = result._meta;
                if (!doc) {
                    return {
                        content: [
                            {
                                type: 'text' as const,
                                text: `命令 ${type} 没有帮助信息`
                            }
                        ],
                        isError: true
                    };
                }

                // 构建帮助文本
                const helpText = [
                    `命令: ${type}`,
                    `描述: ${doc.description}`,
                    '',
                    '参数:',
                    ...Object.entries(doc.params).map(([key, value]) => 
                        `  ${key}: ${value.type}${value.required ? ' (必需)' : ' (可选)'}\n    ${value.description}`
                    ),
                    '',
                    '返回值:',
                    `  类型: ${doc.returns.type}`,
                    `  描述: ${doc.returns.description}`,
                    '  属性:',
                    ...Object.entries(doc.returns.properties).map(([key, desc]) => 
                        `    ${key}: ${String(desc)}`
                    ),
                    '',
                    '示例:',
                    ...doc.examples.map(example => [
                        `  ${example.description}:`,
                        '    参数:',
                        `      ${JSON.stringify(example.params, null, 2).replace(/\n/g, '\n      ')}`,
                        '    响应:',
                        `      ${JSON.stringify(example.response, null, 2).replace(/\n/g, '\n      ')}`
                    ]).flat(),
                    '',
                    doc.apiLink ? `API文档: ${doc.apiLink}` : ''
                ].filter(Boolean).join('\n');

                return {
                    content: [
                        {
                            type: 'text' as const,
                            text: helpText
                        }
                    ],
                    _meta: {
                        documentation: doc
                    },
                    isError: false
                };
            } catch (error) {
                return {
                    content: [
                        {
                            type: 'text' as const,
                            text: error instanceof Error ? error.message : '获取帮助失败'
                        }
                    ],
                    isError: true
                };
            }
        }
    );
} 