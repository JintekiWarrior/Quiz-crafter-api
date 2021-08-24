// Using passport strategy
const passport = require('passport')
// using bearer strategy
const bearer = require('passport-http-bearer')

// User model
const User = require('./../models/user')

// passport.use method takes our strategy
passport.use(new bearer.Strategy(

  function(token, done) {
    User.findOne({ token }, function (err, user) {

      if (err) {
        return done(err)
      } else if (!user) {
        return done(null, false)
      }

      return done(null, user, { scope: 'all' })
    })
  }
))

module.exports = passport.initialize()
