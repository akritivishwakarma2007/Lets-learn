const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get notes by language and level
router.get('/filter', async (req, res) => {
  const { language, level } = req.query;
  try {
    const notes = await Note.find({ language, level });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add a new note (Admin only - authentication middleware needed)
router.post('/', async (req, res) => {
  const { title, content, language, level, category } = req.body;
  try {
    const newNote = new Note({
      title,
      content,
      language,
      level,
      category,
    });
    const note = await newNote.save();
    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
