const test = require('tape');
const os = require('os');
import Request from './request';
import Response from './response';

const mockRequest = {
	LIST:  `LIST idh14sync/1.0`,
	GET: `GET idh14sync/1.0${os.EOL}{ "filename": "file1.txt" }`,
	PUT: `PUT idh14sync/1.0${os.EOL}{ "filename": "file1.txt", "checksum": "8578201cf22b83bdaef44e1c5a5dc2e764218aa8", "original_checksum": "", "content": "" }`,
	DELETE: `DELETE idh14sync/1.0${os.EOL}{ "filename": "file1.txt" }`
};

test('Response.parseRequest() - LIST', (assert) => {
	const request: Request = new Request();
	request.parseRequest(mockRequest.LIST);

	assert.equal(request.method, 'LIST', 'Method is LIST');
	assert.equal(request.version, 'idh14sync/1.0', 'Version is idh14sync/1.0');
	assert.deepEqual(request.body, {}, 'Body is an empty object');

	assert.end();
});