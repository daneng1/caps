'use strict';

require('dotenv').config();
const faker = require('faker');
const io = require('socket.io-client');
let host = process.env.HOST || 'http://localhost:3000';

const socket = io.connect(`${host}/caps`);

const store = 'acme-widgets';
const store2 =  '1-206-flowers';

socket.emit('getAll', store);
socket.emit('getAll', store2);

setInterval(() => {
  let newOrder = {
    storeName: store,
    orderId: faker.datatype.uuid(),
    name: faker.name.findName(),
    address: faker.address.streetAddress()
  }
  socket.emit('pickup', newOrder);
  console.log('connected');
}, 3000);

setInterval(() => {
  let newOrder = {
    storeName: store2,
    orderId: faker.datatype.uuid(),
    name: faker.name.findName(),
    address: faker.address.streetAddress()
  }
  socket.emit('pickup', newOrder);
}, 3000);

socket.on('message', msg => {
  console.log('messages working');
  socket.emit('received', msg.payload);
})

socket.on('delivered', payload => {
  console.log((`THANK YOU for delivering order# ${payload.orderId}`), '\n','--------');

})

socket.on('delivered', payload => {
  socket.emit('received', payload);
})