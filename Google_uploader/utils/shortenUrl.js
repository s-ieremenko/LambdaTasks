import axios from 'axios';

import config from '../config.js';
import generatePublicUrl from './generatePublicUrl.js';

const { tinyApiToken, tinyApiUrl } = config

const shortenUrl = async fileId => {

    const url = await generatePublicUrl(fileId)
    const res = await axios.post(tinyApiUrl, {
        url
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tinyApiToken}`
        }
    })
    console.log('Here is your short link', res.data.data.tiny_url)
}

export default shortenUrl

