const net = require('net');
const http = require('http');
const path = require('path');
const fs = require('fs');
const dir = __dirname;

// working files directory
const fileDir = path.join(dir, '/files');

var server = net.createServer((socket) => {
  socket.setEncoding('utf8');

  socket.on('data', (data) => {

    var method = data.substring(0, data.indexOf(' '));

    console.log(method + ' - ' + new Date(Date.now()).toLocaleString());


    socket.write(
`RESPONSE idh14sync/1.0
    
` + JSON.stringify(methodSwitch(method), null, 2)
);

  });

  socket.on('end', () => {
    // console.log('SERVER-ONEND\n');
  });


});

/**
 * Handle errors
 */
server.on('error', (err) => {
  throw err;
});

/**
 * listen to random port
 */
server.listen(50201, () => {
  console.log('opened server on', server.address());
});


function methodSwitch(method) {

  switch (method) {
    case 'LIST':
      return listFiles();
    case 'GET':
      return getFile();
    case 'PUT':
      return putFile();
    case 'DELETE':
      return deleteFile();
  }

  return { error: 'Wrong method, supported methods: LIST, GET, PUT, DELETE' };
}

function listFiles() {
  const response = {
    "status": 200,
    "files": []
  };
  const files = fs.readdirSync(fileDir);

  files.forEach(function (fileName) {
    const filePath = path.join(fileDir, fileName);
    const file = fs.readFileSync(filePath);

    response.files.push({
      filename: fileName,
      checksum: file.toString('base64')
    });

  }, this);

  return response;
}

function getFile() {
  return { error: 'Method not yet implemented' };
}

function putFile() {
  return { error: 'Method not yet implemented' };
}

function deleteFile() {
  return { error: 'Method not yet implemented' };
}

