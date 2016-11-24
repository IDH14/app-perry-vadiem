const path = require('path');
const fs = require('fs');
const os = require('os');
const net = require('net');
const argv = require('yargs').argv;
const helpers = require('./helpers.js');
const dir = __dirname;

const fileDir = path.join(dir, '/client-files');

const host = argv.host || 'localhost';
const port = argv.port || 50201;

// fetch list of files from server
net.createConnection({ port: port, host: host }, (socket) => {
	
});


// compare local files with server files

// download files that do not yet exist locally

// upload files that have a different hash

// 
