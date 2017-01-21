import path = require('path');
import fs = require('fs');
import os = require('os');
import net = require('net');
const _ = require('lodash');
const argv = require('yargs').argv;
const Promise = require('es6-promise').Promise;

import { toBase64, fromBase64, checksum } from './Helpers';

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
	.then(getNewFiles)
	.then(createNewFiles)





	.then(updateSyncFile)

	.catch((err) => {
		console.error(err);
	})

// empty initializer
function initApp() {
	return Promise.resolve();
}


function syncInfoFileCheck() {
	if (!fs.existsSync(syncInfoFile)) {
		writeSyncFile();
	}
}

function fetchFileList() {
	return doCall('LIST idh14sync/1.0', {})
}

/**
 * Parses the response from the LIST Request
 */
function parseFileListResponse(data) {
	var syncInfo = JSON.parse(fs.readFileSync(syncInfoFile, 'UTF-8'));

	var fileList = [];
	data.body.files.forEach(file => {
		if(!_.has(syncInfo.files, file.filename)) {
			fileList.push(file.filename);
		}
	});

	console.log('difference', fileList);

	return fileList;
}

function getNewFiles(data) {

	var promises = [];
	data.forEach(fileName => {
		promises.push(doCall('GET idh14sync/1.0', { filename: fileName }));
	});

	return Promise.all(promises);
}

function createNewFiles(files) {
	var fileList = {};
	files.forEach(file => {
		fs.writeFileSync(fileDir + '/' + fromBase64(file.body.filename), fromBase64(file.body.content));
		fileList[file.body.filename] = file.body.checksum;
	});
}

function updateSyncFile() {
	const files = fs.readdirSync(fileDir);
	const fileList = {};

	_.remove(files, (val) => {
		return val === '.DS_Store' || val === '.syncfile.json'
	});

	files.forEach(function (fileName) {
		const filePath = path.join(fileDir, fileName);
		const file = fs.readFileSync(filePath, 'utf-8');

		fileList[toBase64(fileName)] = checksum(file);
	});

	writeSyncFile(fileList);
}

function writeSyncFile(files = {}) {
	var syncFileInfoJson = {
		'version': '1.0.0',
		'authors': 'Vadiem & Perry',
		'files': files,
	};

	fs.writeFileSync(syncInfoFile, JSON.stringify(syncFileInfoJson), 'UTF-8');
}



// fetch list of files from server

// compare local files with server files

// download files that do not yet exist locally

// upload files that do exist on both ends and have a different hash

// save local hashes in file
