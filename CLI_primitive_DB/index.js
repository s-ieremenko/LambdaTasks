import inquirer from 'inquirer'
import * as fs from 'fs'

const output = [];


const questions = [
    {
        type: 'input',
        name: 'name',
        message: "What's your name?",

    },
    {
        type: 'list',
        name: 'gender',
        message: "What's your gender?",
        choices: ['male', 'female'],
    },
    {
        type: 'input',
        name: 'age',
        message: "What's your age?",
        validate: ans => {
            if (isNaN(ans)) return 'Your answer is not a number, please erase and enter again'
            return true
        }
    },
    {
        type: 'confirm',
        name: 'askAgain',
        message: 'Want to enter another user(just hit enter for YES)?',
        default: true,
    },
];

const questionsForSearch = [{
    type: 'confirm',
    name: 'askSearch',
    message: 'Want to search for user in DB (hit enter or "y" for YES or "n" for exit)?',
    default: true,
},
    {
        type: 'input',
        name: 'userName',
        message: 'Enter user name or the first letters',
        when: ans => ans.askSearch
    }
]

function getInfo() {
    inquirer.prompt(questionsForSearch).then(ans => {
        if (ans.askSearch) {
            let data = JSON.parse(fs.readFileSync("data.txt", "utf8"))

            const usersFound = data.filter(person => person.name.toLowerCase().includes(ans.userName.toLowerCase()))

            const stringifiedUsers = usersFound.map(user => JSON.stringify(user))

            inquirer.prompt([{
                type: 'list',
                name: 'user',
                message: "Which one is the user you are searching for?",
                choices: stringifiedUsers
            }]).then(ans => console.log(JSON.parse(ans.user)))
        } else {
            console.log('Good bye')
        }
    })
}

function ask() {
    inquirer.prompt(questions).then((answers) => {

        const { askAgain, ...rest } = answers
        output.push(rest);

        if (answers.askAgain) {
            ask();
        } else {
            fs.appendFile("data.txt", JSON.stringify(output, null, 2), function (error) {

                if (error) throw error;
                getInfo()

            });
        }
    });
}

ask();