import { z } from 'zod';

// 文档示例
export interface Example {
    description: string;
    params: any;
    response: any;
}

// 参数文档
export interface ParamDoc {
    type: string;
    description: string;
    required?: boolean;
}

// 返回值属性文档
export interface PropertyDoc {
    type: string;
    description: string;
}

// 返回值文档
export interface ReturnDoc {
    type: string;
    description: string;
    properties?: Record<string, PropertyDoc>;
}

// API文档
export interface Documentation {
    description: string;
    params?: Record<string, ParamDoc>;
    returns?: ReturnDoc;
    examples?: Example[];
    apiLink?: string;
}

// 命令定义
export interface Command {
    type: string;
    description: string;
    params: z.ZodRawShape;
    documentation?: Documentation;
}

// 查询定义
export interface Query {
    type: string;
    description: string;
    params: z.ZodRawShape;
    documentation?: Documentation;
}

// 命令请求
export interface CommandRequest {
    type: string;
    params?: any;
}

// 查询请求
export interface QueryRequest {
    type: string;
    params?: any;
}

// 工具注册表
class Registry {
    private commands: Map<string, Command> = new Map();
    private queries: Map<string, Query> = new Map();

    // 注册命令
    registerCommand(command: Command) {
        this.commands.set(command.type, command);
    }

    // 注册查询
    registerQuery(query: Query) {
        this.queries.set(query.type, query);
    }

    // 获取命令
    getCommand(type: string): Command | undefined {
        return this.commands.get(type);
    }

    // 获取查询
    getQuery(type: string): Query | undefined {
        return this.queries.get(type);
    }

    // 获取所有命令
    getAllCommands(): Command[] {
        return Array.from(this.commands.values());
    }

    // 获取所有查询
    getAllQueries(): Query[] {
        return Array.from(this.queries.values());
    }

    // 重置注册表
    reset() {
        this.commands.clear();
        this.queries.clear();
    }
}

export const ToolRegistry = new Registry(); 