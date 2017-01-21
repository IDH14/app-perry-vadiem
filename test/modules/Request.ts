import assert = require('assert');
import os = require('os');

import { parseResponse, ServerResponse } from '../../src/modules/Request';

const exampleResponse = `~METHOD~ ~VERSION~

{
  "key": "value"
}
`

describe('parseResponse', () => {

	it('should parse a simple response object', () => {

		// act
		let response: ServerResponse = parseResponse(exampleResponse);

		// assert
		assert.equal(response.version, '~METHOD~');
		assert.equal(response.body.key, 'value');
	});
});
