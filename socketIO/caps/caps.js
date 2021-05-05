'use strict';

require('dotenv').config();
const host = process.env.PORT || 3000;
const io = require('socket.io')(host);
let caps = io.of('/caps');

// payload basically means "container object" to hold our data
caps.on('connection', (socket) => {
  
  socket.on('join', room => {
    socket.join(room);
  })
  
  socket.on('pickup', payload => {
    console.log(('Event:', { 
      event: 'pickup', 
      time: new Date,
      payload }), '\n');
    caps.emit('pickup', payload );
  });

  socket.on('inTransit', payload => {
    console.log(('Event:', { 
      event: 'in-transit', 
      time: new Date,
      payload }), '\n');
    caps.to(payload.storeName).emit('inTransit', payload );
  });

  socket.on('delivered', payload => {
    console.log(('Event:', { 
      event: 'delivered', 
      time: new Date,
      payload }), '\n');
    caps.to(payload.storeName).emit('delivered', payload );
  });
})