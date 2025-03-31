# SiYuan Note MCP Server

一个为思源笔记提供 Model Context Protocol 服务的实现。该服务器使 LLMs 能够通过一组标准化的工具与思源笔记进行交互。

## 组件

### 工具

#### 笔记本管理
* **lsNotebooks**
  * 列出所有笔记本
  * 输入：无参数
* **openNotebook**
  * 打开笔记本
  * 输入：`notebookId` (string)：笔记本 ID
* **closeNotebook**
  * 关闭笔记本
  * 输入：`notebookId` (string)：笔记本 ID
* **renameNotebook**
  * 重命名笔记本
  * 输入：
    * `notebookId` (string)：笔记本 ID
    * `name` (string)：新名称
* **createNotebook**
  * 创建笔记本
  * 输入：`name` (string)：笔记本名称
* **removeNotebook**
  * 删除笔记本
  * 输入：`notebookId` (string)：笔记本 ID
* **getNotebookConf**
  * 获取笔记本配置
  * 输入：`notebookId` (string)：笔记本 ID
* **setNotebookConf**
  * 保存笔记本配置
  * 输入：
    * `notebookId` (string)：笔记本 ID
    * `conf` (object)：配置对象

#### 文档管理
* **createDocWithMd**
  * 使用 Markdown 创建文档
  * 输入：
    * `notebook` (string)：笔记本 ID
    * `path` (string)：文档路径
    * `markdown` (string)：Markdown 内容
* **renameDoc**
  * 重命名文档
  * 输入：
    * `notebook` (string)：笔记本 ID
    * `path` (string)：文档路径
    * `title` (string)：新标题
* **removeDoc**
  * 删除文档
  * 输入：
    * `notebook` (string)：笔记本 ID
    * `path` (string)：文档路径
* **moveDocs**
  * 移动文档
  * 输入：
    * `fromPaths` (string[])：源路径列表
    * `toNotebook` (string)：目标笔记本 ID
    * `toPath` (string)：目标路径

#### 块操作
* **insertBlock**
  * 插入块
  * 输入：
    * `dataType` (string)：数据类型
    * `data` (string)：块内容
    * `previousID` (string)：前一个块的 ID
* **updateBlock**
  * 更新块
  * 输入：
    * `dataType` (string)：数据类型
    * `data` (string)：块内容
    * `id` (string)：块 ID
* **deleteBlock**
  * 删除块
  * 输入：`id` (string)：块 ID
* **moveBlock**
  * 移动块
  * 输入：
    * `id` (string)：块 ID
    * `previousID` (string, 可选)：前一个块的 ID
    * `parentID` (string, 可选)：父块 ID

#### 属性管理
* **setBlockAttrs**
  * 设置块属性
  * 输入：
    * `id` (string)：块 ID
    * `attrs` (object)：属性键值对
* **getBlockAttrs**
  * 获取块属性
  * 输入：`id` (string)：块 ID

#### 文件操作
* **getFile**
  * 获取文件
  * 输入：`path` (string)：文件路径
* **putFile**
  * 写入文件
  * 输入：
    * `path` (string)：文件路径
    * `file` (any, 可选)：文件内容
    * `isDir` (boolean, 可选)：是否为目录
    * `modTime` (number, 可选)：修改时间
* **removeFile**
  * 删除文件
  * 输入：`path` (string)：文件路径

#### 导出功能
* **exportMdContent**
  * 导出 Markdown 内容
  * 输入：`id` (string)：文档块 ID
* **exportResources**
  * 导出文件和文件夹
  * 输入：
    * `paths` (string[])：要导出的路径列表
    * `name` (string, 可选)：导出文件名

#### 系统功能
* **bootProgress**
  * 获取启动进度
  * 输入：无参数
* **version**
  * 获取系统版本
  * 输入：无参数
* **currentTime**
  * 获取系统当前时间
  * 输入：无参数

## 使用方法

### 安装

```bash
npm install @onigeya/siyuan-mcp-server
```

### 环境变量配置

服务器需要以下环境变量：

* `SIYUAN_API_URL`：思源笔记 API 地址（可选，默认为 `http://localhost:6806`）
* `SIYUAN_TOKEN`：思源笔记 API 令牌（必需，可在思源笔记设置-关于中查看）

你可以通过以下方式设置环境变量：

1. 在系统中设置：
```bash
# Linux/macOS
export SIYUAN_API_URL=http://localhost:6806
export SIYUAN_TOKEN=your_token_here

# Windows (PowerShell)
$env:SIYUAN_API_URL = "http://localhost:6806"
$env:SIYUAN_TOKEN = "your_token_here"
```

2. 使用 .env 文件：
```env
SIYUAN_API_URL=http://localhost:6806
SIYUAN_TOKEN=your_token_here
```

3. 在运行命令时设置：
```bash
SIYUAN_TOKEN=your_token_here pnpm start
```

### 配置

在你的 `claude_desktop_config.json` 的 "mcpServers" 部分添加以下配置：

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
        "SIYUAN_TOKEN": "your_token_here"
      }
    }
  }
}
```

### 构建

```bash
pnpm build
```

### 运行

```bash
pnpm start
```

## 许可证

本项目基于 ISC 许可证开源。这意味着你可以自由使用、修改和分发本软件，但需要遵守 ISC 许可证的条款和条件。详情请参阅项目仓库中的 LICENSE 文件。