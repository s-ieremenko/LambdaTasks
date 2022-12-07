import axios from "axios";
import fs from "fs/promises";

import getCurrencyData from "./getChosenCurrency.js";

const getData = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data

    } catch (e) {
        console.log(e)

    }
}

const updateDataEveryTwoMinutes = (url) => {
    try {
        setInterval(async () => {
            console.log(`new Data is got on ${new Date()}`)
            const res = await getData(url)
            const currencyData = await getCurrencyData(res)

            await fs.writeFile('./file.json', JSON.stringify(currencyData, null, 2))
        }, 120000)
    } catch (e) {
        console.log(e)
    }
}

export { getData, updateDataEveryTwoMinutes }