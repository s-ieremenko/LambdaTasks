import * as dotenv from 'dotenv'

dotenv.config()

const config = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectURI: process.env.REDIRECT_URI,
    refreshToken: process.env.REFRESH_TOKEN,
    googleDriveFolderID: process.env.GOOGLE_DRIVE_FOLDER_ID,
    tinyApiToken: process.env.TINY_API_TOKEN,
    tinyApiUrl: process.env.TINY_API_URL
}

export default config