const express = require('express')
const mongoose = require('mongoose')

// security packages
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const passport = require('passport')

// error handlers
const errors = require('./../lib/custom_errors')

const BadParamsError = errors.BadParamsError
const BadCredentialsError = errors.BadCredentialsError

// user model
const User = require('./../models/user.js')

const router = express.Router()

// salting rounds, salt a password before hashing adding extra characters
// for extra security
bcryptSaltRounds = 10

// Pass the passport as middleware
const requireToken = passport.authenticate('bearer', { session: false })

// Sign up route
router.post('/sign-up', (req, res, next) => {
  Promise.resolve(req.body.credentials)
    // check for errors
    .then(credentials => {
      if (!credentials ||
          !credentials.password ||
          credentials.password !== credentials.password_confirmation) {
        throw new BadParamsError()
      }
    })

    // generate a hash from the provided password
    .then(() => bcrypt.hash(req.body.credentials.password, bcryptSaltRounds))
    .then(hash => {
      return {
        email: req.body.credentials.email,
        hashedPassword: hash
      }
    })
    // create the user
    .then(user => User.create(user))
    .then(user => res.status(201).json({ user: user.toObject() }))
    .catch(next)
})

// Sign In
router.post('/sign-in', (req, res, next) => {
  const pw = req.body.credentials.password
  let user

  // find user based on the email passed
  User.findOne({ email: req.body.credentials.email })
    // if we didn't find the user throw an error
    .then(record => {
      if (!record) {
        throw new BadCredentialsError()
      }
      // save the user
      user = record
      // returns true if the passwords match
      return bcrypt.compare(pw, user.hashedPassword)
    })

    .then(correctPassword => {
      // if the password matched
      if (correctPassword) {
        // create a token
        const token = crypto.randomBytes(16).toString('hex')
        user.token = token
        // save the token
        return user.save()
      } else {
        // otherwise throw an error
        throw new BadCredentialsError()
      }
    })
    // return status 201 and user
    .then(user => res.status(201).json({ user: user.toObject() }))
    // check for errors using middleWare
    .catch(next)
})

// Change Password
router.patch('/change-password', requireToken, (req, res, next) => {
  let user
  User.findById(req.user.id)
  // save the user
  .then(record => { user = record })
  // check the old password is correct
  .then(() => bcrypt.compare(req.body.passwords.old, user.hashedPassword))
  // check for any info missing errors
  .then(correctPassword => {
    if (!req.body.passwords.new || !correctPassword) {
      throw new BadParamsError()
    }
  })
  // hash new password
  .then(() => bcrypt.hash(req.body.passwords.new, 10))
  // set and save new hashed password
  .then(hash => {
    user.hashedPassword = hash
    return user.save()
  })
  // send status
  .then(() => res.sendStatus(204))
  // check for any errors
  .catch(next)
})

module.exports = router
