import { z } from 'zod';
import { client } from '../../../utils/client.js';
import { ToolRegistry } from '../types.js';

// 命令处理器
const conversionCommands = {
    // 转换内容
    async pandoc({ dom, type }: { dom: string; type: string }) {
        const result = await client.post('/api/convert/pandoc', {
            dom,
            type
        });
        return result;
    }
};

// 注册处理器
export function registerConversionHandlers() {
    // 注册命令
    ToolRegistry.registerCommand({
        type: 'conversion.pandoc',
        description: '使用Pandoc进行格式转换',
        params: {
            dom: z.string().describe('要转换的DOM内容'),
            type: z.string().describe('目标格式')
        },
        documentation: {
            description: '使用Pandoc将内容转换为指定格式',
            params: {
                dom: {
                    type: 'string',
                    description: '要转换的DOM内容',
                    required: true
                },
                type: {
                    type: 'string',
                    description: '目标格式，支持的格式包括：docx, epub, html, markdown, odt, pdf, rtf, textile, opml等',
                    required: true
                }
            },
            returns: {
                type: 'object',
                description: '返回转换后的内容',
                properties: {
                    content: {
                        type: 'string',
                        description: '转换后的内容'
                    }
                }
            },
            examples: [{
                description: '将内容转换为Markdown格式',
                params: {
                    dom: "<p>Hello <strong>World</strong></p>",
                    type: "markdown"
                },
                response: {
                    code: 0,
                    msg: "",
                    data: {
                        content: "Hello **World**"
                    }
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#pandoc'
        }
    });
}

export { conversionCommands }; 