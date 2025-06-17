[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/onigeya-siyuan-mcp-server-badge.png)](https://mseep.ai/app/onigeya-siyuan-mcp-server)

# SiYuan Note MCP Server
[![smithery badge](https://smithery.ai/badge/@onigeya/siyuan-mcp-server)](https://smithery.ai/server/@onigeya/siyuan-mcp-server)

一个 MCP 服务器实现，提供与思源笔记系统的集成，使 AI 模型能够访问和操作笔记数据。

An MCP server implementation that provides integration with the SiYuan Note system, enabling AI models to access and manipulate note data.

## 功能特性 | Features

* 笔记本管理 | Notebook Management
* 文档操作 | Document Operations
* 内容块控制 | Block Control
* 文件和资源管理 | File and Asset Management
* SQL 查询支持 | SQL Query Support
* 属性管理 | Attribute Management
* 导出和转换 | Export and Conversion
* 系统功能 | System Functions

## 命令列表 | Command List

所有命令都支持使用 `help` 查询获取详细说明。例如：

All commands support detailed documentation via the `help` command. For example:

```json
{
  "type": "help",
  "params": {
    "type": "block.insertBlock"
  }
}
```

### 资源管理 | Asset Management

* `assets.uploadAssets` - 上传资源文件 | Upload assets

### 属性管理 | Attribute Management

* `attr.setBlockAttrs` - 设置块属性 | Set block attributes
* `attr.getBlockAttrs` - 获取块属性 | Get block attributes

### 内容块操作 | Block Operations

* `block.insertBlock` - 插入内容块 | Insert a block
* `block.updateBlock` - 更新内容块 | Update block content
* `block.deleteBlock` - 删除内容块 | Delete a block
* `block.moveBlock` - 移动内容块 | Move a block
* `block.getBlockKramdown` - 获取块的 Markdown 内容 | Get block Kramdown content

### 格式转换 | Format Conversion

* `convert.pandoc` - 使用 Pandoc 转换内容 | Convert content using Pandoc

### 导出功能 | Export Functions

* `export.exportNotebook` - 导出笔记本 | Export notebook
* `export.exportDoc` - 导出文档 | Export document

### 文件操作 | File Operations

* `file.getFile` - 获取文件内容 | Get file content
* `file.putFile` - 写入文件内容 | Put file content
* `file.removeFile` - 删除文件 | Remove file
* `file.readDir` - 读取目录内容 | List files in directory

### 文档树操作 | File Tree Operations

* `filetree.createDocWithMd` - 使用 Markdown 创建文档 | Create document with Markdown
* `filetree.renameDoc` - 重命名文档 | Rename document
* `filetree.removeDoc` - 删除文档 | Remove document
* `filetree.moveDocs` - 移动文档 | Move documents
* `filetree.getHPathByPath` - 获取文档可读路径 | Get document HPath by path
* `filetree.getHPathByID` - 通过 ID 获取文档可读路径 | Get document HPath by ID

### 网络代理 | Network Proxy

* `network.forwardProxy` - 网络请求代理 | Forward proxy request

### 笔记本管理 | Notebook Management

* `notebook.lsNotebooks` - 列出所有笔记本 | List all notebooks
* `notebook.openNotebook` - 打开笔记本 | Open notebook
* `notebook.closeNotebook` - 关闭笔记本 | Close notebook
* `notebook.renameNotebook` - 重命名笔记本 | Rename notebook
* `notebook.createNotebook` - 创建笔记本 | Create notebook
* `notebook.removeNotebook` - 删除笔记本 | Remove notebook
* `notebook.getNotebookConf` - 获取笔记本配置 | Get notebook configuration
* `notebook.setNotebookConf` - 设置笔记本配置 | Set notebook configuration

### 通知提醒 | Notifications

* `notification.pushMsg` - 发送消息通知 | Push message notification
* `notification.pushErrMsg` - 发送错误通知 | Push error message notification

### 查询功能 | Query Functions

* `query.sql` - 执行 SQL 查询 | Execute SQL query
* `query.block` - 通过 ID 查询块 | Query block by ID

### 搜索功能 | Search Functions

* `search.fullTextSearch` - 全文搜索 | Full text search

### SQL 查询 | SQL Query

* `sql.sql` - 执行 SQL 查询 | Execute SQL query

### 系统功能 | System Functions

* `system.getBootProgress` - 获取启动进度 | Get boot progress
* `system.getVersion` - 获取系统版本 | Get system version
* `system.getCurrentTime` - 获取当前时间 | Get current time

### 模板功能 | Template Functions

* `template.renderTemplate` - 渲染模板 | Render template
* `template.renderSprig` - 渲染 Sprig 模板 | Render Sprig template

## 使用说明 | Usage

### 环境变量配置 | Environment Variables

服务器需要配置以下环境变量：
The server requires the following environment variables:

* `SIYUAN_TOKEN` - 思源笔记 API 令牌（必需）| SiYuan Note API token (required)
  * 在思源笔记设置 - 关于 中查看 | Check in SiYuan Note Settings - About
  * 用于 API 认证 | Used for API authentication

### 在 Claude Desktop 中使用 | Using in Claude Desktop

将以下配置添加到 `claude_desktop_config.json`：
Add the following configuration to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "siyuan": {
      "command": "npx",
      "args": [
        "-y",
        "@onigeya/siyuan-mcp-server"
      ],
      "env": {
        "SIYUAN_TOKEN": "your-siyuan-token"
      }
    }
  }
}
```

### 本地运行 | Local Run

1. 安装依赖 | Install dependencies:
```bash
pnpm install
```

2. 设置环境变量 | Set environment variables:
```bash
# Windows
set SIYUAN_TOKEN=your-siyuan-token

# Linux/macOS
export SIYUAN_TOKEN=your-siyuan-token
```

3. 启动服务 | Start service:
```bash
pnpm start
```

### Docker 运行 | Docker Run

```bash
docker run --rm -i \
  -e SIYUAN_TOKEN=your-siyuan-token \
  mcp/siyuan
```

## 构建 | Build

### 环境要求 | Requirements

* Node.js >= 23.10.0
* pnpm

### 本地构建 | Local Build

```bash
pnpm build
```

### Docker 构建 | Docker Build

```bash
docker build -t mcp/siyuan .
```

## 许可证 | License

本项目基于 ISC 许可证发布。这意味着你可以自由使用、修改和分发本软件，但需要遵守 ISC 许可证的条款和条件。详细信息请参见项目仓库中的 LICENSE 文件。

This project is released under the ISC License. This means you can freely use, modify, and distribute this software, subject to the terms and conditions of the ISC License. For detailed information, please refer to the LICENSE file in the project repository.

## 相关资源 | Related Resources

- [思源笔记 | SiYuan Note](https://github.com/siyuan-note/siyuan)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [思源笔记 API 文档 | SiYuan Note API Documentation](https://github.com/siyuan-note/siyuan/blob/master/API.md)