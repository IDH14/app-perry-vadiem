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

	// get new files from server
	.then(fetchNewFiles)
	.then(writeNewFiles)

	// upload new files from client
	.then(checkNewFilesFromClient)

	// .then(deleteOldFiles)

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
	var syncInfo = readSyncFile();

	var fileList = [];

	Object.keys(syncInfo.files).forEach((fileName, index) => {
		var fileExists = _.find(data.body.files, { 'filename': toBase64(fileName) });

		if(_.isUndefined(fileExists)) {
			fs.unlinkSync(fileDir + '/' + fileName);
		}
	});

	data.body.files.forEach(file => {
		// if file does not exist in synclist
		if(!_.has(syncInfo.files, fromBase64(file.filename))) {
			fileList.push(file.filename);
			return;
		}

		// if file exists and hash is different
		var filePath = fileDir + '/' + fromBase64(file.filename);

		if(!fs.existsSync(filePath)) {
			return;
		}

		var fileContents = fs.readFileSync(filePath, 'utf-8');
		var fileHash = checksum(fileContents);

		if(syncInfo.files[fromBase64(file.filename)] !== file.checksum) {
			fs.renameSync(filePath, filePath + '-' + (new Date()).valueOf().toString());
			fileList.push(file.filename);
		}
	});

	return fileList;
}

function fetchNewFiles(data) {
	var promises = [];
	data.forEach(fileName => {
		promises.push(doCall('GET idh14sync/1.0', { filename: fileName }));
	});

	return Promise.all(promises);
}

function writeNewFiles(files) {
	var fileList = {};
	files.forEach(file => {
		fs.writeFileSync(fileDir + '/' + fromBase64(file.body.filename), fromBase64(file.body.content));
		fileList[file.body.filename] = file.body.checksum;
	});
}

function checkNewFilesFromClient() {
	var syncFile = readSyncFile();
	var syncFileFilelist = syncFile.files;
	var existingFiles = readFileTree();
	var newFiles = [];

	console.log('=====');
	console.log(syncFileFilelist);
	console.log(existingFiles);
	console.log('=====');

	let promises = [];

	Object.keys(syncFileFilelist).forEach((fileName) => {
		if(!_.has(existingFiles, fileName)) {

			var checksum = syncFileFilelist[fileName];

			promises.push(doCall('DELETE idh14sync', {
				'filename': toBase64(fileName),
				'checksum': checksum
			}));
		}
	});

	existingFiles.forEach(file => {
		if(!_.has(syncFileFilelist, file)) {
			newFiles.push(file);
			return;
		}

		var filePath = fileDir + '/' + file;
		var fileContents = fs.readFileSync(filePath, 'utf-8');
		var fileHash = checksum(fileContents);

		// console.log('before if');
		// console.log(file);
		// console.log(syncFileFilelist);
		// console.log(syncFileFilelist[file]);
		// console.log(fileHash);

		if(syncFileFilelist[file] !== fileHash) {
			newFiles.push(file);
		}
	});

	newFiles.forEach(fileName => {
		promises.push(uploadFile(fileName));
	});

	return promises;
}

function uploadFile(fileName) {
	let filePath = fileDir + '/' + fileName;
	let fileContents = fs.readFileSync(filePath, 'utf-8');
	let syncFile = readSyncFile();
	let syncFileList = syncFile.files;
	let originalChecksum = syncFileList[fileName] || '';

	let body = {
		filename: toBase64(fileName),
		checksum: checksum(fileContents),
		original_checksum: originalChecksum,
		content: toBase64(fileContents)
	};

	return doCall('PUT idh14sync', body);
}

function checkExistingFilesFromClient() {

}

/**
 * Returns a list of files in the fileTree.
 * Removes unwanted files (dot-files eg.)
 */
function readFileTree() {
	let files = fs.readdirSync(fileDir);

	_.remove(files, (val) => {
		return val === '.DS_Store' || val === '.syncfile.json'
	});

	return files;
}

/**
 * Returns current SyncFile
 */
function readSyncFile() {
	return JSON.parse(fs.readFileSync(syncInfoFile, 'UTF-8'));
}

/**
 * Rebuild syncfile with current file tree
 */
function updateSyncFile() {
	const files = readFileTree();
	const fileList = {};

	files.forEach(function (fileName) {
		const filePath = path.join(fileDir, fileName);
		const file = fs.readFileSync(filePath, 'utf-8');

		fileList[fileName] = checksum(file);
	});

	writeSyncFile(fileList);
}

/**
 * Write new syncfile to disk
 */
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
