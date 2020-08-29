const fs = require('fs');

class Stats {
    fileStats(f) {
        const stat = fs.statSync(f)
        return {
            size: stat.size,
            atime: {
                ms: stat.atimeMs,
                formatted: stat.atime,
            },
            mtime: {
                ms: stat.mtimeMs,
                formatted: stat.mtime,
            },
            ctime: {
                ms: stat.ctimeMs,
                formatted: stat.ctime,
            },
            btime: {
                ms: stat.birthtimeMs,
                formatted: stat.birthtime
            }
        };
    }
}

module.exports = {Stats}