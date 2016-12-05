const test = require('tape');
const os = require('os');
import Request from './request';

const mockRequest = {
	LIST:  `LIST idh14sync/1.0`,
	GET: `GET idh14sync/1.0${os.EOL}{ "filename": "file1.txt" }`,
	PUT: `PUT idh14sync/1.0${os.EOL}{ "filename": "file1.txt", "checksum": "8578201cf22b83bdaef44e1c5a5dc2e764218aa8", "original_checksum": "", "content": "" }`,
	DELETE: `DELETE idh14sync/1.0${os.EOL}{ "filename": "file1.txt" }`
};

test('Request.parseRequest() - LIST', (assert) => {
	const request: Request = new Request();
	request.parseRequest(mockRequest.LIST);

	assert.equal(request.method, 'LIST', 'Method is LIST');
	assert.equal(request.version, 'idh14sync/1.0', 'Version is idh14sync/1.0');
	assert.deepEqual(request.body, {}, 'Body is an empty object');

	assert.end();
});

test('Request.parseRequest() - GET', (assert) => {
	const request: Request = new Request();
	request.parseRequest(mockRequest.GET);

	assert.equal(request.method, 'GET', 'Method is GET');
	assert.equal(request.version, 'idh14sync/1.0', 'Version is idh14sync/1.0');
	assert.deepEqual(request.body, { "filename": "file1.txt" }, 'Body is a filled object');

	assert.end();
});

test('Request.parseRequest() - PUT', (assert) => {
	const request: Request = new Request();
	request.parseRequest(mockRequest.PUT);

	assert.equal(request.method, 'PUT', 'Method is PUT');
	assert.equal(request.version, 'idh14sync/1.0', 'Version is idh14sync/1.0');
	assert.deepEqual(request.body, { "filename": "file1.txt", "checksum": "8578201cf22b83bdaef44e1c5a5dc2e764218aa8", "original_checksum": "", "content": "" }, 'Body is a filled object');

	assert.end();
});

test('Request.parseRequest() - DELETE', (assert) => {
	const request: Request = new Request();
	request.parseRequest(mockRequest.DELETE);

	assert.equal(request.method, 'DELETE', 'Method is DELETE');
	assert.equal(request.version, 'idh14sync/1.0', 'Version is idh14sync/1.0');
	assert.deepEqual(request.body, { "filename": "file1.txt" }, 'Body is a filled object');

	assert.end();
});