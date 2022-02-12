
const fs = require('fs');
const path = require('path');
const appRootDir = require('app-root-dir').get();

const mkdir = (dirPath) => {
    try {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    } catch (error) {
        console.log(error);
    }

}
exports.writeFile = async (body) => {
    try {
        let _path = path.join(appRootDir + '/filemanager', body.owner);
        if (body.parent) {
            _path = `${_path}/${body.parent}`;
        }
        await mkdir(_path);

        const content = Buffer(body.content, "base64");
        fs.writeFileSync(`${_path}/${body.originalname}`, content);
        return body.originalname

    } catch (error) {
        console.log(error);
    }
}