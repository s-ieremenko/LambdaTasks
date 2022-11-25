import TelegramBot from 'node-telegram-bot-api'
import axios from 'axios'
import * as dotenv from 'dotenv'

dotenv.config()

const TOKEN = process.env.TELEGRAM_TOKEN
const bot = new TelegramBot(TOKEN, { polling: true })

console.log('Telegram bot started...')

const getRandomPhoto = async () => {
    try {
        const response = await axios.get('https://picsum.photos/200/300', { responseType: 'arraybuffer' });
        return response.request.res.responseUrl

    } catch (e) {
        console.log(e)
    }
}

bot.on('message', msg => {
    const { chat: { id, first_name }, text } = msg

    if (msg.text !== 'photo') {
        console.log(`User ${first_name} wrote ${text}`)
    } else {
        console.log(`User ${first_name} asked for a picture`)
    }
    bot.sendMessage(id, `You wrote ${text}`)
})


bot.onText(/photo/, async function onPhotoText(msg) {
    const res = await getRandomPhoto()
    await bot.sendPhoto(msg.chat.id, res, {
        caption: "Here is a new picture!"
    })

});






