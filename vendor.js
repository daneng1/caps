'use strict';

const faker = require('faker');
const events = require('./events.js');
require('dotenv').config();


setInterval(() => {

  let newOrder = {
    storeName: process.env.STORE,
    name: faker.name.findName(),
    orderId: faker.datatype.uuid(),
    address: faker.address.city()
  }

  events.emit('newOrder', newOrder);
}, 6000);

events.on('delivered', payload => {
  console.log((`THANK YOU for delivering order# ${payload.orderId}`), '\n', '--------');
})
