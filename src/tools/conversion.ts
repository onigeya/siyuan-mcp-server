import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { client } from '../utils/client.js';

export function registerConversionTools(server: McpServer): void {
    // Pandoc conversion
    server.tool(
        'siyuan_conversion_pandoc',
        'Pandoc 格式转换',
        {
            dir: z.string().describe('工作目录名称'),
            args: z.array(z.string()).describe('Pandoc 命令行参数')
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