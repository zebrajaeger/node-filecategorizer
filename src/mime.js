const {exec} = require("child_process");

class Mime {
    async getMimeType(path) {
        return new Promise((resolve, reject) => {
            exec('file -b -i "' + path + '"', (error, stdout, stderr) => {
                if (error) {
                    reject(error)
                    return;
                }
                if (stderr) {
                    reject(stderr)
                    return;
                }

                const full = stdout.trim();
                const split1 = full.split(";");
                const mime = split1[0];

                const fullEncoding = split1[1];
                const split2 = fullEncoding.split("=");
                const encodingType = split2[0];
                const encoding = split2[1];

                const split3 = mime.split("/");
                const major = split3[0];
                const minor = split3[1];
                const result = {full, mime, major, minor}
                if (encodingType.trim() === 'charset') {
                    result['encoding'] = encoding;
                }
                resolve(result);
            });
        })
    }
}

module.exports = {Mime}