const net = require('net');
const http = require('http');
const path = require('path');
const fs = require('fs');
const os = require('os');
const argv = require('yargs').argv;
const helpers = require('./helpers.js');
const dir = __dirname;

// working files directory
const fileDir = path.join(dir, '/server-files');

const port = argv.port || 50201;

var server = net.createServer((socket) => {
  socket.setEncoding('utf8');

  // when receiveing data from the socket
  socket.on('data', (input) => {

    const data = input.split(os.EOL);
    const method = data[0].substring(0, data[0].indexOf(' '));
    const body = data[1] || '{}';
    const json = JSON.parse(body);
    const date = new Date(Date.now()).toLocaleString();
    
    console.log(`${socket.remoteAddress}:${socket.remotePort} - ${method} - ${body} - ${date}`);

    socket.write('RESPONSE idh14sync/1.0' + os.EOL + os.EOL + JSON.stringify(methodSwitch(method, json), null, 2));

  });

  // runs after data has been transmitted
  socket.on('end', () => {

  });
});

/**
 * runs when server.closed() gets called
 */
server.on('close', () => {
  console.log('closed server');
});

/**
 * Handle errors
 */
server.on('error', (err) => {
  throw err;
});

/**
 * listen to specified port
 */
server.listen(port, () => {
  console.log('opened server on', server.address());
});

function methodSwitch(method, body) {

  try {
    switch (method) {
      case 'LIST':
        return listFiles();
      case 'GET':
        return getFile(body);
      case 'PUT':
        return putFile(body);
      case 'DELETE':
        return deleteFile(body);
    }

    throw { status: 400 }
  } catch (error) {
    return error;
  }
}

function listFiles() {
  const response = {
    'status': 200,
    'files': []
  };
  const files = fs.readdirSync(fileDir);

  files.forEach(function (fileName) {
    const filePath = path.join(fileDir, fileName);
    const file = fs.readFileSync(filePath, 'utf-8');

    response.files.push({
      filename: fileName,
      checksum: helpers.checksum(file)
    });

  }, this);

  return response;
}

function getFile(body) {
  try {
    const filePath = path.join(fileDir, body.filename);
    const file = fs.readFileSync(filePath, 'utf-8');

    const response = {
      'status': 200,
      'filename': body.filename,
      'checksum': helpers.checksum(file),
      'content': new Buffer(file).toString('base64')
    };

    return response;
  } catch (error) {
    return { 'status': 404 }
  }
}

function putFile() {
  return { error: 'Method not yet implemented' };
}

function deleteFile(body) {
  try {
    const filePath = path.join(fileDir, body.filename);
    fs.unlinkSync(filePath);

    return { 'status': 200 };
  } catch (error) {
    return { 'status': 100 };
  }
}

