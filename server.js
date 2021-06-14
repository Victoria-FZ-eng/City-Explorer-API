const express = require('express');
const server = express();

const weather = require('./data/weather.json');

const cors = require('cors');
server.use(cors()); 


const PORT = 3000;

// localhost:3000/
server.get('/',(req, res)=>{
  res.send('hello');
})