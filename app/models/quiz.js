// Data base to store the questions and answers.
const mongoose = require('mongoose')

const questionSchema = require('./question.js')

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    questions: [questionSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model('Quiz', quizSchema)

