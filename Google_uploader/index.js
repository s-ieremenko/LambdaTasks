import * as fs from 'fs/promises'
import inquirer from 'inquirer'

import uploadFile from './utils/uploadFile.js';
import shortenUrl from './utils/shortenUrl.js';
import getFileInfo from './utils/getFileInfo.js';

const chooseFileQuestion = [
    {
        type: 'input',
        name: 'file',
        message: 'Drag and drop or enter an absolute path to the file you want to upload and press Enter'

    }]

const shortenLinkConfirmation = [{
    type: 'confirm',
    name: 'askShorten',
    message: 'Would you like to shorten your link?',
    default: true,

}]

const start = async () => {
    try {
        const answers = await inquirer.prompt(chooseFileQuestion)

        let { fileName, fileExtension, filePath } = await getFileInfo(answers)

        const ans = await inquirer.prompt([{
            type: 'confirm',
            name: 'askRename',
            message: `You upload file with the name: ${fileName}, want to rename?`,
            default: true,

        },
            {
                type: 'input',
                name: 'newFileName',
                message: 'Enter new file name',
                when: ans => ans.askRename
            }])

        if (ans.askRename) {
            const { askRename, ...rest } = ans
            console.log(rest)
            fileName = rest.newFileName + fileExtension
        }

        const file = await fs.readFile(filePath)
        await fs.writeFile(`${fileName}`, file, 'base64')

        const fileId = await uploadFile(fileName)
        const replies = await inquirer.prompt(shortenLinkConfirmation)

        if (replies.askShorten) {
            try {
                await shortenUrl(fileId)
            } catch (e) {
                console.log(e.response.data)
            }
        }
    } catch (e) {
        console.log(e.message)
    }
}

start()








