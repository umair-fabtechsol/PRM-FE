import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String },
  password: { type: String },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;