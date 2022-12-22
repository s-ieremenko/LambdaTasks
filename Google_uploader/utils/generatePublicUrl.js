import { drive } from './createGoogleDrive.js';

const generatePublicUrl = async fileId => {
    try {
        await drive.permissions.create({
            fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        })

        const result = await drive.files.get({
            fileId,
            fields: 'webViewLink'
        })
        return result.data.webViewLink
    } catch (e) {
        console.log(e.message)
    }
}

export default generatePublicUrl