import { z } from 'zod';
import { createHandler } from '../../utils/client.js';
import { registry } from '../../utils/registry.js';
import { CommandHandler } from '../../utils/registry.js';

const namespace = 'system';

// Get boot progress
const getBootProgressHandler: CommandHandler = {
    namespace,
    name: 'getBootProgress',
    description: 'Get boot progress',
    params: z.object({}),
    handler: createHandler('/api/system/getBootProgress'),
    documentation: {
        description: 'Get boot progress',
        params: {},
        returns: {
            type: 'object',
            description: 'Boot progress information',
            properties: {
                progress: 'Boot progress percentage',
                details: 'Progress details'
            }
        },
        examples: [
            {
                description: 'Get boot progress',
                params: {},
                response: {
                    progress: 100,
                    details: "Completed"
                }
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#get-boot-progress'
    }
};

// Get system version
const getVersionHandler: CommandHandler = {
    namespace,
    name: 'getVersion',
    description: 'Get system version',
    params: z.object({}),
    handler: createHandler('/api/system/version'),
    documentation: {
        description: 'Get system version',
        params: {},
        returns: {
            type: 'object',
            description: 'Version information',
            properties: {
                version: 'System version',
                os: 'Operating system'
            }
        },
        examples: [
            {
                description: 'Get system version',
                params: {},
                response: {
                    version: "2.8.8",
                    os: "windows"
                }
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#get-system-version'
    }
};

// Get current time
const getCurrentTimeHandler: CommandHandler = {
    namespace,
    name: 'getCurrentTime',
    description: 'Get current time',
    params: z.object({}),
    handler: createHandler('/api/system/currentTime'),
    documentation: {
        description: 'Get current time',
        params: {},
        returns: {
            type: 'object',
            description: 'Current time information',
            properties: {
                time: 'Current time in milliseconds'
            }
        },
        examples: [
            {
                description: 'Get current time',
                params: {},
                response: {
                    time: 1629158400000
                }
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#get-the-current-time-of-the-system'
    }
};

// Register all system related commands
export function registerSystemHandlers() {
    registry.registerCommand(getBootProgressHandler);
    registry.registerCommand(getVersionHandler);
    registry.registerCommand(getCurrentTimeHandler);
} 