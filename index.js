//import express from 'express';

const express = require('express');
const app = express();  //will listen to incoming req. and sends out responses

app.get('/', (req, res) => {  //
  res.send({ bye: 'there' });  //
});                           //

const PORT = process.env.PORT || 5000; //can inject environment varibles. Allows heroko/railway to send runtime port to use. 5000 for development, others for production
app.listen(PORT);
