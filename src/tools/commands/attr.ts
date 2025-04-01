import { z } from 'zod';
import { createHandler } from '../../utils/client.js';
import { registry } from '../../utils/registry.js';
import { CommandHandler } from '../../utils/registry.js';

const namespace = 'attr';

// Set block attributes
const setBlockAttrsHandler: CommandHandler = {
    namespace,
    name: 'setBlockAttrs',
    description: 'Set block attributes',
    params: z.object({
        id: z.string().describe('Block ID'),
        attrs: z.record(z.string()).describe('Attribute key-value pairs')
    }),
    handler: createHandler('/api/attr/setBlockAttrs'),
    documentation: {
        description: 'Set block attributes',
        params: {
            id: {
                type: 'string',
                description: 'Block ID',
                required: true
            },
            attrs: {
                type: 'object',
                description: 'Attribute key-value pairs',
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
                description: 'Set block attributes',
                params: {
                    id: "20210817205410-2kvfpfn",
                    attrs: {
                        "custom-key": "custom-value"
                    }
                },
                response: {}
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#set-block-attributes'
    }
};

// Get block attributes
const getBlockAttrsHandler: CommandHandler = {
    namespace,
    name: 'getBlockAttrs',
    description: 'Get block attributes',
    params: z.object({
        id: z.string().describe('Block ID')
    }),
    handler: createHandler('/api/attr/getBlockAttrs'),
    documentation: {
        description: 'Get block attributes',
        params: {
            id: {
                type: 'string',
                description: 'Block ID',
                required: true
            }
        },
        returns: {
            type: 'object',
            description: 'Block attributes',
            properties: {
                id: 'Block ID',
                type: 'Block type',
                name: 'Name'
            }
        },
        examples: [
            {
                description: 'Get block attributes',
                params: {
                    id: "20210817205410-2kvfpfn"
                },
                response: {
                    id: "20210817205410-2kvfpfn",
                    type: "doc",
                    name: "Document name"
                }
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#get-block-attributes'
    }
};

// Register all attribute related commands
export function registerAttrHandlers() {
    registry.registerCommand(setBlockAttrsHandler);
    registry.registerCommand(getBlockAttrsHandler);
} 