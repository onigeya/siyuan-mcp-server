import { z } from 'zod';
import { client } from '../../../utils/client.js';
import { ToolRegistry } from '../types.js';

// 命令处理器
const attributesCommands = {
    // 设置块属性
    async setBlockAttrs({ id, attrs }: { id: string; attrs: Record<string, string> }) {
        const result = await client.post('/api/attr/setBlockAttrs', {
            id,
            attrs
        });
        return result;
    }
};

// 查询处理器
const attributesQueries = {
    // 获取块属性
    async getBlockAttrs({ id }: { id: string }) {
        const result = await client.post('/api/attr/getBlockAttrs', {
            id
        });
        return result;
    }
};

// 注册处理器
export function registerAttributesHandlers() {
    // 注册命令
    ToolRegistry.registerCommand({
        type: 'attributes.setBlockAttrs',
        description: '设置块属性',
        params: {
            id: z.string().describe('块ID'),
            attrs: z.record(z.string()).describe('属性键值对')
        },
        documentation: {
            description: '设置指定块的属性，可用于修改块的样式、自定义属性等',
            params: {
                id: {
                    type: 'string',
                    description: '块ID',
                    required: true
                },
                attrs: {
                    type: 'object',
                    description: '属性键值对，key为属性名，value为属性值',
                    required: true
                }
            },
            returns: {
                type: 'object',
                description: '设置成功返回空对象',
                properties: {}
            },
            examples: [{
                description: '设置块的自定义属性',
                params: {
                    id: "20210817205410-2kvfpfn",
                    attrs: {
                        "custom-attr": "test-value",
                        "style": "color: red;"
                    }
                },
                response: {
                    code: 0,
                    msg: "",
                    data: {}
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#set-block-attributes'
        }
    });

    // 注册查询
    ToolRegistry.registerQuery({
        type: 'attributes.getBlockAttrs',
        description: '获取块属性',
        params: {
            id: z.string().describe('块ID')
        },
        documentation: {
            description: '获取指定块的所有属性',
            params: {
                id: {
                    type: 'string',
                    description: '块ID',
                    required: true
                }
            },
            returns: {
                type: 'object',
                description: '返回块的所有属性',
                properties: {
                    data: {
                        type: 'object',
                        description: '属性键值对，key为属性名，value为属性值'
                    }
                }
            },
            examples: [{
                description: '获取块的所有属性',
                params: {
                    id: "20210817205410-2kvfpfn"
                },
                response: {
                    code: 0,
                    msg: "",
                    data: {
                        "id": "20210817205410-2kvfpfn",
                        "type": "doc",
                        "custom-attr": "test-value",
                        "style": "color: red;"
                    }
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#get-block-attributes'
        }
    });
}

export { attributesCommands, attributesQueries }; 