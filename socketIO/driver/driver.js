'use strict';

const io = require('socket.io-client');
require('dotenv').config();
const host = process.env.HOST || 'http://localhost:3000';

const socket = io.connect(`${host}/caps`)

const store = 'FAKER, LLC.';
socket.emit('join', store);

socket.on('pickup', payload => {
  setTimeout(() =>{
    console.log('--------','\n',(`Driver: picked up ${payload.orderId}`),'\n', '--------');    
    socket.emit('inTransit', payload);
  }, 2000);

  setTimeout(() => {
    console.log('--------','\n',(`Driver: delivered order# ${payload.orderId}`),'\n','--------');
    socket.emit('delivered', payload);
  }, 2000);

})

socket.on('inTransit', payload => {
})

