import { z } from 'zod';
import { client } from '../../../utils/client.js';
import { ToolRegistry } from '../types.js';

// 命令处理器
const sqlCommands = {
    // 刷新事务
    async flushTransaction() {
        const result = await client.post('/api/sql/flushTransaction', {});
        return result;
    }
};

// 查询处理器
const sqlQueries = {
    // 执行SQL查询
    async sql({ stmt }: { stmt: string }) {
        const result = await client.post('/api/query/sql', {
            stmt
        });
        return result;
    }
};

// 注册处理器
export function registerSqlHandlers() {
    // 注册命令
    ToolRegistry.registerCommand({
        type: 'sql.flushTransaction',
        description: '刷新SQL事务',
        params: {}
    });

    // 注册查询
    ToolRegistry.registerQuery({
        type: 'sql.query',
        description: '执行SQL查询',
        params: {
            stmt: z.string().describe('SQL语句')
        },
        documentation: {
            description: '执行一条SQL查询语句，用于查询数据库中的内容',
            params: {
                stmt: {
                    type: 'string',
                    description: 'SQL查询语句，支持SELECT语句',
                    required: true
                }
            },
            returns: {
                type: 'object',
                description: '返回查询结果',
                properties: {
                    data: {
                        type: 'array<object>',
                        description: '查询结果数组，每个元素为一条记录'
                    }
                }
            },
            examples: [{
                description: '查询所有文档块',
                params: {
                    stmt: "SELECT * FROM blocks WHERE type = 'doc'"
                },
                response: {
                    code: 0,
                    msg: "",
                    data: [{
                        "id": "20210817205410-2kvfpfn",
                        "type": "doc",
                        "content": "",
                        "parent_id": "",
                        "root_id": "20210817205410-2kvfpfn",
                        "hash": "2kvfpfn",
                        "box": "20210817205410",
                        "path": "/daily note/2021-08-17",
                        "created": "20210817205410",
                        "updated": "20210817205410"
                    }]
                }
            }, {
                description: '查询特定标题的文档',
                params: {
                    stmt: "SELECT * FROM blocks WHERE content LIKE '%示例%' AND type = 'doc'"
                },
                response: {
                    code: 0,
                    msg: "",
                    data: [{
                        "id": "20210817205410-3kvfpfn",
                        "type": "doc",
                        "content": "示例文档",
                        "parent_id": "",
                        "root_id": "20210817205410-3kvfpfn",
                        "hash": "3kvfpfn",
                        "box": "20210817205410",
                        "path": "/示例/文档",
                        "created": "20210817205410",
                        "updated": "20210817205410"
                    }]
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#sql-query'
        }
    });
}

export { sqlCommands, sqlQueries }; 