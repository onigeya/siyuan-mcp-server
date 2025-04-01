import { z } from 'zod';
import { createHandler } from '../../utils/client.js';
import { registry } from '../../utils/registry.js';
import { CommandHandler } from '../../utils/registry.js';

const namespace = 'search';

// Full text search
const fullTextSearchHandler: CommandHandler = {
    namespace,
    name: 'fullTextSearch',
    description: 'Full text search',
    params: z.object({
        query: z.string().describe('Search query'),
        method: z.number().optional().describe('Search method: 0 keyword, 1 query, 2 regex'),
        types: z.array(z.string()).optional().describe('Search types'),
        paths: z.array(z.string()).optional().describe('Search paths'),
        groupBy: z.number().optional().describe('Group by: 0 none, 1 notebook'),
        orderBy: z.number().optional().describe('Order by: 0 none, 1 name, 2 size, 3 updated'),
        page: z.number().optional().describe('Page number'),
        limit: z.number().optional().describe('Results per page')
    }),
    handler: createHandler('/api/search/fullTextSearch'),
    documentation: {
        description: 'Full text search',
        params: {
            query: {
                type: 'string',
                description: 'Search query',
                required: true
            },
            method: {
                type: 'number',
                description: 'Search method: 0 keyword, 1 query, 2 regex',
                required: false
            },
            types: {
                type: 'array',
                description: 'Search types',
                required: false
            },
            paths: {
                type: 'array',
                description: 'Search paths',
                required: false
            },
            groupBy: {
                type: 'number',
                description: 'Group by: 0 none, 1 notebook',
                required: false
            },
            orderBy: {
                type: 'number',
                description: 'Order by: 0 none, 1 name, 2 size, 3 updated',
                required: false
            },
            page: {
                type: 'number',
                description: 'Page number',
                required: false
            },
            limit: {
                type: 'number',
                description: 'Results per page',
                required: false
            }
        },
        returns: {
            type: 'object',
            description: 'Search results',
            properties: {
                blocks: 'Array of matched blocks',
                matchedBlockCount: 'Total number of matched blocks',
                matchedRootCount: 'Total number of matched root blocks'
            }
        },
        examples: [
            {
                description: 'Full text search',
                params: {
                    query: "keyword",
                    method: 0,
                    types: ["doc", "heading"],
                    paths: ["/path/to/search"],
                    groupBy: 1,
                    orderBy: 0,
                    page: 1,
                    limit: 10
                },
                response: {
                    blocks: [
                        {
                            id: "20200812220555-lj3enxa",
                            content: "Block content with keyword"
                        }
                    ],
                    matchedBlockCount: 1,
                    matchedRootCount: 1
                }
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#full-text-search'
    }
};

// Register all search related commands
export function registerSearchHandlers() {
    registry.registerCommand(fullTextSearchHandler);
} 