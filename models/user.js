const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const { Schema} = mongoose;  - same as before
const userSchema = new Schema({
  googleId: String,
});

mongoose.model("users", userSchema);
