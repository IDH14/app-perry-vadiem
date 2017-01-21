import path = require('path');
import fs = require('fs');
import os = require('os');
import net = require('net');
const argv = require('yargs').argv;
const Promise = require('es6-promise').Promise;

const dir = __dirname;
const fileDir = path.join(dir, '/client-files');

const host = argv.host || 'localhost';
const port = argv.port || 50202;

import { doCall } from './modules/Request';

initApp()
	.then(fetchFileList)
	.then(parseFileListResponse)
	.then((res) => {
		// console.log(res);
	})



// empty initializer
function initApp() {
	return Promise.resolve();
}

function fetchFileList() {
	return doCall('LIST idh14sync/1.0')
}

function parseFileListResponse(data) {




	return 'hello world';
}


// fetch list of files from server

// compare local files with server files

// download files that do not yet exist locally

// upload files that do exist on both ends and have a different hash

// save local hashes in file
