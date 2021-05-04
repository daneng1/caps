'use strict';

const events = require('./events.js');

require('./driver.js');
require('./vendor.js');

// payload basically means "container object" to hold our data
events.on('newOrder', payload => {
  console.log(('Event:', { 
    event: 'pickup', 
    time: new Date,
    payload }), '\n')
  events.emit('pickup', payload );
});

events.on('inTransit', payload => {
  console.log(('Event:', { 
    event: 'in-transit', 
    time: new Date,
    payload }), '\n')

});

events.on('delivered', payload => {
  console.log(('Event:', { 
    event: 'delivered', 
    time: new Date,
    payload }), '\n')

});
