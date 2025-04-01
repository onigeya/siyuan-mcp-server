# SiYuan Note MCP Server
[![smithery badge](https://smithery.ai/badge/@onigeya/siyuan-mcp-server)](https://smithery.ai/server/@onigeya/siyuan-mcp-server)

一个 MCP 服务器实现，提供与思源笔记系统的集成，使 AI 模型能够访问和操作笔记数据。

## 功能特性

* 笔记本的创建、打开和管理
* 文档的创建、编辑和组织
* 内容块的精确操作和控制
* 文件和资源的管理
* SQL 查询支持
* 自定义属性管理

## 工具

### 笔记本管理工具

用于管理思源笔记中的笔记本。

**输入参数：**

* `lsNotebooks`
  * 无参数
* `openNotebook`
  * `notebookId` (string): 笔记本 ID
* `closeNotebook`
  * `notebookId` (string): 笔记本 ID
* `createNotebook`
  * `name` (string): 笔记本名称
* `removeNotebook`
  * `notebookId` (string): 笔记本 ID
* `renameNotebook`
  * `notebookId` (string): 笔记本 ID
  * `name` (string): 新名称
* `getNotebookConf`
  * `notebookId` (string): 笔记本 ID
* `setNotebookConf`
  * `notebookId` (string): 笔记本 ID
  * `conf` (object): 配置对象

### 文档管理工具

用于创建和管理文档。

**输入参数：**

* `createDocWithMd`
  * `notebook` (string): 笔记本 ID
  * `path` (string): 文档路径
  * `markdown` (string): Markdown 内容
* `renameDoc`
  * `notebook` (string): 笔记本 ID
  * `path` (string): 文档路径
  * `title` (string): 新标题
* `removeDoc`
  * `notebook` (string): 笔记本 ID
  * `path` (string): 文档路径
* `moveDocs`
  * `fromPaths` (string[]): 源路径列表
  * `toNotebook` (string): 目标笔记本 ID
  * `toPath` (string): 目标路径

### 内容块工具

用于操作文档中的内容块。

**输入参数：**

* `insertBlock`
  * `dataType` (string): 数据类型
  * `data` (string): 块内容
  * `previousID` (string): 前一个块的 ID
* `updateBlock`
  * `dataType` (string): 数据类型
  * `data` (string): 块内容
  * `id` (string): 块 ID
* `deleteBlock`
  * `id` (string): 块 ID
* `moveBlock`
  * `id` (string): 块 ID
  * `previousID` (string, 可选): 前一个块的 ID
  * `parentID` (string, 可选): 父块 ID

## 使用说明

本 MCP 服务器设计用于：

* AI 模型与思源笔记的无缝集成
* 自动化笔记管理和组织
* 智能文档处理和生成
* 结构化知识管理
* 高级数据查询和分析

## 配置

### 在 Claude Desktop 中使用

将以下配置添加到 `claude_desktop_config.json`：

#### npx

```json
{
  "mcpServers": {
    "siyuan": {
      "command": "npx",
      "args": [
        "-y",
        "@onigeya/siyuan-mcp-server"
      ]
    }
  }
}
```

#### docker

```json
{
  "mcpServers": {
    "siyuan": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "mcp/siyuan"
      ]
    }
  }
}
```

## 构建

### 环境要求

* Node.js >= 23.10.0
* pnpm

### 本地构建

Windows:

```cmd
.\build.cmd
```

或手动指定Node.js版本：

```cmd
D:\nvm\v23.10.0\node.exe D:\nvm\v23.10.0\node_modules\pnpm\bin\pnpm.cjs build
```

### Docker构建

```bash
docker build -t mcp/siyuan -f Dockerfile .
```

## 许可证

本 MCP 服务器基于 ISC 许可证发布。这意味着你可以自由使用、修改和分发本软件，但需要遵守 ISC 许可证的条款和条件。详细信息请参见项目仓库中的 LICENSE 文件。

## 相关资源

- [思源笔记](https://github.com/siyuan-note/siyuan) - 思源笔记官方仓库
- [Model Context Protocol](https://modelcontextprotocol.io/) - MCP 官方文档
- [思源笔记 API 文档](https://github.com/siyuan-note/siyuan/blob/master/API.md) - 思源笔记 API 参考