const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  surname: String,
  username: String,
  email: String,
  password: String,
  date: Date,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
