import { z } from 'zod';
import { client } from '../../../utils/client.js';
import { ToolRegistry } from '../types.js';

// 命令处理器
const assetsCommands = {
    // 上传资源
    async upload({ files, path }: { files: any[], path?: string }) {
        const formData = new FormData();
        for (const file of files) {
            formData.append('file[]', file);
        }
        if (path) {
            formData.append('path', path);
        }
        const result = await client.post('/api/asset/upload', formData);
        return result;
    }
};

// 注册命令
export function registerAssetsHandlers() {
    // 注册命令
    ToolRegistry.registerCommand({
        type: 'assets.upload',
        description: '上传资源文件',
        params: {
            files: z.array(z.any()).describe('要上传的文件数组'),
            path: z.string().optional().describe('保存路径')
        },
        documentation: {
            description: '上传资源文件到思源笔记',
            params: {
                files: {
                    type: 'array<file>',
                    description: '要上传的文件数组，支持的文件类型包括图片、音频、视频、PDF等',
                    required: true
                },
                path: {
                    type: 'string',
                    description: '指定保存路径，例如: "/assets/", 留空则使用系统默认路径',
                    required: false
                }
            },
            returns: {
                type: 'object',
                description: '返回上传成功的文件信息',
                properties: {
                    errFiles: {
                        type: 'array<string>',
                        description: '上传失败的文件名列表'
                    },
                    succMap: {
                        type: 'object',
                        description: '上传成功的文件映射，key为原始文件名，value为上传后的路径'
                    }
                }
            },
            examples: [{
                description: '上传单个图片文件',
                params: {
                    files: ['test.png'],
                    path: '/assets/test/'
                },
                response: {
                    "errFiles": [],
                    "succMap": {
                        "test.png": "/assets/test/20210808180117-helloworld.png"
                    }
                }
            },
            {
                description: '上传多个文件到默认路径',
                params: {
                    files: ['image1.jpg', 'document.pdf']
                },
                response: {
                    "errFiles": [],
                    "succMap": {
                        "image1.jpg": "/assets/20210808180117-image1.jpg",
                        "document.pdf": "/assets/20210808180118-document.pdf"
                    }
                }
            }],
            apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#upload-asset'
        }
    });
}

export { assetsCommands }; 