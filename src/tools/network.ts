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
]).describe('编码方式');

export function registerNetworkTools(server: McpServer): void {
    // Forward proxy
    server.tool(
        'siyuan_network_forwardProxy',
        '转发代理请求',
        {
            url: z.string().describe('要转发的 URL'),
            method: z.string().optional().describe('HTTP 方法，默认为 POST'),
            timeout: z.number().optional().describe('超时时间（毫秒），默认为 7000'),
            contentType: z.string().optional().describe('Content-Type，默认为 application/json'),
            headers: z.array(z.record(z.string())).optional().describe('HTTP 头'),
            payload: z.union([z.record(z.any()), z.string()]).optional().describe('HTTP 负载，对象或字符串'),
            payloadEncoding: encodingSchema.optional().describe('payload 的编码方式，默认为 text'),
            responseEncoding: encodingSchema.optional().describe('响应 body 的编码方式，默认为 text')
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