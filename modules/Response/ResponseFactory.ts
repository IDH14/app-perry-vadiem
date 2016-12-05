import os = require('os')
import Request from './../request';
import ListResponse from './ListResponse';
import NotFoundMethodResponse from './NotFoundMethodResponse';
import ResponseInterface from './ResponseInterface';

export default class ResponseFactory {

	method: string = 'RESPONSE';
	version: string = 'idh14sync/1.0';
	body: JSON = JSON.parse('{}');

	constructor() {}

	static createFromRequest(request: Request) : ResponseInterface {
		switch (request.method) {
			case 'LIST':
			return new ListResponse(request);
			default:
			return new NotFoundMethodResponse(request);
		}
	}

	toString() {
		return `${this.method} ${this.version}${os.EOL}${os.EOL}${JSON.stringify(this.body, null, 2)}`;
	}
}