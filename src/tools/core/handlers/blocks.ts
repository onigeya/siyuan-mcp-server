import { z } from 'zod';
import { client } from '../../../utils/client.js';
import { ToolRegistry } from '../types.js';

// 命令处理器
const blocksCommands = {
    // 插入块
    async insertBlock({ dataType, data, previousID }: { dataType: string; data: string; previousID: string }) {
        const result = await client.post('/api/block/insertBlock', {
            dataType,
            data,
            previousID
        });
        return result;
    },

    // 前置插入块
    async prependBlock({ dataType, data, parentID }: { dataType: string; data: string; parentID: string }) {
        const result = await client.post('/api/block/prependBlock', {
            dataType,
            data,
            parentID
        });
        return result;
    },

    // 后置插入块
    async appendBlock({ dataType, data, parentID }: { dataType: string; data: string; parentID: string }) {
        const result = await client.post('/api/block/appendBlock', {
            dataType,
            data,
            parentID
        });
        return result;
    },

    // 更新块
    async updateBlock({ dataType, data, id }: { dataType: string; data: string; id: string }) {
        const result = await client.post('/api/block/updateBlock', {
            dataType,
            data,
            id
        });
        return result;
    },

    // 删除块
    async deleteBlock({ id }: { id: string }) {
        const result = await client.post('/api/block/deleteBlock', {
            id
        });
        return result;
    },

    // 移动块
    async moveBlock({ id, previousID, parentID }: { id: string; previousID?: string; parentID?: string }) {
        const result = await client.post('/api/block/moveBlock', {
            id,
            previousID,
            parentID
        });
        return result;
    },

    // 折叠块
    async foldBlock({ id }: { id: string }) {
        const result = await client.post('/api/block/foldBlock', {
            id
        });
        return result;
    },

    // 展开块
    async unfoldBlock({ id }: { id: string }) {
        const result = await client.post('/api/block/unfoldBlock', {
            id
        });
        return result;
    },

    // 转移块引用
    async transferBlockRef({ fromID, toID, refIDs }: { fromID: string; toID: string; refIDs: string[] }) {
        const result = await client.post('/api/block/transferBlockRef', {
            fromID,
            toID,
            refIDs
        });
        return result;
    }
};

// 查询处理器
const blocksQueries = {
    // 获取块Markdown
    async getBlockKramdown({ id }: { id: string }) {
        const result = await client.post('/api/block/getBlockKramdown', {
            id
        });
        return result;
    },

    // 获取子块
    async getChildBlocks({ id }: { id: string }) {
        const result = await client.post('/api/block/getChildBlocks', {
            id
        });
        return result;
    }
};

// 注册处理器
export function registerBlocksHandlers() {
    // 注册命令
    ToolRegistry.registerCommand({
        type: 'blocks.insert',
        description: '插入块',
        params: {
            dataType: z.string().describe('数据类型'),
            data: z.string().describe('数据内容'),
            previousID: z.string().describe('前一个块的ID')
        },
        documentation: {
            description: '在指定块后插入新块',
            params: {
                dataType: {
                    type: 'string',
                    description: '数据类型,如 markdown, dom 等',
                    required: true
                },
                data: {
                    type: 'string',
                    description: '块的内容',
                    required: true
                },
                previousID: {
                    type: 'string',
                    description: '前一个块的ID',
                    required: true
                }
            },
            returns: {
                type: 'object',
                description: '返回插入的块信息',
                properties: {
                    doOperations: {
                        type: 'array',
                        description: '执行的操作列表'
                    }
                }
            },
            examples: [{
                description: '插入Markdown块',
                params: {
                    dataType: "markdown",
                    data: "Hello World",
                    previousID: "20200923234011-ieuun1p"
                },
                response: {
                    doOperations: [{
                        action: "insert",
                        data: "Hello World",
                        id: "20210808180117-6v0mkxr"
                    }]
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#insert-blocks'
        }
    });

    ToolRegistry.registerCommand({
        type: 'blocks.prepend',
        description: '前置插入块',
        params: {
            dataType: z.string().describe('数据类型'),
            data: z.string().describe('数据内容'),
            parentID: z.string().describe('父块ID')
        },
        documentation: {
            description: '在指定块的开头插入新块',
            params: {
                dataType: {
                    type: 'string',
                    description: '数据类型,如 markdown, dom 等',
                    required: true
                },
                data: {
                    type: 'string',
                    description: '块的内容',
                    required: true
                },
                parentID: {
                    type: 'string',
                    description: '父块ID',
                    required: true
                }
            },
            returns: {
                type: 'object',
                description: '返回插入的块信息',
                properties: {
                    doOperations: {
                        type: 'array',
                        description: '执行的操作列表'
                    }
                }
            },
            examples: [{
                description: '在文档开头插入Markdown块',
                params: {
                    dataType: "markdown",
                    data: "Hello World",
                    parentID: "20200923234011-ieuun1p"
                },
                response: {
                    doOperations: [{
                        action: "insert",
                        data: "Hello World",
                        id: "20210808180117-6v0mkxr"
                    }]
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#prepend-blocks'
        }
    });

    ToolRegistry.registerCommand({
        type: 'blocks.append',
        description: '后置插入块',
        params: {
            dataType: z.string().describe('数据类型'),
            data: z.string().describe('数据内容'),
            parentID: z.string().describe('父块ID')
        },
        documentation: {
            description: '在指定块的末尾插入新块',
            params: {
                dataType: {
                    type: 'string',
                    description: '数据类型,如 markdown, dom 等',
                    required: true
                },
                data: {
                    type: 'string',
                    description: '块的内容',
                    required: true
                },
                parentID: {
                    type: 'string',
                    description: '父块ID',
                    required: true
                }
            },
            returns: {
                type: 'object',
                description: '返回插入的块信息',
                properties: {
                    doOperations: {
                        type: 'array',
                        description: '执行的操作列表'
                    }
                }
            },
            examples: [{
                description: '在文档末尾插入Markdown块',
                params: {
                    dataType: "markdown",
                    data: "Hello World",
                    parentID: "20200923234011-ieuun1p"
                },
                response: {
                    doOperations: [{
                        action: "insert",
                        data: "Hello World",
                        id: "20210808180117-6v0mkxr"
                    }]
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#append-blocks'
        }
    });

    ToolRegistry.registerCommand({
        type: 'blocks.update',
        description: '更新块',
        params: {
            dataType: z.string().describe('数据类型'),
            data: z.string().describe('数据内容'),
            id: z.string().describe('块ID')
        },
        documentation: {
            description: '更新指定块的内容',
            params: {
                dataType: {
                    type: 'string',
                    description: '数据类型,如 markdown, dom 等',
                    required: true
                },
                data: {
                    type: 'string',
                    description: '新的块内容',
                    required: true
                },
                id: {
                    type: 'string',
                    description: '要更新的块ID',
                    required: true
                }
            },
            returns: {
                type: 'object',
                description: '返回更新的块信息',
                properties: {
                    doOperations: {
                        type: 'array',
                        description: '执行的操作列表'
                    }
                }
            },
            examples: [{
                description: '更新块内容为新的Markdown文本',
                params: {
                    dataType: "markdown",
                    data: "Updated content",
                    id: "20200923234011-ieuun1p"
                },
                response: {
                    doOperations: [{
                        action: "update",
                        data: "Updated content",
                        id: "20200923234011-ieuun1p"
                    }]
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#update-blocks'
        }
    });

    ToolRegistry.registerCommand({
        type: 'blocks.delete',
        description: '删除块',
        params: {
            id: z.string().describe('块ID')
        },
        documentation: {
            description: '删除指定的块',
            params: {
                id: {
                    type: 'string',
                    description: '要删除的块ID',
                    required: true
                }
            },
            returns: {
                type: 'object',
                description: '返回删除操作的结果',
                properties: {
                    doOperations: {
                        type: 'array',
                        description: '执行的操作列表'
                    }
                }
            },
            examples: [{
                description: '删除指定ID的块',
                params: {
                    id: "20200923234011-ieuun1p"
                },
                response: {
                    doOperations: [{
                        action: "delete",
                        id: "20200923234011-ieuun1p"
                    }]
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#delete-blocks'
        }
    });

    ToolRegistry.registerCommand({
        type: 'blocks.move',
        description: '移动块',
        params: {
            id: z.string().describe('块ID'),
            previousID: z.string().describe('前一个块ID'),
            parentID: z.string().describe('父块ID')
        },
        documentation: {
            description: '移动块到新的位置',
            params: {
                id: {
                    type: 'string',
                    description: '要移动的块ID',
                    required: true
                },
                previousID: {
                    type: 'string',
                    description: '移动目标位置的前一个块ID',
                    required: true
                },
                parentID: {
                    type: 'string',
                    description: '移动目标位置的父块ID',
                    required: true
                }
            },
            returns: {
                type: 'object',
                description: '返回移动操作的结果',
                properties: {
                    doOperations: {
                        type: 'array',
                        description: '执行的操作列表'
                    }
                }
            },
            examples: [{
                description: '移动块到新的位置',
                params: {
                    id: "20200923234011-ieuun1p",
                    previousID: "20200923234011-abc123",
                    parentID: "20200923234011-def456"
                },
                response: {
                    doOperations: [{
                        action: "move",
                        id: "20200923234011-ieuun1p",
                        previousID: "20200923234011-abc123",
                        parentID: "20200923234011-def456"
                    }]
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#move-blocks'
        }
    });

    ToolRegistry.registerCommand({
        type: 'blocks.fold',
        description: '折叠块',
        params: {
            id: z.string().describe('块ID')
        },
        documentation: {
            description: '折叠指定的块',
            params: {
                id: {
                    type: 'string',
                    description: '要折叠的块ID',
                    required: true
                }
            },
            returns: {
                type: 'object',
                description: '返回折叠操作的结果',
                properties: {
                    doOperations: {
                        type: 'array',
                        description: '执行的操作列表'
                    }
                }
            },
            examples: [{
                description: '折叠指定ID的块',
                params: {
                    id: "20200923234011-ieuun1p"
                },
                response: {
                    doOperations: [{
                        action: "fold",
                        id: "20200923234011-ieuun1p"
                    }]
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#fold-block'
        }
    });

    ToolRegistry.registerCommand({
        type: 'blocks.unfold',
        description: '展开块',
        params: {
            id: z.string().describe('块ID')
        },
        documentation: {
            description: '展开指定的块',
            params: {
                id: {
                    type: 'string',
                    description: '要展开的块ID',
                    required: true
                }
            },
            returns: {
                type: 'object',
                description: '返回展开操作的结果',
                properties: {
                    doOperations: {
                        type: 'array',
                        description: '执行的操作列表'
                    }
                }
            },
            examples: [{
                description: '展开指定ID的块',
                params: {
                    id: "20200923234011-ieuun1p"
                },
                response: {
                    doOperations: [{
                        action: "unfold",
                        id: "20200923234011-ieuun1p"
                    }]
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#unfold-block'
        }
    });

    ToolRegistry.registerCommand({
        type: 'blocks.transferRef',
        description: '转移块引用',
        params: {
            fromID: z.string().describe('源块ID'),
            toID: z.string().describe('目标块ID'),
            refIDs: z.array(z.string()).describe('引用块ID列表')
        },
        documentation: {
            description: '将块引用从一个块转移到另一个块',
            params: {
                fromID: {
                    type: 'string',
                    description: '源块ID',
                    required: true
                },
                toID: {
                    type: 'string',
                    description: '目标块ID',
                    required: true
                },
                refIDs: {
                    type: 'array<string>',
                    description: '要转移的引用块ID列表',
                    required: true
                }
            },
            returns: {
                type: 'object',
                description: '返回转移操作的结果',
                properties: {
                    doOperations: {
                        type: 'array',
                        description: '执行的操作列表'
                    }
                }
            },
            examples: [{
                description: '转移块引用',
                params: {
                    fromID: "20200923234011-ieuun1p",
                    toID: "20200923234011-abc123",
                    refIDs: ["20200923234011-def456"]
                },
                response: {
                    doOperations: [{
                        action: "transfer",
                        fromID: "20200923234011-ieuun1p",
                        toID: "20200923234011-abc123",
                        refIDs: ["20200923234011-def456"]
                    }]
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#transfer-block-ref'
        }
    });

    // 注册查询
    ToolRegistry.registerQuery({
        type: 'blocks.getKramdown',
        description: '获取块的Markdown内容',
        params: {
            id: z.string().describe('块ID')
        },
        documentation: {
            description: '获取指定块的Markdown格式内容',
            params: {
                id: {
                    type: 'string',
                    description: '块ID',
                    required: true
                }
            },
            returns: {
                type: 'object',
                description: '返回块的Markdown内容',
                properties: {
                    kramdown: {
                        type: 'string',
                        description: '块的Markdown内容'
                    }
                }
            },
            examples: [{
                description: '获取块的Markdown内容',
                params: {
                    id: "20200923234011-ieuun1p"
                },
                response: {
                    kramdown: "# 标题\n\n这是一段Markdown文本"
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#get-block-kramdown'
        }
    });

    ToolRegistry.registerQuery({
        type: 'blocks.getChildren',
        description: '获取子块列表',
        params: {
            id: z.string().describe('块ID')
        },
        documentation: {
            description: '获取指定块的所有子块',
            params: {
                id: {
                    type: 'string',
                    description: '块ID',
                    required: true
                }
            },
            returns: {
                type: 'object',
                description: '返回子块列表',
                properties: {
                    children: {
                        type: 'array<object>',
                        description: '子块列表'
                    }
                }
            },
            examples: [{
                description: '获取块的子块列表',
                params: {
                    id: "20200923234011-ieuun1p"
                },
                response: {
                    children: [{
                        id: "20200923234011-abc123",
                        type: "p",
                        content: "子块内容"
                    }]
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#get-child-blocks'
        }
    });
}

export { blocksCommands, blocksQueries }; 