// routes to handle the quiz api calls
const express = require('express')
const mongoose = require('mongoose')

const Quiz = require('./../models/quiz.js')

const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// create quiz request handler
router.post('/quiz', requireToken, async (req, res, next) => {
    const quizData = req.body.quiz 
    req.body.quiz.owner = req.user.id 

    try {
        const quiz = await Quiz.create(quizData)
        res.status(201).json({ quiz })
    } catch (error) {
        return next(error)
    }
})

module.exports = router