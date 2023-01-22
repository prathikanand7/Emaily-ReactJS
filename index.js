//import express from 'express';

const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./config/keys"); // no need to add .js if its a js file

const app = express(); //will listen to incoming req. and sends out responses

//need to go to console.cloud.google.com to create OAuth strategy

//Client ID - is a public token used to identify our servers to anyone in the world
//client secrect should not be shared - as it will let anyone on globe to have unprecedented acess to our project

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("access token", accessToken);
      console.log("refresh token", refreshToken);
      console.log("profile:", profile);
    }
  )
); //creates a new instance of google strategy for OAuth

//Routehandler
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get("/auth/google/callback", passport.authenticate("google"));

const PORT = process.env.PORT || 5000; //can inject environment varibles. Allows heroko/railway to send runtime port to use. 5000 for development, others for production
app.listen(PORT);
