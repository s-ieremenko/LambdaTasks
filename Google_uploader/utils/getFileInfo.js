import path from "path";
import fs from 'fs/promises';

const getFileInfo = async answers => {
    const fileExists = async path => !!(await fs.stat(path).catch(e => false));
    const isFileExists = await fileExists(answers.file);

    if (isFileExists) {

        const filePath = path.resolve(answers.file)
        let fileName = path.basename(answers.file)
        const fileExtension = path.extname(answers.file)

        console.log(`File path: ${filePath}`)
        console.log(`File name: ${fileName}`)
        console.log(`File extension: ${fileExtension}`)
        return { fileName, fileExtension, filePath }
    } else {
        console.log('File doesn"t exist')
        process.exit()
    }
}
export default getFileInfo
