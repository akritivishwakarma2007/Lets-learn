const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: {
    type: [{ type: String, required: true }],
    validate: [arrayLimit, 'Options must have at least 2 items'],
  },
  correctAnswer: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return this.options.includes(value);
      },
      message: 'Correct answer must be one of the options',
    },
  },
  explanation: { type: String },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium',
  },
});

function arrayLimit(val) {
  return val.length >= 2;
}

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  language: { type: String, required: true },
  level: { type: String, required: true },
  questions: [questionSchema],
  associatedNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Quiz', QuizSchema);
