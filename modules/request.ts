import os = require('os');

export default class Request {

	version: string;
	method: string;
	body: JSON;

	constructor() {}
	
	parseRequest(data: string) {

		const lines = this.splitOnEol(data);
		
		const meta = this.splitOnSpace(lines[0]);
		this.method = meta[0];
		this.version = meta[1];

		this.body = this.parseJson(lines[1] || '{}');
	}

	private splitOnEol(string: string) {
		return string.split(os.EOL);
	}

	private splitOnSpace(string: string) {
		return string.split(' ');
	}

	private parseJson(data: string) {
		return JSON.parse(data);
	}
}