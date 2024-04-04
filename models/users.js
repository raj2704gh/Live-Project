const mongoose = require('mongoose');

// Define the schema for user data
const signUpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

// Create a model based on the schema
const User = mongoose.model('User', signUpSchema);

module.exports = User;
