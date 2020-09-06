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
    filterByMime_;

    constructor(filterByMime) {
        this.filterByMime_ = filterByMime;
    }

    replaceAll(s, replace, by) {
        return s.split(replace).join(by);
    }

    shellifyString(s) {
        s = this.replaceAll(s, '\'', '\\\'')
        return '$\'' + s + '\'';
    }

    async categorizeFile(filePath, filterByMime) {

        const filter = filterByMime || this.filterByMime_;
        filePath = this.shellifyString(filePath);

        return new Promise(async (resolve, reject) => {

            let mime, exif, hash, stats;
            try {
                mime = await this.mime_.getMimeType(filePath);
            } catch (err) {
                if (!this.ignoreErrors_) {
                    reject(err);
                    return;
                }
            }

            let rejectedByFilter = filter && !filter(mime);

            if (!rejectedByFilter) {
                try {
                    exif = await this.exif_.readExifData(filePath)
                } catch (err) {
                    if (!this.ignoreErrors_) {
                        reject(err);
                        return;
                    }
                }

                try {
                    hash = this.fileHash_.hashFile(filePath);
                } catch (err) {
                    if (!this.ignoreErrors_) {
                        reject(err);
                        return;
                    }
                }

                try {
                    stats = this.stats_.fileStats(filePath);
                } catch (err) {
                    if (!this.ignoreErrors_) {
                        reject(err);
                        return;
                    }
                }
            }

            resolve({
                mime,
                rejectedByFilter,
                hash,
                stats,
                exif,
            });
        })
    }
}

module.exports = {Category, Exif, FileHash, Mime, Stats}
