import { z } from 'zod';
import { client } from '../../../utils/client.js';
import { ToolRegistry } from '../types.js';

// 命令处理器
const exportCommands = {
    // 导出文档
    async exportMdContent({ id }: { id: string }) {
        const result = await client.post('/api/export/exportMdContent', {
            id
        });
        return result;
    }
};

// 注册处理器
export function registerExportHandlers() {
    // 注册命令
    ToolRegistry.registerCommand({
        type: 'export.exportMdContent',
        description: '导出Markdown文档',
        params: {
            id: z.string().describe('文档ID')
        },
        documentation: {
            description: '将指定的文档导出为Markdown格式',
            params: {
                id: {
                    type: 'string',
                    description: '要导出的文档ID',
                    required: true
                }
            },
            returns: {
                type: 'object',
                description: '返回导出的Markdown内容',
                properties: {
                    content: {
                        type: 'string',
                        description: '导出的Markdown内容，包含完整的元数据和引用'
                    },
                    hPath: {
                        type: 'string',
                        description: '文档的人类可读路径'
                    }
                }
            },
            examples: [{
                description: '导出一篇文档为Markdown',
                params: {
                    id: "20210817205410-2kvfpfn"
                },
                response: {
                    code: 0,
                    msg: "",
                    data: {
                        content: "# 文档标题\n\n这是一篇测试文档\n\n## 子标题\n\n* 列表项1\n* 列表项2",
                        hPath: "/测试文档"
                    }
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#export-markdown-content'
        }
    });
}

export { exportCommands }; 