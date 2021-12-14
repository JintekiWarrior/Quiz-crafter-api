// Data base to store the questions and answers.
const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
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
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
}, {
    timestamps: true
})

module.exports = mongoose.model('Quiz', quizSchema)

