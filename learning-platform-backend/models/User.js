const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  preferences: {
    language: { type: String },
    level: { type: String },
  },
  progress: {
    completedTopics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
    completedQuizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
    // More detailed progress can be added here
  },
  badges: [{ type: String }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
