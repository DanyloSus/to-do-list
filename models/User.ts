import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name must be required"] },
  surname: { type: String, required: [true, "Surname must be required"] },
  username: {
    type: String,
    required: [true, "Username must be required"],
  },
  email: {
    type: String,
    required: [true, "Email must be required"],
  },
  password: { type: String, required: [true, "Password must be required"] },
  date: Date,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
