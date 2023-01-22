//import express from 'express';

const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20')
.Strategy;

const app = express();  //will listen to incoming req. and sends out responses

//needto go to console.cloud.google.com to create OAuth strategy
//Client ID : 312607634307-9ibju3dk67pl0fn4tiqjcfc1ok6ap6dm.apps.googleusercontent.com
//Client secret: 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

passport.use(new GoogleStrategy()); //creates a new instance of  g strategy


const PORT = process.env.PORT || 5000; //can inject environment varibles. Allows heroko/railway to send runtime port to use. 5000 for development, others for production
app.listen(PORT);
