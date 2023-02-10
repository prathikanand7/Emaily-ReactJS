const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys"); // no need to add .js if its a js file
const mongoose = require("mongoose");
const User = mongoose.model("user");

//managing cookies
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

//passport needs to be told to use these cookies

//passport function handler to handle google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
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
