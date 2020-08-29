const {Exif} = require("./exif");
const {FileHash} = require("./hash");
const {Mime} = require("./mime");
const {Stats} = require("./stats");

class Category {
    exif_ = new Exif();
    fileHash_ = new FileHash();
    mime_ = new Mime();
    stats_ = new Stats();
    ignoreErrors_ = true;

    async categorizeFile(filePath) {
        return new Promise(async (resolve, reject) => {
            let exif;
            try {
                exif = await this.exif_.readExifData(filePath)
            } catch (err) {
                if (!this.ignoreErrors_) {
                    reject(err);
                    return;
                }
            }

            let hash;
            try {
                hash = this.fileHash_.hashFile(filePath);
            } catch (err) {
                if (!this.ignoreErrors_) {
                    reject(err);
                    return;
                }
            }

            let mime;
            try {
                mime = await this.mime_.getMimeType(filePath);
            } catch (err) {
                if (!this.ignoreErrors_) {
                    reject(err);
                    return;
                }
            }

            let stats;
            try {
                stats = this.stats_.fileStats(filePath);
            } catch (err) {
                if (!this.ignoreErrors_) {
                    reject(err);
                    return;
                }
            }

            resolve({
                mime,
                hash,
                stats,
                exif,
            });
        })
    }
}

module.exports = {Category, Exif, FileHash, Mime, Stats}


