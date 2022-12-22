import { createReadStream } from 'fs';

import { drive } from './createGoogleDrive.js';
import config from '../config.js';

const { googleDriveFolderID } = config

const uploadFile = async name => {
    try {
        const response = await drive.files.create({
            requestBody: {
                name,
                parents: [googleDriveFolderID]
            },
            media: {
                mimeType: 'image/jpg',
                body: createReadStream(name)
            }
        })
        console.log('Successfully uploaded')
        return response.data.id
    } catch (e) {
        console.log(e)
    }
}

export default uploadFile