const hoursOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: '3 hours', callback_data: 3 }, { text: '6 hours', callback_data: 6 }],
            [{ text: 'back to tne menu', callback_data: 'back' }]
        ]
    })
}

const options = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Weather in Kyiv', callback_data: 'weather' }, {
                text: 'Currency rate',
                callback_data: 'currency'
            }],

        ]
    })
}

const currencyOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'USD', callback_data: 'usd' }, { text: 'EUR', callback_data: 'euro' }],
            [{ text: 'back to tne menu', callback_data: 'back' }]
        ]
    })
}

export { options, hoursOptions, currencyOptions }