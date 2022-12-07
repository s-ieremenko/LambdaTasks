const getCurrencyRateText = (currency, obj) => {
    const { rateBuy, rateSell } = obj[currency]
    return `rateBuy: ${rateBuy.toFixed(2)}\nrateSell: ${rateSell.toFixed(2)} `

}

export default getCurrencyRateText