const mongoose = require('mongoose')

const Schema = mongoose.Schema 

const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },

    rightAnswer: {
        type: String,
        required: true
    },

    wrongAnswerOne: {
        type: String
    },

    wrongAnswerTwo: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = questionSchema