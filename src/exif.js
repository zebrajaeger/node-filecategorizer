const {exec} = require("child_process");

class Exif {
    _pathToExifTool;

    constructor(pathToExifTool) {
        this._pathToExifTool = pathToExifTool || 'exiftool'
    }

    async readExifData(path) {
        return new Promise((resolve, reject) => {
            exec(this._pathToExifTool + ' -json "' + path + '"', (error, stdout, stderr) => {
                if (error) {
                    reject(error)
                    return;
                }
                if (stderr) {
                    reject(stderr)
                    return;
                }
                resolve(JSON.parse(stdout)[0]);
            });
        })
    }
}

module.exports = {Exif}