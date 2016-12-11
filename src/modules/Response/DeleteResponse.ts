import path = require('path');
import fs = require('fs');

import { checksum } from './../Helpers';
import { config } from './../../config';

import Response from './Response';
import ResponseInterface from './ResponseInterface';
import Request from './../Request';

export default class DeleteResponse extends Response implements ResponseInterface {

    create() {
        try {
            const filename = this.request.body['filename'];
            const filePath = path.join(config.filesDir, filename);
            fs.unlinkSync(filePath);

            this.object = { 'status': 200 };
        } catch (error) {
            this.object = { 'status': 100 };
        }
    }
}