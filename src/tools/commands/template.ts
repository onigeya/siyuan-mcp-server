import { z } from 'zod';
import { createHandler } from '../../utils/client.js';
import { registry } from '../../utils/registry.js';
import { CommandHandler } from '../../utils/registry.js';

const namespace = 'template';

// Render template
const renderTemplateHandler: CommandHandler = {
    namespace,
    name: 'renderTemplate',
    description: 'Render template',
    params: z.object({
        id: z.string().describe('Template block ID'),
        path: z.string().describe('Target path')
    }),
    handler: createHandler('/api/template/render'),
    documentation: {
        description: 'Render template',
        params: {
            id: {
                type: 'string',
                description: 'Template block ID',
                required: true
            },
            path: {
                type: 'string',
                description: 'Target path',
                required: true
            }
        },
        returns: {
            type: 'object',
            description: 'Operation result',
            properties: {
                id: 'Rendered block ID'
            }
        },
        examples: [
            {
                description: 'This example demonstrates rendering a template block at a specific target path, creating a new block with the rendered content and returning its ID.',
                params: {
                    id: "20200812220555-lj3enxa",
                    path: "/path/to/target"
                },
                response: {
                    id: "20200812220555-lj3enxa"
                }
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#render-a-template'
    }
};

// Render Sprig template
const renderSprigHandler: CommandHandler = {
    namespace,
    name: 'renderSprig',
    description: 'Render Sprig template',
    params: z.object({
        template: z.string().describe('Template content'),
        context: z.record(z.any()).describe('Template context')
    }),
    handler: createHandler('/api/template/renderSprig'),
    documentation: {
        description: 'Render Sprig template',
        params: {
            template: {
                type: 'string',
                description: 'Template content',
                required: true
            },
            context: {
                type: 'object',
                description: 'Template context',
                required: true
            }
        },
        returns: {
            type: 'object',
            description: 'Operation result',
            properties: {
                content: 'Rendered content'
            }
        },
        examples: [
            {
                description: 'This example shows how to render a Sprig template with a context variable, replacing the placeholder {{ .name }} with the value "World" to generate personalized content.',
                params: {
                    template: "Hello {{ .name }}!",
                    context: {
                        name: "World"
                    }
                },
                response: {
                    content: "Hello World!"
                }
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#render-sprig'
    }
};

// Register all template related commands
export function registerTemplateHandlers() {
    registry.registerCommand(renderTemplateHandler);
    registry.registerCommand(renderSprigHandler);
} 