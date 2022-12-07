import TelegramBot from 'node-telegram-bot-api'
import * as fs from 'fs/promises'
import * as dotenv from 'dotenv'

dotenv.config()

import { getData, updateDataEveryTwoMinutes } from "./utils/getData.js";
import { options, hoursOptions, currencyOptions } from "./options.js";
import getCurrencyRateText from './utils/getCurrencyRateText.js'
import getCurrencyData from "./utils/getChosenCurrency.js";
import groupDataByDate from "./utils/groupDataByDate.js";
import getFormattedText from './utils/getFormattedText.js'
import sendMessages from './utils/sendMessage.js'


const WEATHER_TOKEN = process.env.API_TOKEN
const WEATHER_URL = process.env.API_URL
const BANK_URL = process.env.MONOBANK_URL
const BOT_TOKEN = process.env.TELEGRAM_TOKEN

const bot = new TelegramBot(BOT_TOKEN, {
    webHook: {
        port: process.env.PORT
    }
})
bot.setWebHook(`${process.env.URL_FOR_DEPLOY}/bot${BOT_TOKEN}`)

console.log('Telegram bot started...')


const start = () => {
    bot.on('message', async msg => {
        const { chat: { id, first_name } } = msg

        return bot.sendMessage(id, `Hi, ${first_name}, let"s start`, options)

    })


    bot.on('callback_query', async msg => {
        const { message: { chat: { id } }, data, id: query_id } = msg
        if (data === 'weather') {
            return sendMessages(bot, id, 'choose option', hoursOptions, query_id)
        } else if (data === '3' || data === '6') {
            const res = await getData(`${WEATHER_URL}${WEATHER_TOKEN}`)
            let listWithConvertedDate = res.list.map(item => ({ ...item, new_dt_txt: item.dt_txt.split(' ')[0] }))

            if (data === '6') {
                listWithConvertedDate = listWithConvertedDate.filter((item, index) => index % 2 !== 0)
            }
            const groupedData = groupDataByDate(listWithConvertedDate, 'new_dt_txt')
            const text = getFormattedText(groupedData)

            await sendMessages(bot, id, text, { parse_mode: 'Markdown' }, query_id)
            return sendMessages(bot, id, 'choose option or press back', hoursOptions, query_id)

        } else if (data === 'currency') {
            return sendMessages(bot, id, `choose option`, currencyOptions, query_id)

        } else if (data === 'usd' || data === 'euro') {
            updateDataEveryTwoMinutes(BANK_URL)

            const fileExists = async path => !!(await fs.stat(path).catch(e => false));
            try {
                const isFileExists = await fileExists('./file.json');
                if (!isFileExists) {
                    const res = await getData(BANK_URL)
                    const currencyData = await getCurrencyData(res)

                    await fs.writeFile('./file.json', JSON.stringify(currencyData, null, 2))

                }
                const text = await fs.readFile('./file.json', 'utf8')

                await sendMessages(bot, id, getCurrencyRateText(data, JSON.parse(text)), { parse_mode: 'Markdown' }, query_id)
                return sendMessages(bot, id, 'choose option or press back', currencyOptions, query_id)
            } catch (e) {
                console.log(e)
            }
        } else if (data === 'back') {
            return sendMessages(bot, id, 'choose the option', options, query_id)
        }
    })

}
start()







