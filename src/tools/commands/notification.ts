import { z } from 'zod';
import { createHandler } from '../../utils/client.js';
import { registry } from '../../utils/registry.js';
import { CommandHandler } from '../../utils/registry.js';

const namespace = 'notification';

// Push message
const pushMsgHandler: CommandHandler = {
    namespace,
    name: 'pushMsg',
    description: 'Push a message notification',
    params: z.object({
        msg: z.string().describe('Message content'),
        timeout: z.number().optional().describe('Message display duration in milliseconds')
    }),
    handler: createHandler('/api/notification/pushMsg'),
    documentation: {
        description: 'Push a message notification',
        params: {
            msg: {
                type: 'string',
                description: 'Message content',
                required: true
            },
            timeout: {
                type: 'number',
                description: 'Message display duration in milliseconds',
                required: false
            }
        },
        returns: {
            type: 'object',
            description: 'Operation result',
            properties: {}
        },
        examples: [
            {
                description: 'Push a message notification',
                params: {
                    msg: "Hello World",
                    timeout: 7000
                },
                response: {}
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#push-message'
    }
};

// Push error message
const pushErrMsgHandler: CommandHandler = {
    namespace,
    name: 'pushErrMsg',
    description: 'Push an error message notification',
    params: z.object({
        msg: z.string().describe('Error message content'),
        timeout: z.number().optional().describe('Message display duration in milliseconds')
    }),
    handler: createHandler('/api/notification/pushErrMsg'),
    documentation: {
        description: 'Push an error message notification',
        params: {
            msg: {
                type: 'string',
                description: 'Error message content',
                required: true
            },
            timeout: {
                type: 'number',
                description: 'Message display duration in milliseconds',
                required: false
            }
        },
        returns: {
            type: 'object',
            description: 'Operation result',
            properties: {}
        },
        examples: [
            {
                description: 'Push an error message notification',
                params: {
                    msg: "Operation failed",
                    timeout: 7000
                },
                response: {}
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#push-error-message'
    }
};

// Register all notification related commands
export function registerNotificationHandlers() {
    registry.registerCommand(pushMsgHandler);
    registry.registerCommand(pushErrMsgHandler);
} 