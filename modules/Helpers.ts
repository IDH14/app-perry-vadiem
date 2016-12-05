import crypto = require('crypto');

export function checksum(str, algorithm = 'sha1', encoding?) {
    return crypto
        .createHash(algorithm)
        .update(str, 'utf8')
        .digest(encoding || 'hex')
};