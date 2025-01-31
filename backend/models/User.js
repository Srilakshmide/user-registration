const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  company: { type: String },
  age: { type: Number },
  dob: { type: Date },
  image: { type: String }, // Store image URL
});

module.exports = mongoose.model("User", userSchema);
