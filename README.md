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
* 书签和标签管理
* 文档导出和转换

## 命令列表

所有命令都支持使用 `man` 查询获取详细说明，例如：

```json
{
  "type": "man",
  "params": {
    "type": "blocks.insert"
  }
}
```

### 笔记本管理

* `notebook.lsNotebooks` - 列出所有笔记本
* `notebook.openNotebook` - 打开笔记本
* `notebook.closeNotebook` - 关闭笔记本
* `notebook.createNotebook` - 创建笔记本
* `notebook.removeNotebook` - 删除笔记本
* `notebook.renameNotebook` - 重命名笔记本
* `notebook.getNotebookConf` - 获取笔记本配置
* `notebook.setNotebookConf` - 设置笔记本配置

### 文档管理

* `documents.createDocWithMd` - 使用 Markdown 创建文档
* `documents.renameDoc` - 重命名文档
* `documents.removeDoc` - 删除文档
* `documents.moveDocs` - 移动文档
* `documents.getHPathByPath` - 获取文档可读路径
* `documents.getHPathByID` - 通过 ID 获取文档可读路径

### 内容块操作

* `blocks.insert` - 插入内容块
* `blocks.append` - 追加内容块
* `blocks.prepend` - 前置插入内容块
* `blocks.update` - 更新内容块
* `blocks.delete` - 删除内容块
* `blocks.move` - 移动内容块
* `blocks.fold` - 折叠内容块
* `blocks.unfold` - 展开内容块
* `blocks.getKramdown` - 获取块的 Markdown 内容
* `blocks.getChildren` - 获取子块列表
* `blocks.transferRef` - 转移块引用

### 资源管理

* `assets.upload` - 上传资源文件
* `assets.remove` - 删除资源文件

### 属性管理

* `attributes.getBlockAttrs` - 获取块属性
* `attributes.setBlockAttrs` - 设置块属性

### 书签管理

* `bookmarks.getBookmark` - 获取书签
* `bookmarks.renameBookmark` - 重命名书签
* `bookmarks.removeBookmark` - 删除书签
* `bookmarks.moveBookmark` - 移动书签

### 文件操作

* `file.readDir` - 读取目录内容
* `file.removeFile` - 删除文件
* `file.putFile` - 写入文件内容
* `file.getFile` - 获取文件内容

### 导出转换

* `export.exportMdContent` - 导出 Markdown 内容
* `export.exportDocx` - 导出 Word 文档

### 网络代理

* `network.serveProxy` - 网络请求代理

### 通知提醒

* `notification.pushMsg` - 发送消息通知
* `notification.pushErrMsg` - 发送错误通知

## 使用说明

### 环境变量配置

服务器需要配置以下环境变量：

* `SIYUAN_TOKEN` - 思源笔记 API 令牌（必需）
  * 在思源笔记设置 - 关于 中查看
  * 用于 API 认证

### 在 Claude Desktop 中使用

将以下配置添加到 `claude_desktop_config.json`：

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
        "SIYUAN_TOKEN": "你的思源笔记令牌"
      }
    }
  }
}
```

### 本地运行

1. 安装依赖：
```bash
pnpm install
```

2. 设置环境变量：
```bash
# Windows
set SIYUAN_TOKEN=你的思源笔记令牌

# Linux/macOS
export SIYUAN_TOKEN=你的思源笔记令牌
```

3. 启动服务：
```bash
pnpm start
```

### Docker 运行

```bash
docker run --rm -i \
  -e SIYUAN_TOKEN=你的思源笔记令牌 \
  mcp/siyuan
```

## 构建

### 环境要求

* Node.js >= 23.10.0
* pnpm

### 本地构建

```bash
pnpm build
```

### Docker 构建

```bash
docker build -t mcp/siyuan .
```

## 许可证

本项目基于 ISC 许可证发布。这意味着你可以自由使用、修改和分发本软件，但需要遵守 ISC 许可证的条款和条件。详细信息请参见项目仓库中的 LICENSE 文件。

## 相关资源

- [思源笔记](https://github.com/siyuan-note/siyuan) - 思源笔记官方仓库
- [Model Context Protocol](https://modelcontextprotocol.io/) - MCP 官方文档
- [思源笔记 API 文档](https://github.com/siyuan-note/siyuan/blob/master/API.md) - 思源笔记 API 参考