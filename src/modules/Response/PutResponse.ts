import path = require('path');
import fs = require('fs');

import { checksum } from './../Helpers';
import { config } from './../../config';

import Response from './Response';
import ResponseInterface from './ResponseInterface';
import Request from './../Request';

export default class PutResponse extends Response implements ResponseInterface {

    create() {

        /** CREATE FILE IF NOT EXISTS */
        if(!this.fileExists(this.request.body['filename'])) {
            this.saveFile(this.request.body['filename'], this.request.body['content']);

            this.object = {
                status: 200,
                message: 'File added'
            }

            return;
        }

        /** CREATE FILE IF NOT EXISTS */

        this.object = { status: 'yes' };

        return;

        // this.object = {
        //     status: '404',
        //     message: 'Method not supported, see protocol: https://idh14.github.io/protocol/'
        // };
    }

    fileExists(fileName): boolean {
        return fs.existsSync(this.getFilePath(fileName));
    }

    saveFile(fileName, contents) {
        const filePath = this.getFilePath(fileName);

        fs.writeFileSync(filePath, contents, 'utf8');
    }

    private getFilePath(filename): string {
        return path.join(config.filesDir, filename);
    }

}