const mongoose = require('mongoose')

// Saves user data to allow them to sign in again. As well as adds an access
// token and deletes the password when a user is displayed.
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  token: String
}, {
  timestamps: true,

  toJSON: {
    transform: (_doc, user) => {
      delete user.hashedPassword
      return user
    }
  }
})

module.exports = mongoose.model('User', userSchema)
