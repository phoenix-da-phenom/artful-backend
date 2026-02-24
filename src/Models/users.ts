import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["admin", "member"], default: "user" },

  country: { type: String, REQUIRED: true },
  state: { type: String, required: true },
  address: { type: String, required: true },
  postalCode: { type: String, require: true },
  profileImage: { type: String, required: false, default: null },
}, {timestamps:true});
