import { z } from 'zod';
import { createHandler } from '../../utils/client.js';
import { registry } from '../../utils/registry.js';
import { CommandHandler } from '../../utils/registry.js';

const namespace = 'network';

// Forward proxy
const forwardProxy: CommandHandler = {
    namespace,
    name: 'forwardProxy',
    description: 'Forward proxy request',
    params: z.object({
        url: z.string().describe('Target URL'),
        method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']).describe('HTTP method'),
        payload: z.any().optional().describe('Request payload'),
        headers: z.record(z.string()).optional().describe('Request headers')
    }),
    handler: createHandler('/api/network/forwardProxy'),
    documentation: {
        description: 'Forward proxy request',
        params: {
            url: {
                type: 'string',
                description: 'Target URL',
                required: true
            },
            method: {
                type: 'string',
                description: 'HTTP method: GET, POST, PUT, PATCH, DELETE',
                required: true
            },
            payload: {
                type: 'any',
                description: 'Request payload',
                required: false
            },
            headers: {
                type: 'object',
                description: 'Request headers',
                required: false
            }
        },
        returns: {
            type: 'object',
            description: 'Response data',
            properties: {
                body: 'Response body',
                headers: 'Response headers',
                status: 'HTTP status code'
            }
        },
        examples: [
            {
                description: 'Forward GET request',
                params: {
                    url: "https://api.example.com/data",
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer token"
                    }
                },
                response: {
                    body: "Response data",
                    headers: {
                        "content-type": "application/json"
                    },
                    status: 200
                }
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#forward-proxy'
    }
};

// Register all network related commands
export function registerNetworkHandlers() {
    registry.registerCommand(forwardProxy);
} 