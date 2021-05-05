'use strict';

const io = require('socket.io-client');
require('dotenv').config();
const host = process.env.HOST || 'http://localhost:3000';

const driver = io.connect(`${host}/caps`)


driver.on('pickup', payload => {
  setTimeout(() =>{
    console.log('--------','\n',(`Driver: picked up ${payload.orderId}`),'\n', '--------');    
  }, 1000)
  driver.emit('inTransit', payload);
})

driver.on('inTransit', payload => {
  setTimeout(() => {
    console.log('--------','\n',(`Driver: delivered order# ${payload.orderId}`),'\n','--------');
  }, 1000)
  driver.emit('delivered', payload);
})

