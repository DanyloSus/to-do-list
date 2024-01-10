const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name must be required"] },
  surname: { type: String, required: [true, "Surname must be required"] },
  username: {
    type: String,
    unique: [true, "The username already exists"],
    required: [true, "Username must be required"],
  },
  email: {
    type: String,
    unique: [true, "The email already exists"],
    required: [true, "Email must be required"],
  },
  password: { type: String, required: [true, "Password must be required"] },
  date: Date,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
