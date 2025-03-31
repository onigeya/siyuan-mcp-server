import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { client } from '../utils/client.js';

export function registerSqlTools(server: McpServer): void {
    // Execute SQL query
    server.tool(
        'siyuan_sql_query',
        'Execute SQL query',
        {
            stmt: z.string().describe('SQL statement')
        },
        async ({ stmt }) => {
            const result = await client.post('/api/query/sql', {
                stmt
            });
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );

    // Flush transaction
    server.tool(
        'siyuan_sql_flushTransaction',
        'Flush transaction',
        {},
        async () => {
            const result = await client.post('/api/query/flushTransaction', {});
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }]
            };
        }
    );
} 