import os = require('os');
import Request from './../Request';
abstract class Response {

    request: Request;
    object: Object;
    version: string = 'RESPONSE idh14sync/1.0';

    constructor (request: Request) {
        this.request = request;
    }

    toString() {

        return 'RESPONSE idh14sync/1.0' + os.EOL + os.EOL + JSON.stringify(this.object, null, 2)
    }
}
export default Response;