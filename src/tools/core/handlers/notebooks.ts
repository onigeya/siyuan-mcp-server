import { z } from 'zod';
import { client } from '../../../utils/client.js';
import { ToolRegistry } from '../types.js';

// 命令处理器
const notebookCommands = {
    // 创建笔记本
    async createNotebook({ name }: { name: string }) {
        const result = await client.post('/api/notebook/createNotebook', { name });
        return result;
    },

    // 删除笔记本
    async removeNotebook({ notebook }: { notebook: string }) {
        const result = await client.post('/api/notebook/removeNotebook', { notebook });
        return result;
    },

    // 重命名笔记本
    async renameNotebook({ notebook, name }: { notebook: string; name: string }) {
        const result = await client.post('/api/notebook/renameNotebook', { notebook, name });
        return result;
    },

    // 设置笔记本配置
    async setNotebookConf({ notebook, conf }: { notebook: string; conf: any }) {
        const result = await client.post('/api/notebook/setNotebookConf', { notebook, conf });
        return result;
    },

    // 打开笔记本
    async openNotebook({ notebook }: { notebook: string }) {
        const result = await client.post('/api/notebook/openNotebook', { notebook });
        return result;
    },

    // 关闭笔记本
    async closeNotebook({ notebook }: { notebook: string }) {
        const result = await client.post('/api/notebook/closeNotebook', { notebook });
        return result;
    }
};

// 查询处理器
const notebookQueries = {
    // 列出所有笔记本
    async lsNotebooks() {
        const result = await client.post('/api/notebook/lsNotebooks', {});
        return result;
    },

    // 获取笔记本配置
    async getNotebookConf({ notebook }: { notebook: string }) {
        const result = await client.post('/api/notebook/getNotebookConf', { notebook });
        return result;
    }
};

// 注册查询
export function registerNotebookQueries() {
    // 列出所有笔记本
    ToolRegistry.registerQuery({
        type: 'notebook.list',
        description: '列出所有笔记本',
        params: {
            random_string: z.string().optional().describe('Dummy parameter for no-parameter tools')
        },
        documentation: {
            description: '获取所有笔记本列表',
            returns: {
                type: 'object',
                description: '返回笔记本列表',
                properties: {
                    notebooks: {
                        type: 'array',
                        description: '笔记本数组'
                    }
                }
            },
            examples: [{
                description: '列出所有笔记本',
                params: {},
                response: {
                    notebooks: [
                        {
                            id: '20210817205410-2kvfpfn',
                            name: 'Test Notebook',
                            icon: '1f41b',
                            sort: 0,
                            closed: false
                        }
                    ]
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#list-notebooks'
        }
    });

    // 获取笔记本配置
    ToolRegistry.registerQuery({
        type: 'notebook.getConf',
        description: '获取笔记本配置',
        params: {
            notebook: z.string().describe('笔记本ID')
        },
        documentation: {
            description: '获取指定笔记本的配置信息',
            params: {
                notebook: {
                    type: 'string',
                    description: '笔记本ID',
                    required: true
                }
            },
            returns: {
                type: 'object',
                description: '返回笔记本配置'
            },
            examples: [{
                description: '获取笔记本配置',
                params: {
                    notebook: '20210817205410-2kvfpfn'
                },
                response: {
                    conf: {
                        name: "Test Notebook",
                        closed: false,
                        refCreateSavePath: "",
                        createDocNameTemplate: "",
                        dailyNoteSavePath: "/daily note/{{now | date \"2006/01\"}}/{{now | date \"2006-01-02\"}}",
                        dailyNoteTemplatePath: ""
                    }
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#get-notebook-configuration'
        }
    });
}

// 注册命令
export function registerNotebookCommands() {
    // 创建笔记本
    ToolRegistry.registerCommand({
        type: 'notebook.create',
        description: '创建笔记本',
        params: {
            name: z.string().describe('笔记本名称')
        },
        documentation: {
            description: '创建一个新的笔记本',
            params: {
                name: {
                    type: 'string',
                    description: '笔记本名称',
                    required: true
                }
            },
            returns: {
                type: 'object',
                description: '返回新创建的笔记本信息',
                properties: {
                    notebook: {
                        type: 'object',
                        description: '笔记本信息'
                    }
                }
            },
            examples: [{
                description: '创建一个新笔记本',
                params: {
                    name: 'Test Notebook'
                },
                response: {
                    notebook: {
                        id: '20220126215949-r1wvoch',
                        name: 'Test Notebook',
                        icon: '',
                        sort: 0,
                        closed: false
                    }
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#create-a-notebook'
        }
    });

    // 打开笔记本
    ToolRegistry.registerCommand({
        type: 'notebook.open',
        description: '打开笔记本',
        params: {
            notebook: z.string().describe('笔记本ID')
        },
        documentation: {
            description: '打开指定的笔记本',
            params: {
                notebook: {
                    type: 'string',
                    description: '笔记本ID',
                    required: true
                }
            },
            examples: [{
                description: '打开笔记本',
                params: {
                    notebook: '20210831090520-7dvbdv0'
                },
                response: {}
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#open-a-notebook'
        }
    });

    // 关闭笔记本
    ToolRegistry.registerCommand({
        type: 'notebook.close',
        description: '关闭笔记本',
        params: {
            notebook: z.string().describe('笔记本ID')
        },
        documentation: {
            description: '关闭指定的笔记本',
            params: {
                notebook: {
                    type: 'string',
                    description: '笔记本ID',
                    required: true
                }
            },
            examples: [{
                description: '关闭笔记本',
                params: {
                    notebook: '20210831090520-7dvbdv0'
                },
                response: {}
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#close-a-notebook'
        }
    });

    // 重命名笔记本
    ToolRegistry.registerCommand({
        type: 'notebook.rename',
        description: '重命名笔记本',
        params: {
            notebook: z.string().describe('笔记本ID'),
            name: z.string().describe('新的笔记本名称')
        },
        documentation: {
            description: '重命名指定的笔记本',
            params: {
                notebook: {
                    type: 'string',
                    description: '笔记本ID',
                    required: true
                },
                name: {
                    type: 'string',
                    description: '新的笔记本名称',
                    required: true
                }
            },
            examples: [{
                description: '重命名笔记本',
                params: {
                    notebook: '20210831090520-7dvbdv0',
                    name: 'New Notebook Name'
                },
                response: {}
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#rename-a-notebook'
        }
    });

    // 删除笔记本
    ToolRegistry.registerCommand({
        type: 'notebook.remove',
        description: '删除笔记本',
        params: {
            notebook: z.string().describe('笔记本ID')
        },
        documentation: {
            description: '删除指定的笔记本',
            params: {
                notebook: {
                    type: 'string',
                    description: '笔记本ID',
                    required: true
                }
            },
            examples: [{
                description: '删除笔记本',
                params: {
                    notebook: '20210831090520-7dvbdv0'
                },
                response: {}
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#remove-a-notebook'
        }
    });

    // 设置笔记本配置
    ToolRegistry.registerCommand({
        type: 'notebook.setConf',
        description: '设置笔记本配置',
        params: {
            notebook: z.string().describe('笔记本ID'),
            conf: z.object({
                name: z.string().optional().describe('笔记本名称'),
                closed: z.boolean().optional().describe('是否关闭'),
                refCreateSavePath: z.string().optional().describe('引用块创建路径'),
                createDocNameTemplate: z.string().optional().describe('创建文档名称模板'),
                dailyNoteSavePath: z.string().optional().describe('每日笔记保存路径'),
                dailyNoteTemplatePath: z.string().optional().describe('每日笔记模板路径')
            }).describe('笔记本配置')
        },
        documentation: {
            description: '设置指定笔记本的配置',
            params: {
                notebook: {
                    type: 'string',
                    description: '笔记本ID',
                    required: true
                },
                conf: {
                    type: 'object',
                    description: '笔记本配置',
                    required: true
                }
            },
            examples: [{
                description: '设置笔记本配置',
                params: {
                    notebook: '20210831090520-7dvbdv0',
                    conf: {
                        name: "Test Notebook",
                        closed: false,
                        refCreateSavePath: "",
                        createDocNameTemplate: "",
                        dailyNoteSavePath: "/daily note/{{now | date \"2006/01\"}}/{{now | date \"2006-01-02\"}}",
                        dailyNoteTemplatePath: ""
                    }
                },
                response: {}
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#save-notebook-configuration'
        }
    });
}

export { notebookCommands, notebookQueries }; 