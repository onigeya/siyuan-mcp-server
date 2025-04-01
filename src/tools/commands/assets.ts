import { z } from 'zod';
import { createHandler } from '../../utils/client.js';
import { registry } from '../../utils/registry.js';
import { CommandHandler } from '../../utils/registry.js';

const namespace = 'assets';

// Upload assets
const uploadAssetsHandler: CommandHandler = {
    namespace,
    name: 'uploadAssets',
    description: 'Upload assets',
    params: z.object({
        assets: z.array(z.object({
            path: z.string().describe('The file path'),
            data: z.string().describe('Base64 encoded file content')
        })).describe('A list of file or folder paths to be uploaded')
    }),
    handler: createHandler('/api/asset/upload'),
    documentation: {
        description: 'Upload assets to workspace',
        params: {
            assets: {
                type: 'array',
                description: 'A list of file or folder paths to be uploaded',
                required: true
            }
        },
        returns: {
            type: 'object',
            description: 'Upload result',
            properties: {
                succMap: 'Map of successfully uploaded files',
                errFiles: 'List of failed files'
            }
        },
        examples: [
            {
                description: 'This example demonstrates uploading a PNG image file to the assets directory, which will be renamed with a timestamp and unique ID in the response.',
                params: {
                    assets: [
                        {
                            path: "/assets/image.png",
                            data: "base64EncodedData..."
                        }
                    ]
                },
                response: {
                    succMap: {
                        "image.png": "assets/image-20230523085812-k3o9t32.png"
                    },
                    errFiles: []
                }
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#upload-assets'
    }
};

// Register all asset related commands
export function registerAssetsHandlers() {
    registry.registerCommand(uploadAssetsHandler);
} 