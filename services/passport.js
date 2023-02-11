const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys"); // no need to add .js if its a js file
const mongoose = require("mongoose");
const { use } = require("passport");
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
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (exisingUser) {
        //we already have a record with given profileID
        return done(null, exisingUser);
      }
      //we dont have this user record and so need to make a new user
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
); //creates a new instance of google strategy for OAuth
