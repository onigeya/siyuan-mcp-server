import { z } from 'zod';
import { client } from '../../../utils/client.js';
import { ToolRegistry } from '../types.js';

// 命令处理器
const fileCommands = {
    // 创建目录
    async putFile({ path, file }: { path: string; file: string }) {
        const result = await client.post('/api/file/putFile', {
            path,
            file
        });
        return result;
    },

    // 删除文件
    async removeFile({ path }: { path: string }) {
        const result = await client.post('/api/file/removeFile', {
            path
        });
        return result;
    }
};

// 查询处理器
const fileQueries = {
    // 获取文件
    async getFile({ path }: { path: string }) {
        const result = await client.post('/api/file/getFile', {
            path
        });
        return result;
    },

    // 列出文件
    async readDir({ path }: { path: string }) {
        const result = await client.post('/api/file/readDir', {
            path
        });
        return result;
    }
};

// 注册处理器
export function registerFileHandlers() {
    // 注册命令
    ToolRegistry.registerCommand({
        type: 'file.putFile',
        description: '创建或更新文件',
        params: {
            path: z.string().describe('文件路径'),
            file: z.string().describe('文件内容')
        },
        documentation: {
            description: '创建或更新指定路径的文件',
            params: {
                path: {
                    type: 'string',
                    description: '文件的完整路径，以/开头',
                    required: true
                },
                file: {
                    type: 'string',
                    description: '文件的内容',
                    required: true
                }
            },
            returns: {
                type: 'object',
                description: '创建或更新成功返回空对象',
                properties: {}
            },
            examples: [{
                description: '创建一个新文件',
                params: {
                    path: "/data/plugins/example/README.md",
                    file: "# 示例插件\n\n这是一个示例插件的说明文档。"
                },
                response: {
                    code: 0,
                    msg: "",
                    data: {}
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#put-file'
        }
    });

    ToolRegistry.registerCommand({
        type: 'file.removeFile',
        description: '删除文件',
        params: {
            path: z.string().describe('文件路径')
        },
        documentation: {
            description: '删除指定路径的文件',
            params: {
                path: {
                    type: 'string',
                    description: '要删除的文件路径，以/开头',
                    required: true
                }
            },
            returns: {
                type: 'object',
                description: '删除成功返回空对象',
                properties: {}
            },
            examples: [{
                description: '删除一个文件',
                params: {
                    path: "/data/plugins/example/README.md"
                },
                response: {
                    code: 0,
                    msg: "",
                    data: {}
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#remove-file'
        }
    });

    // 注册查询
    ToolRegistry.registerQuery({
        type: 'file.getFile',
        description: '获取文件内容',
        params: {
            path: z.string().describe('文件路径')
        },
        documentation: {
            description: '获取指定路径文件的内容',
            params: {
                path: {
                    type: 'string',
                    description: '要获取的文件路径，以/开头',
                    required: true
                }
            },
            returns: {
                type: 'object',
                description: '返回文件内容',
                properties: {
                    data: {
                        type: 'string',
                        description: '文件的内容'
                    }
                }
            },
            examples: [{
                description: '获取文件内容',
                params: {
                    path: "/data/plugins/example/README.md"
                },
                response: {
                    code: 0,
                    msg: "",
                    data: "# 示例插件\n\n这是一个示例插件的说明文档。"
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#get-file'
        }
    });

    ToolRegistry.registerQuery({
        type: 'file.readDir',
        description: '列出目录下的文件',
        params: {
            path: z.string().describe('目录路径')
        },
        documentation: {
            description: '列出指定目录下的所有文件和子目录',
            params: {
                path: {
                    type: 'string',
                    description: '要列出的目录路径，以/开头',
                    required: true
                }
            },
            returns: {
                type: 'object',
                description: '返回目录内容列表',
                properties: {
                    files: {
                        type: 'array<object>',
                        description: '文件和目录列表，每个元素包含name、isDir、size和updated属性'
                    }
                }
            },
            examples: [{
                description: '列出目录内容',
                params: {
                    path: "/data/plugins"
                },
                response: {
                    code: 0,
                    msg: "",
                    data: {
                        files: [{
                            name: "example",
                            isDir: true,
                            size: 4096,
                            updated: "2023-04-01 12:34:56"
                        }, {
                            name: "README.md",
                            isDir: false,
                            size: 1024,
                            updated: "2023-04-01 12:34:56"
                        }]
                    }
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#read-directory'
        }
    });
}

export { fileCommands, fileQueries }; 