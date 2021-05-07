'use strict';

// const Events = require('events'); 
// pull in the 1st party Events (aka EventEmitter) module
// const events = new Events(); 
// instantiation of our application event pool
const port = process.env.PORT || 3000;
const io = require('socket.io')(port);

require('./caps/caps.js')(io);
require('./driver/driver.js')(io);
require('./vendor/vendor.js')(io);
