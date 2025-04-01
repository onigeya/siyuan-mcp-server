import { z } from 'zod';
import { createHandler } from '../../utils/client.js';
import { registry } from '../../utils/registry.js';
import { CommandHandler } from '../../utils/registry.js';

const namespace = 'query';

// SQL query
const sqlHandler: CommandHandler = {
    namespace,
    name: 'sql',
    description: 'Execute SQL query',
    params: z.object({
        stmt: z.string().describe('SQL statement')
    }),
    handler: createHandler('/api/query/sql'),
    documentation: {
        description: 'Execute SQL query',
        params: {
            stmt: {
                type: 'string',
                description: 'SQL statement',
                required: true
            }
        },
        returns: {
            type: 'object',
            description: 'Query results',
            properties: {
                data: 'Array of result rows'
            }
        },
        examples: [
            {
                description: 'This example demonstrates querying paragraph blocks with a limit of 7 results, showing how to use SQL to retrieve specific block types from the database.',
                params: {
                    stmt: "SELECT * FROM blocks WHERE type = 'p' LIMIT 7"
                },
                response: {
                    data: [
                        {
                            id: "20200812220555-lj3enxa",
                            content: "Block content"
                        }
                    ]
                }
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#sql-query'
    }
};

// Block query
const blockHandler: CommandHandler = {
    namespace,
    name: 'block',
    description: 'Query block by ID',
    params: z.object({
        id: z.string().describe('Block ID')
    }),
    handler: createHandler('/api/query/block'),
    documentation: {
        description: 'Query block by ID',
        params: {
            id: {
                type: 'string',
                description: 'Block ID',
                required: true
            }
        },
        returns: {
            type: 'object',
            description: 'Block information',
            properties: {
                id: 'Block ID',
                type: 'Block type',
                content: 'Block content'
            }
        },
        examples: [
            {
                description: 'This example retrieves detailed information about a specific block using its unique identifier, including its type and content.',
                params: {
                    id: "20200812220555-lj3enxa"
                },
                response: {
                    id: "20200812220555-lj3enxa",
                    type: "p",
                    content: "Block content"
                }
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#query-block'
    }
};

// Register all query related commands
export function registerQueryHandlers() {
    registry.registerCommand(sqlHandler);
    registry.registerCommand(blockHandler);
} 