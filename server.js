const net = require('net');
var server = net.createServer((socket) => {
  socket.setEncoding('utf8');

  socket.on('data', (data) => {
	  console.log('SERVER-ONDATA', data);
  });

  socket.on('end', () => {
	  console.log('SERVER-ONEND\n');
  });

  socket.write('SERVER-WRITE: hello world from server\n');
  
  //socket.end('SERVER-END\n');


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