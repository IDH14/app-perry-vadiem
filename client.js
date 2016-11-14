const net = require('net');

/**
 * Create connection and write to server
 */
const client = net.createConnection({ port: 50201 }, () => {
  client.write('LIST idh14sync/1.0\r\n');
});

/**
 * Listen to data received from server
 */
client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});

/**
 * After disconnection from server
 */
client.on('end', () => {
  console.log('disconnected from server');
});