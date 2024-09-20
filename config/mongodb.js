const mongoose = require("mongoose");

// Connecting to MongoDB

// Defining the User schema
const LogInSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Email should be unique
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Creating a collection
const User = mongoose.model("User", LogInSchema);

module.exports = User;