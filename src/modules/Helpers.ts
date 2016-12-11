import crypto = require('crypto');

export function toBase64(str: string) {
    return Buffer.from(str).toString('base64')
}

export function fromBase64(str: string) {
   return  Buffer.from(str, 'base64').toString('ascii');
}

export function checksum(str, algorithm = 'sha1', encoding?) {
    return crypto
        .createHash(algorithm)
        .update(str, 'utf8')
        .digest(encoding || 'hex')
};