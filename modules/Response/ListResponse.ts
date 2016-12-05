const path = require('path');
const fs = require('fs');
const dir = __dirname;
import { checksum } from './../Helpers';
// working files directory
const fileDir = path.join(dir + '/../../', '/server-files');

import Response from './Response';
import ResponseInterface from './ResponseInterface';
import Request from './../Request';
export default class ListReponse extends Response implements ResponseInterface {

    create() {
        const response = {
            'status': 200,
            'files': []
        };
        const files = fs.readdirSync(fileDir);

        files.forEach(function (fileName) {
            const filePath = path.join(fileDir, fileName);
            const file = fs.readFileSync(filePath, 'utf-8');

            response.files.push({
                filename: fileName,
                checksum: checksum(file)
            });

        }, this);

        this.object = response;
    }

}