import * as readline from 'readline';
import * as fs from 'fs'

import { getNumberOfValuesExistInFiles } from "./utils/getNumberOfValuesExistInFiles.js";
import { getUniqueValues } from "./utils/getUniqueValues.js";
import { checkIntersection } from "./utils/checkIntersection.js";

const loadFile = async (filename, file) => {

    return new Promise((resolve, reject) => {
        const input = fs.createReadStream(filename)
        const reader = readline.createInterface({ input })

        input.on('error', reject)

        reader.on('line', (line) => checkIntersection(map, line, file))
        reader.on('close', resolve)
    })
}

const start = Date.now()

const map = new Map()

fs.promises.readdir('./bigdata').then(files => Promise.allSettled(files.map((file) => {
    return loadFile(`./bigdata/${file}`, file)
})).then((results) => {
    results.forEach(res => console.log(res.status))
    const end = Date.now()
    
    console.log(`Time taken: ${(end - start) / 1000}s`)

    console.log('Number of unique values: ', getUniqueValues(map))
    console.log('Number of values, that exist in all files: ', getNumberOfValuesExistInFiles(map, files.length))
    console.log('Number of values, that exist at least in 10 files: ', getNumberOfValuesExistInFiles(map, 10))

}))


// Time taken: 4.551s
// Number of unique values:  129240
// Number of values, that exist in all files:  26045
// Number of values, that exist at least in 10 files:  108345


