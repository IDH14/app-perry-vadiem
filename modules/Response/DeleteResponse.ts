const path = require('path');
const fs = require('fs');
const dir = __dirname;
import { checksum } from './../Helpers';
const fileDir = path.join(dir + '/../../', '/server-files');

import Response from './Response';
import ResponseInterface from './ResponseInterface';
import Request from './../Request';
export default class DeleteResponse extends Response implements ResponseInterface {

    create() {
        try {
            const filename = this.request.body['filename'];
            const filePath = path.join(fileDir, filename);
            fs.unlinkSync(filePath);

            this.object = { 'status': 200 };
        } catch (error) {
            this.object = { 'status': 100 };
        }
    }
}