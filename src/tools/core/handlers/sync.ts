import { z } from 'zod';
import { client } from '../../../utils/client.js';
import { ToolRegistry } from '../types.js';

// 命令处理器
const syncCommands = {
    // 执行同步
    async performSync() {
        const result = await client.post('/api/sync/performSync', {});
        return result;
    },

    // 列出同步设备
    async listSyncDevices() {
        const result = await client.post('/api/sync/listDevices', {});
        return result;
    }
};

// 查询处理器
const syncQueries = {
    // 获取同步状态
    async getSyncState() {
        const result = await client.post('/api/sync/getSyncState', {});
        return result;
    }
};

// 注册处理器
export function registerSyncHandlers() {
    // 注册命令
    ToolRegistry.registerCommand({
        type: 'sync.perform',
        description: '执行同步',
        params: {},
        documentation: {
            description: '执行数据同步，将本地数据与云端进行同步',
            returns: {
                type: 'object',
                description: '返回同步结果',
                properties: {
                    data: {
                        type: 'object',
                        description: '同步状态信息，包含synced（是否已同步）字段'
                    }
                }
            },
            examples: [{
                description: '执行数据同步',
                params: {},
                response: {
                    code: 0,
                    msg: "",
                    data: {
                        synced: true
                    }
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#perform-sync'
        }
    });

    ToolRegistry.registerCommand({
        type: 'sync.listDevices',
        description: '列出同步设备',
        params: {},
        documentation: {
            description: '获取所有已配置的同步设备列表',
            returns: {
                type: 'object',
                description: '返回设备列表',
                properties: {
                    devices: {
                        type: 'array<object>',
                        description: '设备列表，每个元素包含name（设备名称）、type（设备类型）和id（设备ID）字段'
                    }
                }
            },
            examples: [{
                description: '获取同步设备列表',
                params: {},
                response: {
                    code: 0,
                    msg: "",
                    data: {
                        devices: [{
                            name: "我的电脑",
                            type: "desktop",
                            id: "12345678"
                        }, {
                            name: "我的手机",
                            type: "mobile",
                            id: "87654321"
                        }]
                    }
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#list-sync-devices'
        }
    });

    // 注册查询
    ToolRegistry.registerQuery({
        type: 'sync.getState',
        description: '获取同步状态',
        params: {},
        documentation: {
            description: '获取当前的同步状态信息',
            returns: {
                type: 'object',
                description: '返回同步状态',
                properties: {
                    cloudSpace: {
                        type: 'number',
                        description: '云端空间大小（字节）'
                    },
                    syncMode: {
                        type: 'number',
                        description: '同步模式：0=未开启，1=云端，2=WebDAV'
                    },
                    syncing: {
                        type: 'boolean',
                        description: '是否正在同步'
                    }
                }
            },
            examples: [{
                description: '获取同步状态',
                params: {},
                response: {
                    code: 0,
                    msg: "",
                    data: {
                        cloudSpace: 5368709120,
                        syncMode: 1,
                        syncing: false
                    }
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#get-sync-state'
        }
    });
}

export { syncCommands, syncQueries }; 