import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerMetaTools } from './tools/core/meta.js';
import { registerCommandTools } from './tools/core/command.js';
import { registerQueryTools } from './tools/core/query.js';
import { registerNotebookCommands, registerNotebookQueries } from './tools/core/handlers/notebooks.js';
import { registerAssetsHandlers } from './tools/core/handlers/assets.js';
import { registerAttributesHandlers } from './tools/core/handlers/attributes.js';
import { registerBlocksHandlers } from './tools/core/handlers/blocks.js';
import { registerConversionHandlers } from './tools/core/handlers/conversion.js';
import { registerDocumentsHandlers } from './tools/core/handlers/documents.js';
import { registerExportHandlers } from './tools/core/handlers/export.js';
import { registerFileHandlers } from './tools/core/handlers/file.js';
import { registerNetworkHandlers } from './tools/core/handlers/network.js';
import { registerNotificationHandlers } from './tools/core/handlers/notification.js';
import { registerSqlHandlers } from './tools/core/handlers/sql.js';
import { registerSystemHandlers } from './tools/core/handlers/system.js';
import { registerTemplatesHandlers } from './tools/core/handlers/templates.js';
import { registerBookmarksHandlers } from './tools/core/handlers/bookmarks.js';

const server = new McpServer({
    name: "siyuan-mcp-server",
    version: "1.0.0",
    capabilities: {
        tools: {},
    },
});
const transport = new StdioServerTransport();

// 注册所有处理器
registerNotebookCommands();
registerNotebookQueries();
registerAssetsHandlers();
registerAttributesHandlers();
registerBlocksHandlers();
registerConversionHandlers();
registerDocumentsHandlers();
registerExportHandlers();
registerFileHandlers();
registerNetworkHandlers();
registerNotificationHandlers();
registerSqlHandlers();
registerSystemHandlers();
registerTemplatesHandlers();
registerBookmarksHandlers();

// 注册核心工具
registerMetaTools(server);
registerCommandTools(server);
registerQueryTools(server);

// 启动服务器
server.connect(transport);