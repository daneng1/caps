'use strict';

require('dotenv').config();
const host = process.env.PORT || 'http://localhost:3000';
const io = require('socket.io-client');
let socket = io.connect(`${host}/caps`);

// payload basically means "container object" to hold our data

// socket.on('join', room => {
//   socket.join(room);
//   console.log('room name:', room);
// })

socket.on('pickup', payload => {
  console.log(('Event:', {
    event: 'pickup',
    time: new Date,
    payload
  }), '\n');
  // socket.emit('pickup', payload);
});

socket.on('inTransit', payload => {
  console.log(('Event:', {
    event: 'in-transit',
    time: new Date,
    payload
  }), '\n');
  // socket.to(payload.storeName).emit('inTransit', payload);
});

socket.on('delivered', payload => {
  console.log(('Event:', {
    event: 'delivered',
    time: new Date,
    payload
  }), '\n');
  // socket.to(payload.storeName).emit('delivered', payload);
});

