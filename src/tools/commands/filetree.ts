import { z } from 'zod';
import { createHandler } from '../../utils/client.js';
import { registry } from '../../utils/registry.js';
import { CommandHandler } from '../../utils/registry.js';

const namespace = 'filetree';

// Create document with Markdown
const createDocWithMdHandler: CommandHandler = {
    namespace,
    name: 'createDocWithMd',
    description: 'Create a document with Markdown content',
    params: z.object({
        notebook: z.string().describe('Notebook ID'),
        path: z.string().describe('Document path'),
        markdown: z.string().describe('Markdown content')
    }),
    handler: createHandler('/api/filetree/createDocWithMd'),
    documentation: {
        description: 'Create a document with Markdown content',
        params: {
            notebook: {
                type: 'string',
                description: 'Notebook ID',
                required: true
            },
            path: {
                type: 'string',
                description: 'Document path',
                required: true
            },
            markdown: {
                type: 'string',
                description: 'Markdown content',
                required: true
            }
        },
        returns: {
            type: 'object',
            description: 'Operation result',
            properties: {
                id: 'Document ID'
            }
        },
        examples: [
            {
                description: 'Create a document with Markdown content',
                params: {
                    notebook: "20210817205410-2kvfpfn",
                    path: "/test/doc.md",
                    markdown: "# Hello World"
                },
                response: {
                    id: "20210817205410-2kvfpfn"
                }
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#create-document-with-markdown'
    }
};

// Rename document
const renameDocHandler: CommandHandler = {
    namespace,
    name: 'renameDoc',
    description: 'Rename a document',
    params: z.object({
        notebook: z.string().describe('Notebook ID'),
        path: z.string().describe('Document path'),
        title: z.string().describe('New document title')
    }),
    handler: createHandler('/api/filetree/renameDoc'),
    documentation: {
        description: 'Rename a document',
        params: {
            notebook: {
                type: 'string',
                description: 'Notebook ID',
                required: true
            },
            path: {
                type: 'string',
                description: 'Document path',
                required: true
            },
            title: {
                type: 'string',
                description: 'New document title',
                required: true
            }
        },
        returns: {
            type: 'object',
            description: 'Operation result',
            properties: {}
        },
        examples: [
            {
                description: 'Rename a document',
                params: {
                    notebook: "20210817205410-2kvfpfn",
                    path: "/test/doc.md",
                    title: "New Title"
                },
                response: {}
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#rename-document'
    }
};

// Remove document
const removeDocHandler: CommandHandler = {
    namespace,
    name: 'removeDoc',
    description: 'Remove a document',
    params: z.object({
        notebook: z.string().describe('Notebook ID'),
        path: z.string().describe('Document path')
    }),
    handler: createHandler('/api/filetree/removeDoc'),
    documentation: {
        description: 'Remove a document',
        params: {
            notebook: {
                type: 'string',
                description: 'Notebook ID',
                required: true
            },
            path: {
                type: 'string',
                description: 'Document path',
                required: true
            }
        },
        returns: {
            type: 'object',
            description: 'Operation result',
            properties: {}
        },
        examples: [
            {
                description: 'Remove a document',
                params: {
                    notebook: "20210817205410-2kvfpfn",
                    path: "/test/doc.md"
                },
                response: {}
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#remove-document'
    }
};

// Move documents
const moveDocsHandler: CommandHandler = {
    namespace,
    name: 'moveDocs',
    description: 'Move documents',
    params: z.object({
        fromPaths: z.array(z.string()).describe('Source document paths'),
        toNotebook: z.string().describe('Target notebook ID'),
        toPath: z.string().describe('Target document path')
    }),
    handler: createHandler('/api/filetree/moveDocs'),
    documentation: {
        description: 'Move documents',
        params: {
            fromPaths: {
                type: 'array',
                description: 'Source document paths',
                required: true
            },
            toNotebook: {
                type: 'string',
                description: 'Target notebook ID',
                required: true
            },
            toPath: {
                type: 'string',
                description: 'Target document path',
                required: true
            }
        },
        returns: {
            type: 'object',
            description: 'Operation result',
            properties: {}
        },
        examples: [
            {
                description: 'Move documents',
                params: {
                    fromPaths: ["/test/doc1.md", "/test/doc2.md"],
                    toNotebook: "20210817205410-2kvfpfn",
                    toPath: "/target/path"
                },
                response: {}
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#move-documents'
    }
};

// Get document HPath by path
const getHPathByPathHandler: CommandHandler = {
    namespace,
    name: 'getHPathByPath',
    description: 'Get document HPath by path',
    params: z.object({
        notebook: z.string().describe('Notebook ID'),
        path: z.string().describe('Document path')
    }),
    handler: createHandler('/api/filetree/getHPathByPath'),
    documentation: {
        description: 'Get document HPath by path',
        params: {
            notebook: {
                type: 'string',
                description: 'Notebook ID',
                required: true
            },
            path: {
                type: 'string',
                description: 'Document path',
                required: true
            }
        },
        returns: {
            type: 'object',
            description: 'Operation result',
            properties: {
                hPath: 'Document HPath'
            }
        },
        examples: [
            {
                description: 'Get document HPath by path',
                params: {
                    notebook: "20210817205410-2kvfpfn",
                    path: "/test/doc.md"
                },
                response: {
                    hPath: "/Test/Doc"
                }
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#get-human-readable-path'
    }
};

// Get document HPath by ID
const getHPathByIDHandler: CommandHandler = {
    namespace,
    name: 'getHPathByID',
    description: 'Get document HPath by ID',
    params: z.object({
        id: z.string().describe('Document ID')
    }),
    handler: createHandler('/api/filetree/getHPathByID'),
    documentation: {
        description: 'Get document HPath by ID',
        params: {
            id: {
                type: 'string',
                description: 'Document ID',
                required: true
            }
        },
        returns: {
            type: 'object',
            description: 'Operation result',
            properties: {
                hPath: 'Document HPath'
            }
        },
        examples: [
            {
                description: 'Get document HPath by ID',
                params: {
                    id: "20210817205410-2kvfpfn"
                },
                response: {
                    hPath: "/Test/Doc"
                }
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#get-human-readable-path-by-id'
    }
};

// Register all filetree related commands
export function registerFiletreeHandlers() {
    registry.registerCommand(createDocWithMdHandler);
    registry.registerCommand(renameDocHandler);
    registry.registerCommand(removeDocHandler);
    registry.registerCommand(moveDocsHandler);
    registry.registerCommand(getHPathByPathHandler);
    registry.registerCommand(getHPathByIDHandler);
} 