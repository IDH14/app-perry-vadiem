import os = require('os')

import Request from './../request';
import ListResponse from './ListResponse';
import PutResponse from './PutResponse';
import GetResponse from './GetResponse';
import DeleteResponse from './DeleteResponse';
import NotFoundMethodResponse from './NotFoundMethodResponse';
import ResponseInterface from './ResponseInterface';

export default class ResponseFactory {

	method: string = 'RESPONSE';
	version: string = 'idh14sync/1.0';
	body: JSON = JSON.parse('{}');

	constructor() { }

	static createFromRequest(request: Request): ResponseInterface {
		switch (request.method) {
			case 'LIST':
				return new ListResponse(request);
			case 'PUT':
				return new PutResponse(request);
			case 'GET':
				return new GetResponse(request);
			case 'DELETE':
				return new DeleteResponse(request);
			default:
				return new NotFoundMethodResponse(request);
		}
	}

	toString() {
		return `${this.method} ${this.version}${os.EOL}${os.EOL}${JSON.stringify(this.body, null, 2)}`;
	}
}