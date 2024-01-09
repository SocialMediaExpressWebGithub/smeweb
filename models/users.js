// models/User.js

import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: String,
  password: String, // Store hashed passwords
},
{
  timestamps: true,
});

export default mongoose.models.User || mongoose.model('User', userSchema);
