import { z } from 'zod';
import { client } from '../../../utils/client.js';
import { ToolRegistry } from '../types.js';

// 命令处理器
const templatesCommands = {
    // 渲染模板
    async render({ id, path }: { id?: string; path?: string }) {
        const result = await client.post('/api/template/render', {
            id,
            path
        });
        return result;
    }
};

// 查询处理器
const templatesQueries = {
    // 渲染Sprig模板
    async renderSprig({ template }: { template: string }) {
        const result = await client.post('/api/template/renderSprig', {
            template
        });
        return result;
    }
};

// 注册处理器
export function registerTemplatesHandlers() {
    // 注册命令
    ToolRegistry.registerCommand({
        type: 'templates.render',
        description: '渲染模板',
        params: {
            id: z.string().optional().describe('文档块ID'),
            path: z.string().optional().describe('模板文件路径')
        },
        documentation: {
            description: '渲染指定的文档模板',
            params: {
                id: {
                    type: 'string',
                    description: '要应用模板的文档块ID',
                    required: false
                },
                path: {
                    type: 'string',
                    description: '模板文件的路径',
                    required: false
                }
            },
            returns: {
                type: 'object',
                description: '返回渲染结果',
                properties: {
                    content: {
                        type: 'string',
                        description: '渲染后的内容'
                    }
                }
            },
            examples: [{
                description: '使用文档块ID渲染模板',
                params: {
                    id: "20210817205410-2kvfpfn"
                },
                response: {
                    code: 0,
                    msg: "",
                    data: {
                        content: "# 渲染后的标题\n\n这是渲染后的内容..."
                    }
                }
            }, {
                description: '使用模板文件路径渲染模板',
                params: {
                    path: "/templates/daily.md"
                },
                response: {
                    code: 0,
                    msg: "",
                    data: {
                        content: "# 2024-01-01\n\n## 今日待办\n\n* [ ] 任务1\n* [ ] 任务2"
                    }
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#render-template'
        }
    });

    // 注册查询
    ToolRegistry.registerQuery({
        type: 'templates.renderSprig',
        description: '渲染Sprig模板',
        params: {
            template: z.string().describe('Sprig模板内容')
        },
        documentation: {
            description: '使用Sprig模板引擎渲染指定的模板内容',
            params: {
                template: {
                    type: 'string',
                    description: 'Sprig模板内容',
                    required: true
                }
            },
            returns: {
                type: 'object',
                description: '返回渲染结果',
                properties: {
                    content: {
                        type: 'string',
                        description: '渲染后的内容'
                    }
                }
            },
            examples: [{
                description: '渲染Sprig模板',
                params: {
                    template: "{{ now | date \"2006-01-02\" }}"
                },
                response: {
                    code: 0,
                    msg: "",
                    data: {
                        content: "2024-01-01"
                    }
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#render-sprig-template'
        }
    });
}

export { templatesCommands, templatesQueries }; 