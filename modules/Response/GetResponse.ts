const path = require('path');
const fs = require('fs');
const dir = __dirname;
import { checksum } from './../Helpers';
const fileDir = path.join(dir + '/../../', '/server-files');

import Response from './Response';
import ResponseInterface from './ResponseInterface';
import Request from './../Request';

export default class GetResponse extends Response implements ResponseInterface {
    create() {
        try {
            const filename = this.request.body['filename'];
            const filePath = path.join(fileDir, filename);
            const file = fs.readFileSync(filePath, 'utf-8');

            const response = {
                'status': 200,
                'filename': filename,
                'checksum': checksum(file),
                'content': new Buffer(file).toString('base64')
            };

            this.object = response;
        } catch (error) {
            this.object = { 'status': 404 };
        }        
    }
}