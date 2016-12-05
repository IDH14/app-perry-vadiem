import net = require('net')
import path = require('path')
import fs = require('fs')
import os = require('os')
import yargs = require('yargs')

import { log } from './modules/logger';
import Request from './modules/request';
import Response from './modules/response';


const argv = yargs.argv;

// const helpers = require('./helpers.js')
const dir = __dirname

const fileDir = path.join(dir, '/server-files');

const port = argv.port || 50202;

var server = net.createServer((socket) => {
  socket.setEncoding('utf8');

  // when receiveing data from the socket
  socket.on('data', (input: string) => {

    const request: Request = new Request();
    request.parseRequest(input);

    const response: Response = new Response();
    response.createFromRequest(request);

    socket.write(response.toString());

    // socket.write('RESPONSE idh14sync/1.0' + os.EOL + os.EOL + JSON.stringify(methodSwitch(method, json), null, 2));

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
