'use strict';

require('dotenv').config();
const faker = require('faker');
const io = require('socket.io-client');
let host = process.env.HOST || 'http://localhost:3000';

const socket = io.connect(`${host}/caps`);

const store = 'FAKER, LLC.';
socket.emit('join', store);

setInterval(() => {
  let newOrder = {
    storeName: store,
    name: faker.name.findName(),
    orderId: faker.datatype.uuid(),
    address: faker.address.streetAddress()
  }
  socket.emit('pickup', newOrder);
}, 3000);

socket.on('delivered', payload => {
  console.log((`THANK YOU for delivering order# ${payload.orderId}`), '\n','--------');
})
