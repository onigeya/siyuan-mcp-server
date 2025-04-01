import { z } from 'zod';
import { createHandler } from '../../utils/client.js';
import { registry } from '../../utils/registry.js';
import { CommandHandler } from '../../utils/registry.js';

const namespace = 'file';

// Get file
const getFileHandler: CommandHandler = {
    namespace,
    name: 'getFile',
    description: 'Get file content',
    params: z.object({
        path: z.string().describe('File path')
    }),
    handler: createHandler('/api/file/getFile'),
    documentation: {
        description: 'Get file content',
        params: {
            path: {
                type: 'string',
                description: 'File path',
                required: true
            }
        },
        returns: {
            type: 'object',
            description: 'File content',
            properties: {
                isDir: 'Whether it is a directory',
                content: 'File content'
            }
        },
        examples: [
            {
                description: 'Get file content',
                params: {
                    path: "/data/20210808180117-6v0mkxr/20200923234011-ieuun1p.sy"
                },
                response: {
                    isDir: false,
                    content: "File content..."
                }
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#get-file'
    }
};

// Put file
const putFileHandler: CommandHandler = {
    namespace,
    name: 'putFile',
    description: 'Put file content',
    params: z.object({
        path: z.string().describe('File path'),
        file: z.any().describe('File content'),
        isDir: z.boolean().optional().describe('Whether it is a directory')
    }),
    handler: createHandler('/api/file/putFile'),
    documentation: {
        description: 'Put file content',
        params: {
            path: {
                type: 'string',
                description: 'File path',
                required: true
            },
            file: {
                type: 'any',
                description: 'File content',
                required: true
            },
            isDir: {
                type: 'boolean',
                description: 'Whether it is a directory',
                required: false
            }
        },
        returns: {
            type: 'object',
            description: 'Operation result',
            properties: {
                path: 'File path'
            }
        },
        examples: [
            {
                description: 'Put file content',
                params: {
                    path: "/data/20210808180117-6v0mkxr/20200923234011-ieuun1p.sy",
                    file: "New file content"
                },
                response: {
                    path: "/data/20210808180117-6v0mkxr/20200923234011-ieuun1p.sy"
                }
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#put-file'
    }
};

// Remove file
const removeFileHandler: CommandHandler = {
    namespace,
    name: 'removeFile',
    description: 'Remove file',
    params: z.object({
        path: z.string().describe('File path')
    }),
    handler: createHandler('/api/file/removeFile'),
    documentation: {
        description: 'Remove file',
        params: {
            path: {
                type: 'string',
                description: 'File path',
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
                description: 'Remove file',
                params: {
                    path: "/data/20210808180117-6v0mkxr/20200923234011-ieuun1p.sy"
                },
                response: {}
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#remove-file'
    }
};

// List files
const readDirHandler: CommandHandler = {
    namespace,
    name: 'readDir',
    description: 'List files in directory',
    params: z.object({
        path: z.string().describe('Directory path')
    }),
    handler: createHandler('/api/file/readDir'),
    documentation: {
        description: 'List files in directory',
        params: {
            path: {
                type: 'string',
                description: 'Directory path',
                required: true
            }
        },
        returns: {
            type: 'object',
            description: 'Directory content',
            properties: {
                files: 'Array of file information'
            }
        },
        examples: [
            {
                description: 'List files in directory',
                params: {
                    path: "/data/20210808180117-6v0mkxr"
                },
                response: {
                    files: [
                        {
                            isDir: false,
                            name: "20200923234011-ieuun1p.sy"
                        }
                    ]
                }
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#list-files'
    }
};

// Register all file related commands
export function registerFileHandlers() {
    registry.registerCommand(getFileHandler);
    registry.registerCommand(putFileHandler);
    registry.registerCommand(removeFileHandler);
    registry.registerCommand(readDirHandler);
} 