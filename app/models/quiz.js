// Data base to store the questions and answers.
const mongoose = require('mongoose')

const quizSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },

    answerOne: {
        type: String,
        required: true
    },

    answerTwo: {
        type: String
    },

    answerThree: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Quiz', quizSchema)

