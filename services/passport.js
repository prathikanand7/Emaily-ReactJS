const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys"); // no need to add .js if its a js file
const mongoose = require("mongoose");
const User = mongoose.model("user");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((exisingUser) => {
        if (exisingUser) {
          //we already have a record with given profileID
          done(null, exisingUser);
        } else {
          //we dont have this user record and so need to make a new user
          new User({ googleId: profile.id })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
); //creates a new instance of google strategy for OAuth
