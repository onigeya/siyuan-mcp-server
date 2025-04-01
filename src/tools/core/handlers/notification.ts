import { z } from 'zod';
import { client } from '../../../utils/client.js';
import { ToolRegistry } from '../types.js';

// 命令处理器
const notificationCommands = {
    // 发送消息通知
    async pushMsg({ msg, timeout }: { msg: string; timeout?: number }) {
        const result = await client.post('/api/notification/pushMsg', {
            msg,
            timeout
        });
        return result;
    },

    // 推送错误消息
    async pushErrMsg({ msg, timeout }: { msg: string; timeout?: number }) {
        const result = await client.post('/api/notification/pushErrMsg', {
            msg,
            timeout
        });
        return result;
    }
};

// 注册处理器
export function registerNotificationHandlers() {
    // 注册命令
    ToolRegistry.registerCommand({
        type: 'notification.pushMsg',
        description: '发送消息通知',
        params: {
            msg: z.string().describe('消息内容'),
            timeout: z.number().optional().describe('显示时间(毫秒)')
        },
        documentation: {
            description: '发送一条消息通知到界面上',
            params: {
                msg: {
                    type: 'string',
                    description: '要显示的消息内容',
                    required: true
                },
                timeout: {
                    type: 'number',
                    description: '消息显示时间，单位为毫秒，默认7000',
                    required: false
                }
            },
            returns: {
                type: 'object',
                description: '发送成功返回空对象',
                properties: {}
            },
            examples: [{
                description: '发送一条消息',
                params: {
                    msg: "这是一条测试消息",
                    timeout: 3000
                },
                response: {
                    code: 0,
                    msg: "",
                    data: {}
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#push-message'
        }
    });

    ToolRegistry.registerCommand({
        type: 'notification.pushErrMsg',
        description: '发送错误消息通知',
        params: {
            msg: z.string().describe('错误消息内容'),
            timeout: z.number().optional().describe('显示时间(毫秒)')
        },
        documentation: {
            description: '发送一条错误消息通知到界面上',
            params: {
                msg: {
                    type: 'string',
                    description: '要显示的错误消息内容',
                    required: true
                },
                timeout: {
                    type: 'number',
                    description: '消息显示时间，单位为毫秒，默认7000',
                    required: false
                }
            },
            returns: {
                type: 'object',
                description: '发送成功返回空对象',
                properties: {}
            },
            examples: [{
                description: '发送一条错误消息',
                params: {
                    msg: "操作失败：文件不存在",
                    timeout: 5000
                },
                response: {
                    code: 0,
                    msg: "",
                    data: {}
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#push-error-message'
        }
    });
}

export { notificationCommands }; 