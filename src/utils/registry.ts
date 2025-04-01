import { z } from 'zod';

/**
 * MCP 响应格式
 */
export interface McpResponse<T = any> {
    content: Array<{
        type: string;
        text: string;
    }>;
    _meta?: T;
    isError?: boolean;
}

/**
 * 命令处理器接口
 */
export interface CommandHandler<P = unknown> {
    /** 命令命名空间 */
    namespace: string;
    /** 命令名称 */
    name: string;
    /** 命令描述 */
    description: string;
    /** 参数验证模式 */
    params: z.ZodSchema<P>;
    /** 命令处理函数 */
    handler: (params: P) => Promise<McpResponse>;
    /** 命令文档 */
    documentation?: {
        /** 详细描述 */
        description: string;
        /** 参数说明 */
        params: Record<string, {
            type: string;
            description: string;
            required: boolean;
        }>;
        /** 返回值说明 */
        returns: {
            type: string;
            description: string;
            properties: Record<string, unknown>;
        };
        /** 使用示例 */
        examples: Array<{
            description: string;
            params: Record<string, unknown>;
            response: Record<string, unknown>;
        }>;
        /** API 文档链接 */
        apiLink?: string;
    };
}

/**
 * 命令注册表类
 * 用于管理和执行命令
 */
class CommandRegistry {
    private static instance: CommandRegistry | null = null;
    private commands: Map<string, CommandHandler<any>>;

    private constructor() {
        this.commands = new Map();
    }

    /**
     * 获取单例实例
     */
    public static getInstance(): CommandRegistry {
        if (!CommandRegistry.instance) {
            CommandRegistry.instance = new CommandRegistry();
        }
        return CommandRegistry.instance;
    }

    /**
     * 获取完整命令名称
     * @param namespace 命名空间
     * @param name 命令名称
     * @returns 完整命令名称
     */
    private getFullCommandName(namespace: string, name: string): string {
        return `${namespace}.${name}`;
    }

    /**
     * 解析完整命令名称
     * @param fullName 完整命令名称
     * @returns [命名空间, 命令名称]
     */
    private parseFullCommandName(fullName: string): [string, string] {
        const parts = fullName.split('.');
        if (parts.length === 1) {
            return ['', parts[0]];
        }
        return [parts[0], parts[1]];
    }

    /**
     * 注册命令
     * @param command 命令处理器
     * @throws {Error} 如果命令已存在会发出警告
     */
    public registerCommand<P>(command: CommandHandler<P>): void {
        const fullName = this.getFullCommandName(command.namespace, command.name);
        if (this.commands.has(fullName)) {
            console.warn(`警告：命令 ${fullName} 已存在，将被覆盖`);
        }
        this.commands.set(fullName, command);
    }

    /**
     * 获取命令列表
     * @returns 命令列表的 MCP 响应
     */
    public listCommands(namespace?: string, type?: string): McpResponse<Array<{
        namespace: string;
        name: string;
        description: string;
        params: Record<string, {
            type: string;
            description: string;
            required: boolean;
        }>;
    }>> {
        const commands = Array.from(this.commands.entries()).filter(([fullName, cmd]) => {
            const [cmdNamespace] = this.parseFullCommandName(fullName);
            if (namespace && !cmdNamespace.includes(namespace)) return false;
            if (type && !cmd.name.includes(type)) return false;
            return true;
        }).map(([fullName, cmd]) => {
            // 获取参数说明
            const params: Record<string, {
                type: string;
                description: string;
                required: boolean;
            }> = {};

            try {
                if (cmd.params instanceof z.ZodObject) {
                    const shape = cmd.params._def.shape();
                    Object.entries(shape).forEach(([key, value]) => {
                        if (value instanceof z.ZodType) {
                            const isOptional = value instanceof z.ZodOptional;
                            params[key] = {
                                type: value._def.typeName || 'unknown',
                                description: value.description || '无说明',
                                required: !isOptional
                            };
                        }
                    });
                }
            } catch {
                // 如果无法获取 shape，返回空对象
            }

            const [cmdNamespace, cmdName] = this.parseFullCommandName(fullName);
            return {
                namespace: cmdNamespace,
                name: cmdName,
                description: cmd.description,
                params
            };
        });

        const commandList = commands.map(cmd => {
            const fullName = cmd.namespace ? `${cmd.namespace}.${cmd.name}` : cmd.name;
            const paramsList = Object.entries(cmd.params).map(([name, info]) => 
                `    ${name}: ${info.type}${info.required ? ' (必填)' : ' (可选)'} - ${info.description}`
            ).join('\n');
            
            return `${fullName}: ${cmd.description}\n${paramsList ? `  参数:\n${paramsList}` : '  参数: 无参数'}`;
        }).join('\n\n');

        return {
            content: [
                {
                    type: 'text',
                    text: `可用命令列表：\n${commandList}`
                }
            ],
            _meta: commands
        };
    }

    /**
     * 获取命令帮助信息
     * @param commandName 命令名称
     * @returns 命令帮助信息的 MCP 响应
     */
    public getCommandHelp(commandName: string): McpResponse<CommandHandler['documentation']> {
        // 尝试直接查找完整命令名
        let command = this.commands.get(commandName);
        
        if (!command) {
            // 如果找不到，尝试解析命名空间
            const [namespace, name] = this.parseFullCommandName(commandName);
            const fullName = this.getFullCommandName(namespace, name);
            command = this.commands.get(fullName);
        }

        if (!command) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `命令 ${commandName} 不存在`
                    }
                ],
                isError: true
            };
        }

        // 获取参数说明
        const params: Record<string, {
            type: string;
            description: string;
            required: boolean;
        }> = {};

        try {
            if (command.params instanceof z.ZodObject) {
                const shape = command.params._def.shape();
                Object.entries(shape).forEach(([key, value]) => {
                    if (value instanceof z.ZodType) {
                        const isOptional = value instanceof z.ZodOptional;
                        params[key] = {
                            type: value._def.typeName || 'unknown',
                            description: value.description || '无说明',
                            required: !isOptional
                        };
                    }
                });
            }
        } catch {
            // 如果无法获取 shape，返回空对象
        }

        const help = command.documentation || {
            description: command.description,
            params,
            returns: {
                type: 'object',
                description: '命令执行结果',
                properties: {}
            },
            examples: []
        };

        // 格式化帮助信息
        const fullName = this.getFullCommandName(command.namespace, command.name);
        const paramsList = Object.entries(params).map(([name, info]) => 
            `  ${name}: ${info.type}${info.required ? ' (必填)' : ' (可选)'}\n    ${info.description}`
        ).join('\n');

        const returnInfo = help.returns;
        const propertiesList = Object.entries(returnInfo.properties).map(([name, desc]) => 
            `  ${name}: ${desc}`
        ).join('\n');

        const examplesList = help.examples.map(example => 
            `示例：${example.description}\n` +
            `  参数：${JSON.stringify(example.params, null, 2)}\n` +
            `  响应：${JSON.stringify(example.response, null, 2)}`
        ).join('\n\n');

        const helpText = [
            `命令: ${fullName}`,
            `描述: ${help.description}`,
            '',
            '参数:',
            paramsList || '  无参数',
            '',
            '返回值:',
            `  类型: ${returnInfo.type}`,
            `  描述: ${returnInfo.description}`,
            '  属性:',
            propertiesList || '    无属性',
            '',
            examplesList ? '示例:\n' + examplesList : '示例: 无示例',
            '',
            help.apiLink ? `API文档: ${help.apiLink}` : ''
        ].filter(Boolean).join('\n');

        return {
            content: [
                {
                    type: 'text',
                    text: helpText
                }
            ],
            _meta: help
        };
    }

    /**
     * 执行命令
     * @param commandName 命令名称
     * @param params 命令参数
     * @returns 命令执行结果的 MCP 响应
     * @throws {Error} 如果命令不存在或参数验证失败
     */
    public async executeCommand(commandName: string, params: unknown = {}): Promise<McpResponse> {
        // 尝试直接查找完整命令名
        let command = this.commands.get(commandName);
        
        if (!command) {
            // 如果找不到，尝试解析命名空间
            const [namespace, name] = this.parseFullCommandName(commandName);
            const fullName = this.getFullCommandName(namespace, name);
            command = this.commands.get(fullName);
        }

        if (!command) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `命令 ${commandName} 不存在`
                    }
                ],
                isError: true
            };
        }

        try {
            const validatedParams = command.params.parse(params);
            return await command.handler(validatedParams);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const issues = error.issues.map(issue => 
                    `  - ${issue.path.join('.')}: ${issue.message}`
                ).join('\n');
                
                return {
                    content: [
                        {
                            type: 'text',
                            text: `参数验证失败：\n${issues}`
                        }
                    ],
                    isError: true
                };
            }

            return {
                content: [
                    {
                        type: 'text',
                        text: `命令执行失败：${error instanceof Error ? error.message : String(error)}`
                    }
                ],
                isError: true
            };
        }
    }
}

export const registry = CommandRegistry.getInstance(); 