const net = require('net');
const os = require('os');
const argv = require('yargs').argv;

const host = argv.host || 'localhost';
const port = argv.port || 50201;

/**
 * Create connection and write to server
 */
const client = net.createConnection({ host: host, port: port }, () => {

  const method = argv.method || '';
  const filename = argv.file || 'file1.txt'; 

  switch (method) {
    case 'LIST':
      const list = `LIST idh14sync/1.0`;
      client.write(list);
      break;

    case 'GET':
      const get = `GET idh14sync/1.0${os.EOL}{ "filename": "${filename}" }`;
      client.write(get);
      break;

    case 'PUT':
      const put = `PUT idh14sync/1.0${os.EOL}{"filename": "${filename}", "checksum": "8578201cf22b83bdaef44e1c5a5dc2e764218aa8", "original_checksum": "", "content": "" }`;
      client.write(put);
      break;

    case 'DELETE':
      const remove = `DELETE idh14sync/1.0${os.EOL}{ "filename": "${filename}" }`;
      client.write(remove);
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