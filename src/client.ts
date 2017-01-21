import path = require('path');
import fs = require('fs');
import os = require('os');
import net = require('net');
const _ = require('lodash');
const argv = require('yargs').argv;
const Promise = require('es6-promise').Promise;

const dir = __dirname;
const fileDir = path.join(dir, '/../client-files');
const syncInfoFile = fileDir + '/.syncfile.json';

const host = argv.host || 'localhost';
const port = argv.port || 50202;

import { doCall } from './modules/Request';

initApp()
	.then(syncInfoFileCheck)
	.then(fetchFileList)
	.then(parseFileListResponse)
	.then(createFiles)
	.catch((res) => {
		console.log(res);
	})




// empty initializer
function initApp() {
	return Promise.resolve();
}


function syncInfoFileCheck() {
	if (!fs.existsSync(syncInfoFile)) {
		var syncFileInfoJson = {
			version: '1.0.0',
			'authors': 'Vadiem & Perry',
			'files': [],
		};

		var result = fs.writeFileSync(syncInfoFile, JSON.stringify(syncFileInfoJson), 'UTF-8');
	}
}

function fetchFileList() {
	return doCall('LIST idh14sync/1.0', {})
}

function parseFileListResponse(data) {

	var syncInfo = JSON.parse(fs.readFileSync(syncInfoFile, 'UTF-8'));

	return _.difference(data.body.files, syncInfo.files);
}

function createFiles(data) {


	data.forEach(file => {
		var result = Promise.all(doCall('GET idh14sync/1.0', {filename: file.filename})).then();

		console.log(result);

	});

}


// fetch list of files from server

// compare local files with server files

// download files that do not yet exist locally

// upload files that do exist on both ends and have a different hash

// save local hashes in file
