// Data base to store the questions and answers.
const mongoose = require('mongoose')

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
      }
}, {
    timestamps: true
})

module.exports = mongoose.model('Quiz', quizSchema)

