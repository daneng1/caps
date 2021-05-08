'use strict';

require('dotenv').config();
const host = process.env.PORT || 3000;
const io = require('socket.io')(host);
const uuid = require('uuid').v4;

const server = io.of('/caps');

const queue = {
  'acme-widgets': {},
  '1-206-flowers': {}
}

server.on('connection', socket => {
  console.log('connected', socket.id);
  // socket.on('join', room => {
  //   console.log('room name:', room);
  //   socket.join(room);
  // })
  socket.on('pickup', payload => {
    let store = payload.storeName;
    let id = uuid();
    queue[store][id] = payload;
    console.log('current queue:', {id, payload});
    server.emit('pickup', {id, payload});
  })

  socket.on('received', payload => {
    let store = payload.storeName;
    let id = id();
    console.log('current queue', queue[store][id]);
    // delete queue[store][orderID];

  });

  socket.on('getAll', payload => {
    // const store = payload.storeName;
    console.log(payload);
    Object.keys(queue[payload]).forEach((id) => {
      // console.log({ payload:queue[payload][id] });
      socket.emit('message', { payload: queue[payload][id]});
    })
  })

  socket.on('delivered', payload => {
    let store = payload.storeName;
    let orderID = payload.orderID;
    queue[store][orderID] = { payload };
    socket.emit('delivered', payload);
  });
})


// '3fd65bf6-75b0-4468-8576-cdd28fd855b9': {
//   storeName: '1-206-flowers',
//   orderId: '1514a877-3d86-46a4-8dbd-13b1497697be',
//   name: 'Clara Daniel',
//   address: '941 Simonis Station'