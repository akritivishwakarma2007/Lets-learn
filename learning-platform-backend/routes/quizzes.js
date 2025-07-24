const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get quizzes by language and level
router.get('/filter', async (req, res) => {
  const { language, level } = req.query;
  try {
    const quizzes = await Quiz.find({ language, level });
    res.json(quizzes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add a new quiz (Admin only - authentication middleware needed)
router.post('/', async (req, res) => {
  const { title, language, level, questions, associatedNotes } = req.body;
  try {
    const newQuiz = new Quiz({
      title,
      language,
      level,
      questions,
      associatedNotes,
    });
    const quiz = await newQuiz.save();
    res.json(quiz);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
