import { z } from 'zod';
import { createHandler } from '../../utils/client.js';
import { registry } from '../../utils/registry.js';
import { CommandHandler } from '../../utils/registry.js';

const namespace = 'convert';

// Convert pandoc
const pandocHandler: CommandHandler = {
    namespace,
    name: 'pandoc',
    description: 'Convert content using Pandoc',
    params: z.object({
        dir: z.string().describe('Working directory'),
        args: z.array(z.string()).describe('Pandoc arguments')
    }),
    handler: createHandler('/api/convert/pandoc'),
    documentation: {
        description: 'Convert content using Pandoc',
        params: {
            dir: {
                type: 'string',
                description: 'Working directory',
                required: true
            },
            args: {
                type: 'array',
                description: 'Pandoc arguments',
                required: true
            }
        },
        returns: {
            type: 'object',
            description: 'Operation result',
            properties: {
                msg: 'Message',
                data: 'Output data',
                code: 'Status code',
                stderr: 'Error output'
            }
        },
        examples: [
            {
                description: 'This example demonstrates converting a Markdown file to HTML using Pandoc, specifying the input and output formats while working in a specific directory.',
                params: {
                    dir: "/path/to/working/dir",
                    args: [
                        "input.md",
                        "-f", "markdown",
                        "-t", "html",
                        "-o", "output.html"
                    ]
                },
                response: {
                    msg: "Conversion completed",
                    data: "",
                    code: 0,
                    stderr: ""
                }
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#pandoc'
    }
};

// Register all convert related commands
export function registerConvertHandlers() {
    registry.registerCommand(pandocHandler);
} 