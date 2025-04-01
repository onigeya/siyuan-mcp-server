import { z } from 'zod';
import { client } from '../../../utils/client.js';
import { ToolRegistry } from '../types.js';

// 命令处理器
const bookmarksCommands = {
    // 添加书签
    async addBookmark({ id, title }: { id: string; title: string }) {
        const result = await client.post('/api/bookmark/add', {
            id,
            title
        });
        return result;
    },

    // 删除书签
    async removeBookmark({ id }: { id: string }) {
        const result = await client.post('/api/bookmark/remove', {
            id
        });
        return result;
    },

    // 重命名书签
    async renameBookmark({ id, title }: { id: string; title: string }) {
        const result = await client.post('/api/bookmark/rename', {
            id,
            title
        });
        return result;
    }
};

// 查询处理器
const bookmarksQueries = {
    // 获取书签列表
    async getBookmarks() {
        const result = await client.post('/api/bookmark/getBookmarks');
        return result;
    }
};

// 注册处理器
export function registerBookmarksHandlers() {
    // 注册命令
    ToolRegistry.registerCommand({
        type: 'bookmarks.add',
        description: '添加书签',
        params: {
            id: z.string().describe('块ID'),
            title: z.string().describe('书签标题')
        },
        documentation: {
            description: '将指定的块添加到书签中',
            params: {
                id: {
                    type: 'string',
                    description: '要添加书签的块ID',
                    required: true
                },
                title: {
                    type: 'string',
                    description: '书签标题',
                    required: true
                }
            },
            returns: {
                type: 'object',
                description: '添加成功返回空对象',
                properties: {}
            },
            examples: [{
                description: '添加一个块到书签',
                params: {
                    id: "20210817205410-2kvfpfn",
                    title: "重要内容"
                },
                response: {
                    code: 0,
                    msg: "",
                    data: {}
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#add-bookmark'
        }
    });

    ToolRegistry.registerCommand({
        type: 'bookmarks.remove',
        description: '删除书签',
        params: {
            id: z.string().describe('块ID')
        },
        documentation: {
            description: '从书签中删除指定的块',
            params: {
                id: {
                    type: 'string',
                    description: '要删除书签的块ID',
                    required: true
                }
            },
            returns: {
                type: 'object',
                description: '删除成功返回空对象',
                properties: {}
            },
            examples: [{
                description: '从书签中删除一个块',
                params: {
                    id: "20210817205410-2kvfpfn"
                },
                response: {
                    code: 0,
                    msg: "",
                    data: {}
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#remove-bookmark'
        }
    });

    ToolRegistry.registerCommand({
        type: 'bookmarks.rename',
        description: '重命名书签',
        params: {
            id: z.string().describe('块ID'),
            title: z.string().describe('新的书签标题')
        },
        documentation: {
            description: '重命名指定块的书签标题',
            params: {
                id: {
                    type: 'string',
                    description: '要重命名书签的块ID',
                    required: true
                },
                title: {
                    type: 'string',
                    description: '新的书签标题',
                    required: true
                }
            },
            returns: {
                type: 'object',
                description: '重命名成功返回空对象',
                properties: {}
            },
            examples: [{
                description: '重命名一个书签',
                params: {
                    id: "20210817205410-2kvfpfn",
                    title: "新的重要内容"
                },
                response: {
                    code: 0,
                    msg: "",
                    data: {}
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#rename-bookmark'
        }
    });

    // 注册查询
    ToolRegistry.registerQuery({
        type: 'bookmarks.getBookmarks',
        description: '获取书签列表',
        params: {
            random_string: z.string().optional().describe('Dummy parameter for no-parameter tools')
        },
        documentation: {
            description: '获取所有书签的列表',
            returns: {
                type: 'object',
                description: '返回书签列表',
                properties: {
                    bookmarks: {
                        type: 'array<object>',
                        description: '书签数组，每个元素包含id和title'
                    }
                }
            },
            examples: [{
                description: '获取所有书签',
                params: {},
                response: {
                    code: 0,
                    msg: "",
                    data: {
                        bookmarks: [{
                            id: "20210817205410-2kvfpfn",
                            title: "重要内容",
                            type: "doc",
                            path: "/daily note/2021-08-17"
                        }]
                    }
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#get-bookmarks'
        }
    });
}

export { bookmarksCommands, bookmarksQueries }; 