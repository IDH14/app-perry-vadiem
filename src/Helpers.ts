import crypto = require('crypto');
import os = require('os');

export function splitOnEol(string: string): string[] {
    return string.split(os.EOL);
}

export function splitOnSpace(string: string): string[] {
    return string.split(' ');
}

export function toBase64(str: string): string {
    return Buffer.from(str).toString('base64')
}

export function fromBase64(str: string): string {
   return  Buffer.from(str, 'base64').toString('ascii');
}

export function checksum(str, algorithm = 'sha1', encoding?): string {
    return crypto
        .createHash(algorithm)
        .update(str, 'utf8')
        .digest(encoding || 'hex')
};