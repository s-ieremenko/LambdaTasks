import * as readline from 'readline';

const rl = readline.createInterface(
    {
        input: process.stdin,
        output: process.stdout,

    });
const sortText = 'How would you like to sort the values? Choose the number (1 - 5) and press enter to continue or exit to exit \n ' +
    '1 - Sort the words alphabetically \n' +
    '2 - Sort the numbers asc \n' +
    '3 - Sort the numbers desc \n' +
    '4 - Sort by the word"s size from smallest to biggest \n' +
    '5 - Show unique words \n' +
    '6 - Show unique values \n'

const getValuesByTypes = (arr, type) => arr.filter(item => typeof item === type)

const options = {
    '1': (arr) => getValuesByTypes(arr, 'string').sort(),
    '2': (arr) => getValuesByTypes(arr, 'number').sort((a, b) => a - b),
    '3': (arr) => getValuesByTypes(arr, 'number').sort((a, b) => b - a),
    '4': (arr) => getValuesByTypes(arr, 'string').sort((a, b) => a.length - b.length),
    '5': (arr) => [...new Set(getValuesByTypes(arr, 'string'))],
    '6': (arr) => [...new Set(arr)]
}


rl.question('Write 10 words and digits dividing them in spaces \n', (list) => {
    rl.setPrompt(sortText)
    rl.prompt()
    if (list === 'exit') {
        rl.close()
    }
    rl.on('line', (ans) => {

        const transformedArray = list.trim().split(' ').map(item => isNaN(item) ? item : +item)

        ans = ans.trim()

        const correctOption = options[ans]

        if (ans === 'exit') {
            rl.close()

        } else if (correctOption) {
            const res = correctOption(transformedArray)
            console.log(res)

        } else {
            console.log('Incorrect number, try again')
        }


    }).on('line', () => {
        rl.question('Write new 10 words and digits dividing them in spaces \n', (newList) => {
            if (newList === 'exit') {
                rl.close()
            }
            list = newList
            rl.prompt()
        })
    })
    rl.on('close', () => {
        console.log('Game is over. Good bye')
        process.exit(0)
    })
})










