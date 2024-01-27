const mongoose = require('mongoose');

// Destructure the Schema object from mongoose
const { Schema, model } = mongoose;

// Define the user schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  location:{
    type:String,
    require:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date:{
    type:String,
    default:Date.now()
  }
  // Add other fields as needed
});

// Create a Mongoose model based on the schema
const User = model('User', userSchema);

// Export the User model
module.exports = User;