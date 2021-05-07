'use strict';

const express = require('express');
const app = express();
const cors= require('cors');
const faker = require('faker');
const io = require('socket.io-client');
const HOST = process.env.HOST || 'http://localhost:3000';
const socket = io.connect(`${HOST}/caps`);
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.post('/pickup', (req, res) => {
  let newOrder = req.body || {
    storeName: store,
    name: faker.name.findName(),
    orderId: faker.datatype.uuid(),
    address: faker.address.streetAddress()
  }
  socket.emit('pickup', newOrder);
  res.status(200).send('you package is scheduled for pickup')
});

app.listen(PORT, () => {
  console.log('API server up on', PORT)
})
