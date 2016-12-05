import os = require('os')
import Request from './request';

export default class Response {

	method: string = 'RESPONSE';
	version: string = 'idh14sync/1.0';
	body: JSON = JSON.parse('{}');

	constructor() {}

	createFromRequest(request: Request) {
		
	}

	toString() {
		return `${this.method} ${this.version}${os.EOL}${os.EOL}${JSON.stringify(this.body, null, 2)}`;
	}
}