import { z } from 'zod';
import { createHandler } from '../../utils/client.js';
import { registry } from '../../utils/registry.js';
import { CommandHandler } from '../../utils/registry.js';

const namespace = 'export';

// Export notebook
const exportNotebookHandler: CommandHandler = {
    namespace,
    name: 'exportNotebook',
    description: 'Export notebook',
    params: z.object({
        notebook: z.string().describe('Notebook ID'),
        path: z.string().describe('Export path'),
        type: z.enum(['markdown', 'pdf', 'word', 'html']).describe('Export type')
    }),
    handler: createHandler('/api/export/exportNotebook'),
    documentation: {
        description: 'Export notebook',
        params: {
            notebook: {
                type: 'string',
                description: 'Notebook ID',
                required: true
            },
            path: {
                type: 'string',
                description: 'Export path',
                required: true
            },
            type: {
                type: 'string',
                description: 'Export type: markdown, pdf, word, html',
                required: true
            }
        },
        returns: {
            type: 'object',
            description: 'Operation result',
            properties: {
                path: 'Export file path'
            }
        },
        examples: [
            {
                description: 'This example shows how to export an entire notebook as a Markdown archive, preserving the notebook structure and content in a compressed file.',
                params: {
                    notebook: "20210817205410-2kvfpfn",
                    path: "/path/to/export",
                    type: "markdown"
                },
                response: {
                    path: "/path/to/export/notebook.zip"
                }
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#export-notebook'
    }
};

// Export document
const exportDocHandler: CommandHandler = {
    namespace,
    name: 'exportDoc',
    description: 'Export document',
    params: z.object({
        id: z.string().describe('Document ID'),
        path: z.string().describe('Export path'),
        type: z.enum(['markdown', 'pdf', 'word', 'html']).describe('Export type')
    }),
    handler: createHandler('/api/export/exportDoc'),
    documentation: {
        description: 'Export document',
        params: {
            id: {
                type: 'string',
                description: 'Document ID',
                required: true
            },
            path: {
                type: 'string',
                description: 'Export path',
                required: true
            },
            type: {
                type: 'string',
                description: 'Export type: markdown, pdf, word, html',
                required: true
            }
        },
        returns: {
            type: 'object',
            description: 'Operation result',
            properties: {
                path: 'Export file path'
            }
        },
        examples: [
            {
                description: 'This example demonstrates exporting a single document as a PDF file, converting all content and formatting to a portable document format.',
                params: {
                    id: "20210817205410-2kvfpfn",
                    path: "/path/to/export",
                    type: "pdf"
                },
                response: {
                    path: "/path/to/export/document.pdf"
                }
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#export-document'
    }
};

// Register all export related commands
export function registerExportHandlers() {
    registry.registerCommand(exportNotebookHandler);
    registry.registerCommand(exportDocHandler);
} 