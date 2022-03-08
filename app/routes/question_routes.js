const express = require('express')
const mongoose = require('mongoose')

const Question = require('./../models/question')
const Quiz = require('./../models/quiz')

const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()


// Question Create Request 
router.post('/questions', requireToken, async (req, res, next) => {
    const questionData = req.body.question 
    const quizId = questionData.quizId 
    try {
        const quiz = await Quiz.findById(quizId)
        const updatedQuiz = await quiz.questions.push(questionData)
        res.status(201).json({ updatedQuiz })
        return quiz.save()
    } catch (error) {
        return next(error)
    }
})

// Question Update Request 
router.patch('/questions/:id', requireToken, async (req, res, next) => {
    const questionId = req.params.id
    const quizId = req.body.question.quizId
    const questionData = req.body.question
    try {
        const quiz = await Quiz.findById(quizId)
        await quiz.questions.id(questionId).set(questionData)
        res.sendStatus(204)
        return quiz.save()
    } catch (error) {
        return next(error)
    }
})

// Question Delete Request Handler
router.delete('/questions/:id', requireToken, async (req, res, next) => {
    const questionId = req.params.id 
    const quizId = req.body.question.quizId 
    try {
        const quiz = await Quiz.findById(quizId)
        await quiz.questions.id(questionId).remove()
        res.sendStatus(204)
        return quiz.save()
    } catch (error) {
        return next(error)
    }
})


module.exports = router