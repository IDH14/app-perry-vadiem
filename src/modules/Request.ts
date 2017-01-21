import net = require('net');
import os = require('os');

const argv = require('yargs').argv;
var Promise = require('es6-promise').Promise;

const host = argv.host || 'localhost';
const port = argv.port || 50202;

export interface ServerResponse {
	version: string;
	method: string;
	body: any;
}

export function doCall(method: string, jsonBody: any) {
	return new Promise((resolve, reject) => {
		const conn = net.createConnection({ port: port, host: host }, () => {

			conn.write(method + "\r\n\r\n" + JSON.stringify(jsonBody));

			conn.on('data', (data) => {
				resolve(parseResponse(data.toString()));
				conn.destroy();
			});
		});
	});
}

export function parseResponse(data: string): ServerResponse {
	const lines = data.split(os.EOL);

	const meta = lines.shift();
	const metaParts = meta.split(' ');

	const joinedLines = lines.join('');

	const body = parseJson(joinedLines || '{}');

	let response: ServerResponse = {
		version: metaParts[1],
		method: metaParts[0],
		body: body
	};

	return response;
}

/**
 * Transform given string to JSON
 */
export function parseJson(data: string) {
	return JSON.parse(data);
}