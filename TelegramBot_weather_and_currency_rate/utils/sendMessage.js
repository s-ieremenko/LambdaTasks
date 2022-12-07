const sendMessages = async (bot, id, text, options, query_id) => {
    await bot.sendMessage(id, text, options)
    await bot.answerCallbackQuery(query_id)

}

export default sendMessages