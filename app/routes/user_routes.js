const express = require('express')
const mongoose = require('mongoose')

// security packages
const bcrypt = require('bcrypt')
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

module.exports = router
