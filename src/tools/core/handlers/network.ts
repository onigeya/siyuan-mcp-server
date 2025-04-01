import { z } from 'zod';
import { client } from '../../../utils/client.js';
import { ToolRegistry } from '../types.js';

// 命令处理器
const networkCommands = {
    // 代理请求
    async serveProxy({ url, method, payload }: { url: string; method?: string; payload?: any }) {
        const result = await client.post('/api/network/proxy', {
            url,
            method,
            payload
        });
        return result;
    }
};

// 注册处理器
export function registerNetworkHandlers() {
    // 注册命令
    ToolRegistry.registerCommand({
        type: 'network.proxy',
        description: '代理网络请求',
        params: {
            url: z.string().describe('请求URL'),
            method: z.string().optional().describe('请求方法'),
            payload: z.any().optional().describe('请求数据')
        },
        documentation: {
            description: '通过思源笔记的服务器代理发送网络请求',
            params: {
                url: {
                    type: 'string',
                    description: '请求的目标URL',
                    required: true
                },
                method: {
                    type: 'string',
                    description: '请求方法，如GET、POST等，默认为GET',
                    required: false
                },
                payload: {
                    type: 'object',
                    description: '请求的数据负载',
                    required: false
                }
            },
            returns: {
                type: 'object',
                description: '返回代理请求的响应',
                properties: {
                    body: {
                        type: 'string',
                        description: '响应体内容'
                    },
                    status: {
                        type: 'number',
                        description: 'HTTP状态码'
                    }
                }
            },
            examples: [{
                description: '发送GET请求',
                params: {
                    url: "https://api.example.com/data"
                },
                response: {
                    code: 0,
                    msg: "",
                    data: {
                        body: "{\"status\":\"success\",\"data\":{}}",
                        status: 200
                    }
                }
            }, {
                description: '发送POST请求',
                params: {
                    url: "https://api.example.com/update",
                    method: "POST",
                    payload: {
                        "key": "value"
                    }
                },
                response: {
                    code: 0,
                    msg: "",
                    data: {
                        body: "{\"status\":\"updated\"}",
                        status: 200
                    }
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#proxy-request'
        }
    });
}

export { networkCommands }; 