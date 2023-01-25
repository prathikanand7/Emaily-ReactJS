//import express from 'express';
//importing files here
const express = require("express");
const { default: mongoose } = require("mongoose");
const keys = require("./config.keys");
require("./services/passport");
require("./models/user");

mongoose.connect(keys.mongoURI); //connecting mongoDB database
const app = express(); //will listen to incoming req. and sends out responses

require("./routes/authRoutes")(app);
//need to go to console.cloud.google.com to create OAuth strategy

//Client ID - is a public token used to identify our servers to anyone in the world
//client secrect should not be shared - as it will let anyone on globe to have unprecedented acess to our project

const PORT = process.env.PORT || 5000; //can inject environment varibles. Allows heroko/railway to send runtime port to use. 5000 for development, others for production
app.listen(PORT);
