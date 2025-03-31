import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { client } from '../utils/client.js';

const encodingSchema = z.enum([
    'text',
    'base64', 'base64-std',
    'base64-url',
    'base32', 'base32-std',
    'base32-hex',
    'hex'
]).describe('The encoding scheme');

export function registerNetworkTools(server: McpServer): void {
    // Forward proxy
    server.tool(
        'siyuan_network_forwardProxy',
        'Forward proxy',
        {
            url: z.string().describe('URL to forward'),
            method: z.string().optional().describe('HTTP method, default is POST'),
            timeout: z.number().optional().describe('Timeout in milliseconds, default is 7000'),
            contentType: z.string().optional().describe('Content-Type, default is application/json'),
            headers: z.array(z.record(z.string())).optional().describe('HTTP headers'),
            payload: z.union([z.record(z.any()), z.string()]).optional().describe('HTTP payload, object or string'),
            payloadEncoding: encodingSchema.optional().describe('The encoding scheme used by payload, default is text'),
            responseEncoding: encodingSchema.optional().describe('The encoding scheme used by body in response data, default is text')
        },
        async ({ url, method, timeout, contentType, headers, payload, payloadEncoding, responseEncoding }) => {
            const result = await client.post('/api/network/forwardProxy', {
                url,
                method,
                timeout,
                contentType,
                headers,
                payload,
                payloadEncoding,
                responseEncoding
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