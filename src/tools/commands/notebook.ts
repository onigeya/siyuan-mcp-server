import { z } from 'zod';
import { createHandler } from '../../utils/client.js';
import { registry } from '../../utils/registry.js';
import { CommandHandler } from '../../utils/registry.js';

// 定义参数类型
const notebookSchema = z.object({
    notebook: z.string().describe('笔记本 ID')
});

const notebookAndNameSchema = z.object({
    notebook: z.string().describe('笔记本 ID'),
    name: z.string().describe('新名称')
});

const nameSchema = z.object({
    name: z.string().describe('笔记本名称')
});

const notebookAndConfSchema = z.object({
    notebook: z.string().describe('笔记本 ID'),
    conf: z.object({
        name: z.string().optional().describe('笔记本名称'),
        closed: z.boolean().optional().describe('是否关闭'),
        refCreateSavePath: z.string().optional().describe('新建文档存储路径'),
        createDocNameTemplate: z.string().optional().describe('新建文档名称模板'),
        dailyNoteSavePath: z.string().optional().describe('每日笔记存储路径'),
        dailyNoteTemplate: z.string().optional().describe('每日笔记模板')
    }).describe('笔记本配置')
});

const namespace = 'notebook';

// 列出笔记本
const lsNotebooksHandler: CommandHandler = {
    namespace,
    name: 'lsNotebooks',
    description: '列出所有笔记本',
    params: z.object({}),
    handler: createHandler('/api/notebook/lsNotebooks'),
    documentation: {
        description: '列出所有笔记本',
        params: {},
        returns: {
            type: 'array',
            description: '笔记本列表',
            properties: {
                id: '笔记本 ID',
                name: '笔记本名称',
                icon: '笔记本图标',
                sort: '排序权重',
                closed: '是否关闭'
            }
        },
        examples: [
            {
                description: '列出所有笔记本',
                params: {},
                response: {
                    notebooks: [
                        {
                            id: "20210817205410-2kvfpfn",
                            name: "测试笔记本",
                            icon: "1f4d4",
                            sort: 0,
                            closed: false
                        }
                    ]
                }
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#list-notebooks'
    }
};

// 打开笔记本
const openNotebookHandler: CommandHandler = {
    namespace,
    name: 'openNotebook',
    description: '打开笔记本',
    params: notebookSchema,
    handler: createHandler('/api/notebook/openNotebook'),
    documentation: {
        description: '打开笔记本',
        params: {
            notebook: {
                type: 'string',
                description: '笔记本 ID',
                required: true
            }
        },
        returns: {
            type: 'object',
            description: '操作结果',
            properties: {}
        },
        examples: [
            {
                description: '打开指定笔记本',
                params: {
                    notebook: "20210817205410-2kvfpfn"
                },
                response: {}
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#open-a-notebook'
    }
};

// 关闭笔记本
const closeNotebookHandler: CommandHandler = {
    namespace,
    name: 'closeNotebook',
    description: '关闭笔记本',
    params: notebookSchema,
    handler: createHandler('/api/notebook/closeNotebook'),
    documentation: {
        description: '关闭笔记本',
        params: {
            notebook: {
                type: 'string',
                description: '笔记本 ID',
                required: true
            }
        },
        returns: {
            type: 'object',
            description: '操作结果',
            properties: {}
        },
        examples: [
            {
                description: '关闭指定笔记本',
                params: {
                    notebook: "20210817205410-2kvfpfn"
                },
                response: {}
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#close-a-notebook'
    }
};

// 重命名笔记本
const renameNotebookHandler: CommandHandler = {
    namespace,
    name: 'renameNotebook',
    description: '重命名笔记本',
    params: notebookAndNameSchema,
    handler: createHandler('/api/notebook/renameNotebook'),
    documentation: {
        description: '重命名笔记本',
        params: {
            notebook: {
                type: 'string',
                description: '笔记本 ID',
                required: true
            },
            name: {
                type: 'string',
                description: '新名称',
                required: true
            }
        },
        returns: {
            type: 'object',
            description: '操作结果',
            properties: {}
        },
        examples: [
            {
                description: '重命名笔记本',
                params: {
                    notebook: "20210817205410-2kvfpfn",
                    name: "新笔记本名称"
                },
                response: {}
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#rename-a-notebook'
    }
};

// 创建笔记本
const createNotebookHandler: CommandHandler = {
    namespace,
    name: 'createNotebook',
    description: '创建笔记本',
    params: nameSchema,
    handler: createHandler('/api/notebook/createNotebook'),
    documentation: {
        description: '创建笔记本',
        params: {
            name: {
                type: 'string',
                description: '笔记本名称',
                required: true
            }
        },
        returns: {
            type: 'object',
            description: '操作结果',
            properties: {
                notebook: '新创建的笔记本 ID'
            }
        },
        examples: [
            {
                description: '创建新笔记本',
                params: {
                    name: "新笔记本"
                },
                response: {
                    notebook: "20210817205410-2kvfpfn"
                }
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#create-a-notebook'
    }
};

// 删除笔记本
const removeNotebookHandler: CommandHandler = {
    namespace,
    name: 'removeNotebook',
    description: '删除笔记本',
    params: notebookSchema,
    handler: createHandler('/api/notebook/removeNotebook'),
    documentation: {
        description: '删除笔记本',
        params: {
            notebook: {
                type: 'string',
                description: '笔记本 ID',
                required: true
            }
        },
        returns: {
            type: 'object',
            description: '操作结果',
            properties: {}
        },
        examples: [
            {
                description: '删除指定笔记本',
                params: {
                    notebook: "20210817205410-2kvfpfn"
                },
                response: {}
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#remove-a-notebook'
    }
};

// 获取笔记本配置
const getNotebookConfHandler: CommandHandler = {
    namespace,
    name: 'getNotebookConf',
    description: '获取笔记本配置',
    params: notebookSchema,
    handler: createHandler('/api/notebook/getNotebookConf'),
    documentation: {
        description: '获取笔记本配置',
        params: {
            notebook: {
                type: 'string',
                description: '笔记本 ID',
                required: true
            }
        },
        returns: {
            type: 'object',
            description: '笔记本配置',
            properties: {
                name: '笔记本名称',
                closed: '是否关闭',
                refCreateSavePath: '新建文档存储路径',
                createDocNameTemplate: '新建文档名称模板',
                dailyNoteSavePath: '每日笔记存储路径',
                dailyNoteTemplate: '每日笔记模板'
            }
        },
        examples: [
            {
                description: '获取笔记本配置',
                params: {
                    notebook: "20210817205410-2kvfpfn"
                },
                response: {
                    name: "测试笔记本",
                    closed: false,
                    refCreateSavePath: "/",
                    createDocNameTemplate: "${title}",
                    dailyNoteSavePath: "/daily note/",
                    dailyNoteTemplate: ""
                }
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#get-notebook-configuration'
    }
};

// 设置笔记本配置
const setNotebookConfHandler: CommandHandler = {
    namespace,
    name: 'setNotebookConf',
    description: '设置笔记本配置',
    params: notebookAndConfSchema,
    handler: createHandler('/api/notebook/setNotebookConf'),
    documentation: {
        description: '设置笔记本配置',
        params: {
            notebook: {
                type: 'string',
                description: '笔记本 ID',
                required: true
            },
            conf: {
                type: 'object',
                description: '笔记本配置',
                required: true
            }
        },
        returns: {
            type: 'object',
            description: '操作结果',
            properties: {}
        },
        examples: [
            {
                description: '设置笔记本配置',
                params: {
                    notebook: "20210817205410-2kvfpfn",
                    conf: {
                        name: "测试笔记本",
                        closed: false,
                        refCreateSavePath: "/",
                        createDocNameTemplate: "${title}",
                        dailyNoteSavePath: "/daily note/",
                        dailyNoteTemplate: ""
                    }
                },
                response: {}
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#save-notebook-configuration'
    }
};

// 注册所有笔记本相关命令
export function registerNotebookHandlers() {
    registry.registerCommand(lsNotebooksHandler);
    registry.registerCommand(openNotebookHandler);
    registry.registerCommand(closeNotebookHandler);
    registry.registerCommand(renameNotebookHandler);
    registry.registerCommand(createNotebookHandler);
    registry.registerCommand(removeNotebookHandler);
    registry.registerCommand(getNotebookConfHandler);
    registry.registerCommand(setNotebookConfHandler);
}
