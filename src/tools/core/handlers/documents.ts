import { z } from 'zod';
import { client } from '../../../utils/client.js';
import { ToolRegistry, Documentation } from '../types.js';

// 命令文档
const createDocWithMdDoc: Documentation = {
    description: '使用Markdown创建文档',
    params: {
        notebook: {
            type: 'string',
            description: '笔记本ID',
            required: true
        },
        path: {
            type: 'string', 
            description: '文档路径，以/开头，使用/作为层级分隔符',
            required: true
        },
        markdown: {
            type: 'string',
            description: 'GFM Markdown内容',
            required: true
        }
    },
    returns: {
        type: 'object',
        description: '创建成功返回文档ID',
        properties: {
            id: {
                type: 'string',
                description: '新创建的文档ID'
            }
        }
    },
    examples: [{
        description: '创建一个新的Markdown文档',
        params: {
            notebook: "20210817205410-2kvfpfn",
            path: "/test/newdoc",
            markdown: "# 新文档\n\n这是一个测试文档"
        },
        response: {
            code: 0,
            msg: "",
            data: {
                id: "20220126215949-r1wvoch"
            }
        }
    }],
    apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#create-a-document-with-markdown'
};

// 重命名文档的文档
const renameDocDoc: Documentation = {
    description: '重命名文档',
    params: {
        notebook: {
            type: 'string',
            description: '笔记本ID',
            required: true
        },
        path: {
            type: 'string',
            description: '文档路径',
            required: true
        },
        title: {
            type: 'string',
            description: '新标题',
            required: true
        }
    },
    returns: {
        type: 'object',
        description: '重命名成功返回空对象',
        properties: {}
    },
    examples: [{
        description: '重命名文档',
        params: {
            notebook: "20210817205410-2kvfpfn",
            path: "/test/doc",
            title: "新标题"
        },
        response: {
            code: 0,
            msg: "",
            data: {}
        }
    }],
    apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#rename-a-document'
};

// 通过ID重命名文档的文档
const renameDocByIDDoc: Documentation = {
    description: '通过ID重命名文档',
    params: {
        id: {
            type: 'string',
            description: '文档ID',
            required: true
        },
        title: {
            type: 'string',
            description: '新标题',
            required: true
        }
    },
    returns: {
        type: 'object',
        description: '重命名成功返回空对象',
        properties: {}
    },
    examples: [{
        description: '通过ID重命名文档',
        params: {
            id: "20220126215949-r1wvoch",
            title: "新标题"
        },
        response: {
            code: 0,
            msg: "",
            data: {}
        }
    }],
    apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#rename-a-document'
};

// 删除文档的文档
const removeDocDoc: Documentation = {
    description: '删除文档',
    params: {
        notebook: {
            type: 'string',
            description: '笔记本ID',
            required: true
        },
        path: {
            type: 'string',
            description: '文档路径',
            required: true
        }
    },
    returns: {
        type: 'object',
        description: '删除成功返回空对象',
        properties: {}
    },
    examples: [{
        description: '删除文档',
        params: {
            notebook: "20210817205410-2kvfpfn",
            path: "/test/doc"
        },
        response: {
            code: 0,
            msg: "",
            data: {}
        }
    }],
    apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#remove-a-document'
};

// 通过ID删除文档的文档
const removeDocByIDDoc: Documentation = {
    description: '通过ID删除文档',
    params: {
        id: {
            type: 'string',
            description: '文档ID',
            required: true
        }
    },
    returns: {
        type: 'object',
        description: '删除成功返回空对象',
        properties: {}
    },
    examples: [{
        description: '通过ID删除文档',
        params: {
            id: "20220126215949-r1wvoch"
        },
        response: {
            code: 0,
            msg: "",
            data: {}
        }
    }],
    apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#remove-a-document'
};

// 移动文档的文档
const moveDocsDoc: Documentation = {
    description: '移动文档',
    params: {
        fromPaths: {
            type: 'array',
            description: '源路径列表',
            required: true
        },
        toNotebook: {
            type: 'string',
            description: '目标笔记本ID',
            required: true
        },
        toPath: {
            type: 'string',
            description: '目标路径',
            required: true
        }
    },
    returns: {
        type: 'object',
        description: '移动成功返回空对象',
        properties: {}
    },
    examples: [{
        description: '移动文档',
        params: {
            fromPaths: ["/test/doc1", "/test/doc2"],
            toNotebook: "20210817205410-2kvfpfn",
            toPath: "/target"
        },
        response: {
            code: 0,
            msg: "",
            data: {}
        }
    }],
    apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#move-documents'
};

// 通过ID移动文档的文档
const moveDocsByIDDoc: Documentation = {
    description: '通过ID移动文档',
    params: {
        fromIDs: {
            type: 'array',
            description: '源文档ID列表',
            required: true
        },
        toID: {
            type: 'string',
            description: '目标父级ID',
            required: true
        }
    },
    returns: {
        type: 'object',
        description: '移动成功返回空对象',
        properties: {}
    },
    examples: [{
        description: '通过ID移动文档',
        params: {
            fromIDs: ["20220126215949-r1wvoch", "20220126215950-r2wvoch"],
            toID: "20220126215951-r3wvoch"
        },
        response: {
            code: 0,
            msg: "",
            data: {}
        }
    }],
    apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#move-documents'
};

// 查询文档
const getHPathByPathDoc: Documentation = {
    description: '根据路径获取人类可读路径',
    params: {
        notebook: {
            type: 'string',
            description: '笔记本ID',
            required: true
        },
        path: {
            type: 'string',
            description: '文档路径',
            required: true
        }
    },
    returns: {
        type: 'object',
        description: '返回人类可读的路径',
        properties: {
            hPath: {
                type: 'string',
                description: '人类可读路径'
            }
        }
    },
    examples: [{
        description: '获取文档的人类可读路径',
        params: {
            notebook: "20210817205410-2kvfpfn",
            path: "/test/doc"
        },
        response: {
            code: 0,
            msg: "",
            data: {
                hPath: "/测试/文档"
            }
        }
    }],
    apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#get-human-readable-path-based-on-path'
};

// 通过ID获取人类可读路径的文档
const getHPathByIDDoc: Documentation = {
    description: '通过ID获取人类可读路径',
    params: {
        id: {
            type: 'string',
            description: '块ID',
            required: true
        }
    },
    returns: {
        type: 'object',
        description: '返回人类可读的路径',
        properties: {
            hPath: {
                type: 'string',
                description: '人类可读路径'
            }
        }
    },
    examples: [{
        description: '通过ID获取人类可读路径',
        params: {
            id: "20220126215949-r1wvoch"
        },
        response: {
            code: 0,
            msg: "",
            data: {
                hPath: "/测试/文档"
            }
        }
    }],
    apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#get-human-readable-path-based-on-id'
};

// 通过ID获取存储路径的文档
const getPathByIDDoc: Documentation = {
    description: '通过ID获取存储路径',
    params: {
        id: {
            type: 'string',
            description: '块ID',
            required: true
        }
    },
    returns: {
        type: 'object',
        description: '返回存储路径',
        properties: {
            path: {
                type: 'string',
                description: '存储路径'
            }
        }
    },
    examples: [{
        description: '通过ID获取存储路径',
        params: {
            id: "20220126215949-r1wvoch"
        },
        response: {
            code: 0,
            msg: "",
            data: {
                path: "/test/doc"
            }
        }
    }],
    apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#get-storage-path-based-on-id'
};

// 根据人类可读路径获取ID的文档
const getIDsByHPathDoc: Documentation = {
    description: '根据人类可读路径获取ID',
    params: {
        path: {
            type: 'string',
            description: '人类可读路径',
            required: true
        },
        notebook: {
            type: 'string',
            description: '笔记本ID',
            required: true
        }
    },
    returns: {
        type: 'object',
        description: '返回ID列表',
        properties: {
            ids: {
                type: 'array',
                description: 'ID列表'
            }
        }
    },
    examples: [{
        description: '根据人类可读路径获取ID',
        params: {
            path: "/测试/文档",
            notebook: "20210817205410-2kvfpfn"
        },
        response: {
            code: 0,
            msg: "",
            data: {
                ids: ["20220126215949-r1wvoch"]
            }
        }
    }],
    apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#get-ids-based-on-human-readable-path'
};

// 命令处理器
const documentsCommands = {
    // 创建文档
    async createDocWithMd({ notebook, path, markdown }: { notebook: string; path: string; markdown: string }) {
        const result = await client.post('/api/filetree/createDocWithMd', {
            notebook,
            path,
            markdown
        });
        return result;
    },

    // 重命名文档
    async renameDoc({ notebook, path, title }: { notebook: string; path: string; title: string }) {
        const result = await client.post('/api/filetree/renameDoc', {
            notebook,
            path,
            title
        });
        return result;
    },

    // 通过ID重命名文档
    async renameDocByID({ id, title }: { id: string; title: string }) {
        const result = await client.post('/api/filetree/renameDocByID', {
            id,
            title
        });
        return result;
    },

    // 删除文档
    async removeDoc({ notebook, path }: { notebook: string; path: string }) {
        const result = await client.post('/api/filetree/removeDoc', {
            notebook,
            path
        });
        return result;
    },

    // 通过ID删除文档
    async removeDocByID({ id }: { id: string }) {
        const result = await client.post('/api/filetree/removeDocByID', {
            id
        });
        return result;
    },

    // 移动文档
    async moveDocs({ fromPaths, toNotebook, toPath }: { fromPaths: string[]; toNotebook: string; toPath: string }) {
        const result = await client.post('/api/filetree/moveDocs', {
            fromPaths,
            toNotebook,
            toPath
        });
        return result;
    },

    // 通过ID移动文档
    async moveDocsByID({ fromIDs, toID }: { fromIDs: string[]; toID: string }) {
        const result = await client.post('/api/filetree/moveDocsByID', {
            fromIDs,
            toID
        });
        return result;
    }
};

// 查询处理器
const documentsQueries = {
    // 获取人类可读路径（基于路径）
    async getHPathByPath({ notebook, path }: { notebook: string; path: string }) {
        const result = await client.post('/api/filetree/getHPathByPath', {
            notebook,
            path
        });
        return result;
    },

    // 获取人类可读路径（基于ID）
    async getHPathByID({ id }: { id: string }) {
        const result = await client.post('/api/filetree/getHPathByID', {
            id
        });
        return result;
    },

    // 获取存储路径
    async getPathByID({ id }: { id: string }) {
        const result = await client.post('/api/filetree/getPathByID', {
            id
        });
        return result;
    },

    // 根据人类可读路径获取ID
    async getIDsByHPath({ path, notebook }: { path: string; notebook: string }) {
        const result = await client.post('/api/filetree/getIDsByHPath', {
            path,
            notebook
        });
        return result;
    }
};

// 注册处理器
export function registerDocumentsHandlers() {
    // 注册命令
    ToolRegistry.registerCommand({
        type: 'documents.createDocWithMd',
        description: '使用Markdown创建文档',
        params: {
            notebook: z.string().describe('笔记本ID'),
            path: z.string().describe('文档路径，以/开头，使用/作为层级分隔符'),
            markdown: z.string().describe('GFM Markdown内容')
        },
        documentation: createDocWithMdDoc
    });

    ToolRegistry.registerCommand({
        type: 'documents.rename',
        description: '重命名文档',
        params: {
            notebook: z.string().describe('笔记本ID'),
            path: z.string().describe('文档路径'),
            title: z.string().describe('新标题')
        },
        documentation: renameDocDoc
    });

    ToolRegistry.registerCommand({
        type: 'documents.renameById',
        description: '通过ID重命名文档',
        params: {
            id: z.string().describe('文档ID'),
            title: z.string().describe('新标题')
        },
        documentation: renameDocByIDDoc
    });

    ToolRegistry.registerCommand({
        type: 'documents.remove',
        description: '删除文档',
        params: {
            notebook: z.string().describe('笔记本ID'),
            path: z.string().describe('文档路径')
        },
        documentation: removeDocDoc
    });

    ToolRegistry.registerCommand({
        type: 'documents.removeById',
        description: '通过ID删除文档',
        params: {
            id: z.string().describe('文档ID')
        },
        documentation: removeDocByIDDoc
    });

    ToolRegistry.registerCommand({
        type: 'documents.move',
        description: '移动文档',
        params: {
            fromPaths: z.array(z.string()).describe('源路径列表'),
            toNotebook: z.string().describe('目标笔记本ID'),
            toPath: z.string().describe('目标路径')
        },
        documentation: moveDocsDoc
    });

    ToolRegistry.registerCommand({
        type: 'documents.moveById',
        description: '通过ID移动文档',
        params: {
            fromIDs: z.array(z.string()).describe('源文档ID列表'),
            toID: z.string().describe('目标父级ID')
        },
        documentation: moveDocsByIDDoc
    });

    // 注册查询
    ToolRegistry.registerQuery({
        type: 'documents.getHPathByPath',
        description: '根据路径获取人类可读路径',
        params: {
            notebook: z.string().describe('笔记本ID'),
            path: z.string().describe('文档路径')
        },
        documentation: getHPathByPathDoc
    });

    ToolRegistry.registerQuery({
        type: 'documents.getHPathById',
        description: '根据ID获取人类可读路径',
        params: {
            id: z.string().describe('块ID')
        },
        documentation: getHPathByIDDoc
    });

    ToolRegistry.registerQuery({
        type: 'documents.getPathById',
        description: '根据ID获取存储路径',
        params: {
            id: z.string().describe('块ID')
        },
        documentation: getPathByIDDoc
    });

    ToolRegistry.registerQuery({
        type: 'documents.getIdsByHPath',
        description: '根据人类可读路径获取ID',
        params: {
            path: z.string().describe('人类可读路径'),
            notebook: z.string().describe('笔记本ID')
        },
        documentation: getIDsByHPathDoc
    });
}

export { documentsCommands, documentsQueries }; 