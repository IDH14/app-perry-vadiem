const crypto = require('crypto');

module.exports = {
	checksum: function(str, algorithm, encoding) {
    	return crypto
			.createHash(algorithm || 'sha1')
			.update(str, 'utf8')
			.digest(encoding || 'hex')
	}
};