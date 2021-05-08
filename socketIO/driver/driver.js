'use strict';

require('dotenv').config();
const host = process.env.HOST || 'http://localhost:3000';
const io = require('socket.io-client');
const socket = io.connect(`${host}/caps`)

socket.on('pickup', (payload) => {
  setTimeout(() => {
    console.log('--------', '\n', (`Driver: picked up ${payload.payload.orderId}`), '\n', '--------');
  }, 2000);
  socket.emit('inTransit', payload);
})

socket.on('inTransit', payload => {
  setTimeout(() => {
    console.log('--------', '\n', (`Driver: delivered order# ${payload.payload.orderId}`), '\n', '--------');
  }, 2000);
  socket.emit('delivered', payload);
})
