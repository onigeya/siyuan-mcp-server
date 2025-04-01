import { z } from 'zod';
import { client } from '../../../utils/client.js';
import { ToolRegistry } from '../types.js';

// 查询处理器
const systemQueries = {
    // 获取启动进度
    async getBootProgress() {
        const result = await client.post('/api/system/bootProgress', {});
        return result;
    },

    // 获取版本
    async getVersion() {
        const result = await client.post('/api/system/version', {});
        return result;
    },

    // 获取当前时间
    async getCurrentTime() {
        const result = await client.post('/api/system/currentTime', {});
        return result;
    }
};

// 注册处理器
export function registerSystemHandlers() {
    // 注册查询
    ToolRegistry.registerQuery({
        type: 'system.bootProgress',
        description: '获取启动进度',
        params: {},
        documentation: {
            description: '获取系统的启动进度信息',
            returns: {
                type: 'object',
                description: '返回启动进度信息',
                properties: {
                    progress: {
                        type: 'number',
                        description: '启动进度，范围0-100'
                    },
                    details: {
                        type: 'string',
                        description: '当前启动阶段的详细信息'
                    }
                }
            },
            examples: [{
                description: '获取启动进度',
                params: {},
                response: {
                    code: 0,
                    msg: "",
                    data: {
                        progress: 80,
                        details: "正在加载插件..."
                    }
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#get-boot-progress'
        }
    });

    ToolRegistry.registerQuery({
        type: 'system.version',
        description: '获取系统版本',
        params: {},
        documentation: {
            description: '获取思源笔记的版本信息',
            returns: {
                type: 'object',
                description: '返回版本信息',
                properties: {
                    version: {
                        type: 'string',
                        description: '版本号'
                    },
                    os: {
                        type: 'string',
                        description: '操作系统'
                    },
                    arch: {
                        type: 'string',
                        description: '系统架构'
                    }
                }
            },
            examples: [{
                description: '获取版本信息',
                params: {},
                response: {
                    code: 0,
                    msg: "",
                    data: {
                        version: "2.8.8",
                        os: "windows",
                        arch: "amd64"
                    }
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#get-system-version'
        }
    });

    ToolRegistry.registerQuery({
        type: 'system.currentTime',
        description: '获取当前时间',
        params: {},
        documentation: {
            description: '获取服务器的当前时间',
            returns: {
                type: 'object',
                description: '返回时间信息',
                properties: {
                    time: {
                        type: 'number',
                        description: '当前时间戳（毫秒）'
                    }
                }
            },
            examples: [{
                description: '获取当前时间',
                params: {},
                response: {
                    code: 0,
                    msg: "",
                    data: {
                        time: 1648799400000
                    }
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#get-system-current-time'
        }
    });
}

export { systemQueries }; 