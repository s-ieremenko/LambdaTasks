import TelegramBot from 'node-telegram-bot-api'
import { Command } from 'commander';
import fetch from 'node-fetch';
import FormData from 'form-data';
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config()

const TOKEN = process.env.TELEGRAM_TOKEN
const ID = process.env.CHAT_ID
const bot = new TelegramBot(TOKEN, { polling: true })


const program = new Command();


const url = `https://api.telegram.org/bot${TOKEN}`

bot.on('message', msg => {
    const { id } = msg.chat
    console.log(msg)
})

async function sendMessage(msg) {

    await fetch(`${url}/sendMessage?chat_id=${ID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: ID,
            text: msg

        })
    })
    process.exit()
}

async function sendPhoto(pic) {
    let form = new FormData();
    form.append('photo', fs.createReadStream(pic));
    await fetch(`${url}/sendPhoto?chat_id=${ID}`, {
        method: 'POST',
        body: form

    })
    process.exit()
}

program
    .command('message <message>')
    .alias('m')
    .description('Send a message to the telegram bot. Enter your message after "message" or "m" command space separated')
    .action((message) => {
        sendMessage(message)

    });

program
    .command('photo <photo>')
    .alias('p')
    .description('Send a photo to the telegram bot. Enter the file path after "photo" or "p" command space separated')
    .action((photo) => {
        sendPhoto(photo)

    });


program.parse();