import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { client } from '../utils/client.js';

export function registerBlocksTools(server: McpServer): void {
    // Insert blocks
    server.tool(
        'siyuan_block_insertBlock',
        'Insert blocks',
        {
            dataType: z.string().describe('Data type'),
            data: z.string().describe('Data content'),
            previousID: z.string().describe('Previous block ID')
        },
        async ({ dataType, data, previousID }) => {
            const result = await client.post('/api/block/insertBlock', {
                dataType,
                data,
                previousID
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Prepend blocks
    server.tool(
        'siyuan_block_prependBlock',
        'Prepend blocks',
        {
            dataType: z.string().describe('Data type'),
            data: z.string().describe('Data content'),
            parentID: z.string().describe('Parent block ID')
        },
        async ({ dataType, data, parentID }) => {
            const result = await client.post('/api/block/prependBlock', {
                dataType,
                data,
                parentID
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Append blocks
    server.tool(
        'siyuan_block_appendBlock',
        'Append blocks',
        {
            dataType: z.string().describe('Data type'),
            data: z.string().describe('Data content'),
            parentID: z.string().describe('Parent block ID')
        },
        async ({ dataType, data, parentID }) => {
            const result = await client.post('/api/block/appendBlock', {
                dataType,
                data,
                parentID
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Update a block
    server.tool(
        'siyuan_block_updateBlock',
        'Update a block',
        {
            dataType: z.string().describe('Data type'),
            data: z.string().describe('Data content'),
            id: z.string().describe('Block ID')
        },
        async ({ dataType, data, id }) => {
            const result = await client.post('/api/block/updateBlock', {
                dataType,
                data,
                id
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Delete a block
    server.tool(
        'siyuan_block_deleteBlock',
        'Delete a block',
        {
            id: z.string().describe('Block ID')
        },
        async ({ id }) => {
            const result = await client.post('/api/block/deleteBlock', {
                id
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Move a block
    server.tool(
        'siyuan_block_moveBlock',
        'Move a block',
        {
            id: z.string().describe('Block ID to move'),
            previousID: z.string().optional().describe('Previous block ID'),
            parentID: z.string().optional().describe('Parent block ID')
        },
        async ({ id, previousID, parentID }) => {
            const result = await client.post('/api/block/moveBlock', {
                id,
                previousID,
                parentID
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Fold a block
    server.tool(
        'siyuan_block_foldBlock',
        'Fold a block',
        {
            id: z.string().describe('Block ID')
        },
        async ({ id }) => {
            const result = await client.post('/api/block/foldBlock', {
                id
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Unfold a block
    server.tool(
        'siyuan_block_unfoldBlock',
        'Unfold a block',
        {
            id: z.string().describe('Block ID')
        },
        async ({ id }) => {
            const result = await client.post('/api/block/unfoldBlock', {
                id
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Get a block kramdown
    server.tool(
        'siyuan_block_getBlockKramdown',
        'Get a block kramdown',
        {
            id: z.string().describe('Block ID')
        },
        async ({ id }) => {
            const result = await client.post('/api/block/getBlockKramdown', {
                id
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Get child blocks
    server.tool(
        'siyuan_block_getChildBlocks',
        'Get child blocks',
        {
            id: z.string().describe('Block ID')
        },
        async ({ id }) => {
            const result = await client.post('/api/block/getChildBlocks', {
                id
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Transfer block ref
    server.tool(
        'siyuan_block_transferBlockRef',
        'Transfer block ref',
        {
            fromID: z.string().describe('Source block ID'),
            toID: z.string().describe('Target block ID'),
            refIDs: z.array(z.string()).describe('Reference block IDs')
        },
        async ({ fromID, toID, refIDs }) => {
            const result = await client.post('/api/block/transferBlockRef', {
                fromID,
                toID,
                refIDs
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );
} 