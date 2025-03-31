import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerNotebookTools } from './tools/notebook.js';
import { registerDocumentTools } from './tools/documents.js';
import { registerAssetsTools } from './tools/assets.js';
import { registerBlocksTools } from './tools/blocks.js';
import { registerAttributesTools } from './tools/attributes.js';
import { registerSqlTools } from './tools/sql.js';
import { registerTemplatesTools } from './tools/templates.js';
import { registerFileTools } from './tools/file.js';
import { registerExportTools } from './tools/export.js';
import { registerConversionTools } from './tools/conversion.js';
import { registerNotificationTools } from './tools/notification.js';
import { registerNetworkTools } from './tools/network.js';
import { registerSystemTools } from './tools/system.js';

const server = new McpServer({
    name: "siyuan-mcp-server",
    version: "1.0.0",
    capabilities: {
        tools: {},
    },
});
const transport = new StdioServerTransport();

// 注册工具
registerNotebookTools(server);
registerDocumentTools(server);
registerAssetsTools(server);
registerBlocksTools(server);
registerAttributesTools(server);
registerSqlTools(server);
registerTemplatesTools(server);
registerFileTools(server);
registerExportTools(server);
registerConversionTools(server);
registerNotificationTools(server);
registerNetworkTools(server);
registerSystemTools(server);

server.connect(transport);