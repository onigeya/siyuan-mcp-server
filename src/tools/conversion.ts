import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { client } from '../utils/client.js';

export function registerConversionTools(server: McpServer): void {
    // Pandoc conversion
    server.tool(
        'siyuan_conversion_pandoc',
        'Pandoc',
        {
            dir: z.string().describe('Working directory name'),
            args: z.array(z.string()).describe('Pandoc command line parameters')
        },
        async ({ dir, args }) => {
            const result = await client.post('/api/convert/pandoc', {
                dir,
                args
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