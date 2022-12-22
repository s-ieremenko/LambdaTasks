import { google } from 'googleapis';
import config from '../config.js';

const { clientID, clientSecret, redirectURI, refreshToken } = config

const oauth2Client = new google.auth.OAuth2(
    clientID,
    clientSecret,
    redirectURI
)

oauth2Client.setCredentials({ refresh_token: refreshToken })

export const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})