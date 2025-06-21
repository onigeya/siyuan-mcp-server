#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerCommandTool } from './tools/commands.js';
import { registerQueryTool } from './tools/queries.js';
import { registerHelpTool } from './tools/help.js';
import { registerNotebookHandlers } from './tools/commands/notebook.js';
import { registerFiletreeHandlers } from './tools/commands/filetree.js';
import { registerBlockHandlers } from './tools/commands/block.js';
import { registerAttrHandlers } from './tools/commands/attr.js';
import { registerSqlHandlers } from './tools/commands/sql.js';
import { registerQueryHandlers } from './tools/commands/query.js';
import { registerSearchHandlers } from './tools/commands/search.js';
import { registerAssetsHandlers } from './tools/commands/assets.js';
import { registerFileHandlers } from './tools/commands/file.js';
import { registerExportHandlers } from './tools/commands/export.js';
import { registerTemplateHandlers } from './tools/commands/template.js';
import { registerNotificationHandlers } from './tools/commands/notification.js';
import { registerSystemHandlers } from './tools/commands/system.js';
import { registerConvertHandlers } from './tools/commands/convert.js';
import { registerNetworkHandlers } from './tools/commands/network.js';

// 创建 MCP 服务器实例
const server = new McpServer({
    name: "siyuan-mcp-server",
    version: "1.0.0",
    capabilities: {
        tools: {},
    },
});

// 创建传输层实例
const transport = new StdioServerTransport();

// 注册命令处理器
registerNotebookHandlers();
registerFiletreeHandlers();
registerBlockHandlers();
registerAttrHandlers();
registerSqlHandlers();
registerQueryHandlers();
registerSearchHandlers();
registerAssetsHandlers();
registerFileHandlers();
registerExportHandlers();
registerTemplateHandlers();
registerNotificationHandlers();
registerSystemHandlers();
registerConvertHandlers();
registerNetworkHandlers();

// 注册工具
registerCommandTool(server);
registerQueryTool(server);
registerHelpTool(server);

// 启动服务器
server.connect(transport);

export { server };