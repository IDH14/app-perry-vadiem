const net = require('net');
var server = net.createServer((socket) => {
  socket.setEncoding('utf8');

  socket.on('data', (data) => {

    var method = data.substring(0, data.indexOf(' '));

    console.log(method + ' - ' + new Date(Date.now()).toLocaleString());


    socket.write('RESPONSE idh14sync/1.0\r\n\r\n' + JSON.stringify(methodSwitch(method)));

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
  return { files: 'list of files' };
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

