const crypto = require('crypto');
const fs = require('fs');

class FileHash {
    algorithm_;
    bufferSize_ = 1024 * 1024; // 1MB read buffer

    constructor(algorithm) {
        this.algorithm_ = algorithm || 'sha256';
    }

    hashFile(path) {
        let fileDescriptor = fs.openSync(path, 'r');
        let stat = fs.fstatSync(fileDescriptor);
        const buffer = Buffer.alloc(this.bufferSize_);

        const hash = crypto.createHash(this.algorithm_);

        for (let toRead = stat.size; toRead > 0;) {
            const bytesRead = fs.readSync(fileDescriptor, buffer, 0, buffer.length, 0);
            let b;
            if (bytesRead < buffer.length) {
                b = buffer.subarray(0, bytesRead);
            } else {
                b = buffer;
            }
            hash.update(b);
            toRead -= bytesRead;
        }

        fs.closeSync(fileDescriptor);
        return hash.digest('hex');
    }
}

module.exports = {FileHash}