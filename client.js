const net = require('net');
const argv = require('yargs').argv;

/**
 * Create connection and write to server
 */
const client = net.createConnection({ port: 50201 }, () => {
  switch (argv.method) {
    case 'LIST':
      const list = 'LIST idh14sync/1.0\r\n';
      client.write(list);
      break;

    case 'GET':
      const get = 'GET idh14sync/1.0\r\nfilename: Bestandsnaam_1.pdf\r\n';
      client.write(get);
      break;

    case 'PUT':
      const put = 'PUT idh14sync/1.0\r\nfilename: Bestandsnaam_1.pdf\r\nlength: 2132434\r\nchecksum: 8578201cf22b83bdaef44e1c5a5dc2e764218aa8\r\n';
      client.write(put);
      break;
  }
  
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
  // console.log('disconnected from server');
});