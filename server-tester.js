const net = require('net');
const os = require('os');
const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv;
const dir = __dirname;

const host = argv.host || 'localhost';
const port = argv.port || 50202;

//fs.writeFileSync(path.join(dir, '/server-files/ZmlsZTEudHh0'), 'Hello Node.js', 'utf8');
//fs.writeFileSync(path.join(dir, '/server-files/ZmlsZTIudHh0'), 'Goodbye Node.js', 'utf8');

/**
 * Create connection and write to server
 */
const client = net.createConnection({ host: host, port: port }, () => {

  const method = argv.method || '';
  const filename = argv.file || 'ZmlsZTEudHh0';

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
      const put = `PUT idh14sync/1.0${os.EOL}{"filename": "${filename}", "checksum": "159cb8ab470d9f2d2b45a04f446da51c97190b25", "original_checksum": "cd0eaaf877ff870cfc17890248c7adfe2483f3a0", "content": "R29vZGJ5ZSBOb2RlLmpz" }`;
      client.write(put);
      break;

    case 'DELETE':
      const remove = `DELETE idh14sync/1.0${os.EOL}{ "filename": "${filename}" }`;
      client.write(remove);
      break;

    default:
      const lis = `LIS idh14sync/1.0`;
      client.write(lis);
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