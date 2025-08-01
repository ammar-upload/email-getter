
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user: String,
  password: String,
 
  getUserInfo: [
    {
      email: String,
      password: [
      {
        value : String
      }
      ],
      date: String
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
