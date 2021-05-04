'use strict';

const events = require('./events.js');


events.on('pickup', payload => {
  setTimeout(() =>{
    console.log('--------','\n',(`Driver: picked up ${payload.orderId}`),'\n', '--------');    
    events.emit('inTransit', payload);
  }, 1000)
})

events.on('inTransit', payload => {
  setTimeout(() => {
    console.log('--------','\n',(`Driver: delivered order# ${payload.orderId}`),'\n','--------');
    events.emit('delivered', payload)
  }, 1000)
})
