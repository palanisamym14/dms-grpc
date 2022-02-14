
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

exports.rootPath = (body) => path.join(appRootDir + '/filemanager', body.owner);

exports.writeFile = async (body) => {
    try {
        let _path = this.rootPath(body);
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

exports.renameDirFile = (body, oldPath, newPath) => {
    try {
        let _path = this.rootPath(body);;
        const _oldpath = `${_path}/${oldPath}`;
        const _newPath = `${_path}/${newPath}`;

        if (!fs.existsSync(_oldpath)) {
            fs.mkdirSync(_oldpath, { recursive: true });
        }
        return fs.renameSync(_oldpath, _newPath);
    } catch (error) {
        console.log(error);
    }

}
