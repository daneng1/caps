'use strict';

require('dotenv').config();
const host = process.env.PORT || 3333;
const io = require('socket.io')(host);
const id = require('uuid').v4;

const queue = {
  packages: {}
}

const vendor = io.of('/caps');

vendor.on('connection', socket => {

  socket.on('pickup', payload => {

    queue.packages[id] = payload;
    console.log('current queue', queue);

    // socket.emit('added'); // register the ability to "added" something with .on, which then disconnects the client so that they can add another chore
    // vendor.emit('chore', { id, payload }); // this will broadcast to everyone in the family namespace that a new chore was added and it's chore details are: id, payload
  });

  // let the child see the list of their chores in the queue
  socket.on('getAll', () => {
    Object.keys(queue.packages).forEach(id => {
      console.log( { id, payload: queue.chores[id] });
    })
  });

  // once a child has completed the chore, delete it from the queue
  socket.on('delivered', message => {
    delete queue.packages[message.id];
  });
})
