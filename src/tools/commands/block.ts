import { z } from 'zod';
import { createHandler } from '../../utils/client.js';
import { registry } from '../../utils/registry.js';
import { CommandHandler } from '../../utils/registry.js';

const namespace = 'block';

// Insert block
const insertBlockHandler: CommandHandler = {
    namespace,
    name: 'insertBlock',
    description: 'Insert a block',
    params: z.object({
        data: z.string().describe('Block content in Markdown format'),
        dataType: z.enum(['markdown', 'dom']).describe('Content type'),
        previousID: z.string().optional().describe('Previous block ID'),
        parentID: z.string().optional().describe('Parent block ID')
    }),
    handler: createHandler('/api/block/insertBlock'),
    documentation: {
        description: 'Insert a block',
        params: {
            data: {
                type: 'string',
                description: 'Block content in Markdown format',
                required: true
            },
            dataType: {
                type: 'string',
                description: 'Content type: markdown or dom',
                required: true
            },
            previousID: {
                type: 'string',
                description: 'Previous block ID',
                required: false
            },
            parentID: {
                type: 'string',
                description: 'Parent block ID',
                required: false
            }
        },
        returns: {
            type: 'object',
            description: 'Operation result',
            properties: {
                doOperations: 'Array of operations performed'
            }
        },
        examples: [
            {
                description: 'Insert a block',
                params: {
                    data: "New block content",
                    dataType: "markdown",
                    previousID: "20200812220555-lj3enxa",
                    parentID: "20200812220555-lj3enxa"
                },
                response: {
                    doOperations: [
                        {
                            action: "insert",
                            data: "New block content",
                            id: "20200812220555-lj3enxa"
                        }
                    ]
                }
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#insert-block'
    }
};

// Update block
const updateBlockHandler: CommandHandler = {
    namespace,
    name: 'updateBlock',
    description: 'Update block content',
    params: z.object({
        data: z.string().describe('Block content in Markdown format'),
        dataType: z.enum(['markdown', 'dom']).describe('Content type'),
        id: z.string().describe('Block ID')
    }),
    handler: createHandler('/api/block/updateBlock'),
    documentation: {
        description: 'Update block content',
        params: {
            data: {
                type: 'string',
                description: 'Block content in Markdown format',
                required: true
            },
            dataType: {
                type: 'string',
                description: 'Content type: markdown or dom',
                required: true
            },
            id: {
                type: 'string',
                description: 'Block ID',
                required: true
            }
        },
        returns: {
            type: 'object',
            description: 'Operation result',
            properties: {
                doOperations: 'Array of operations performed'
            }
        },
        examples: [
            {
                description: 'Update block content',
                params: {
                    data: "Updated content",
                    dataType: "markdown",
                    id: "20200812220555-lj3enxa"
                },
                response: {
                    doOperations: [
                        {
                            action: "update",
                            data: "Updated content",
                            id: "20200812220555-lj3enxa"
                        }
                    ]
                }
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#update-block'
    }
};

// Delete block
const deleteBlockHandler: CommandHandler = {
    namespace,
    name: 'deleteBlock',
    description: 'Delete a block',
    params: z.object({
        id: z.string().describe('Block ID')
    }),
    handler: createHandler('/api/block/deleteBlock'),
    documentation: {
        description: 'Delete a block',
        params: {
            id: {
                type: 'string',
                description: 'Block ID',
                required: true
            }
        },
        returns: {
            type: 'object',
            description: 'Operation result',
            properties: {
                doOperations: 'Array of operations performed'
            }
        },
        examples: [
            {
                description: 'Delete a block',
                params: {
                    id: "20200812220555-lj3enxa"
                },
                response: {
                    doOperations: [
                        {
                            action: "delete",
                            id: "20200812220555-lj3enxa"
                        }
                    ]
                }
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#delete-block'
    }
};

// Move block
const moveBlockHandler: CommandHandler = {
    namespace,
    name: 'moveBlock',
    description: 'Move a block',
    params: z.object({
        id: z.string().describe('Block ID to move'),
        previousID: z.string().optional().describe('Previous block ID'),
        parentID: z.string().optional().describe('Parent block ID')
    }),
    handler: createHandler('/api/block/moveBlock'),
    documentation: {
        description: 'Move a block',
        params: {
            id: {
                type: 'string',
                description: 'Block ID to move',
                required: true
            },
            previousID: {
                type: 'string',
                description: 'Previous block ID',
                required: false
            },
            parentID: {
                type: 'string',
                description: 'Parent block ID',
                required: false
            }
        },
        returns: {
            type: 'object',
            description: 'Operation result',
            properties: {
                doOperations: 'Array of operations performed'
            }
        },
        examples: [
            {
                description: 'Move a block',
                params: {
                    id: "20200812220555-lj3enxa",
                    previousID: "20200812220555-lj3enxa",
                    parentID: "20200812220555-lj3enxa"
                },
                response: {
                    doOperations: [
                        {
                            action: "move",
                            id: "20200812220555-lj3enxa",
                            previousID: "20200812220555-lj3enxa",
                            parentID: "20200812220555-lj3enxa"
                        }
                    ]
                }
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#move-block'
    }
};

// Get block Kramdown
const getBlockKramdownHandler: CommandHandler = {
    namespace,
    name: 'getBlockKramdown',
    description: 'Get block Kramdown content',
    params: z.object({
        id: z.string().describe('Block ID')
    }),
    handler: createHandler('/api/block/getBlockKramdown'),
    documentation: {
        description: 'Get block Kramdown content',
        params: {
            id: {
                type: 'string',
                description: 'Block ID',
                required: true
            }
        },
        returns: {
            type: 'object',
            description: 'Block Kramdown content',
            properties: {
                id: 'Block ID',
                kramdown: 'Block content in Kramdown format'
            }
        },
        examples: [
            {
                description: 'Get block Kramdown content',
                params: {
                    id: "20200812220555-lj3enxa"
                },
                response: {
                    id: "20200812220555-lj3enxa",
                    kramdown: "## Block content"
                }
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#get-block-kramdown'
    }
};

// Register all block related commands
export function registerBlockHandlers() {
    registry.registerCommand(insertBlockHandler);
    registry.registerCommand(updateBlockHandler);
    registry.registerCommand(deleteBlockHandler);
    registry.registerCommand(moveBlockHandler);
    registry.registerCommand(getBlockKramdownHandler);
} 