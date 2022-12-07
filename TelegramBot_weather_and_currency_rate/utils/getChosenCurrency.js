const getCurrencyData = (arr) => arr.reduce((acc, item) => {
    if (item.currencyCodeA === 840 && item.currencyCodeB === 980) {
        return { ...acc, usd: item }
    } else if (item.currencyCodeA === 978 && item.currencyCodeB === 980) {
        return { ...acc, euro: item }
    }
    return acc
}, {})

export default getCurrencyData