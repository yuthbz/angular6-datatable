const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  address: {
    street: String,
    city: String,
    province: String,
    postcode: String,
    country: String
  }
});
module.exports = mongoose.model('users', userSchema);
