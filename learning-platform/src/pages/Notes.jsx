import React, { useState} from 'react';
import NoteCard from '../components/NoteCard';
import MarkdownRenderer from '../components/MarkdownRenderer';
import useLearningStore from '../store/useLearningStore';
import useFetch from '../hooks/useFetch';
import { useTranslation } from 'react-i18next';
import '../styles/Notes.css';

const Notes= () => {
  const { t } = useTranslation();
  const { selectedLanguage, selectedLevel } = useLearningStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);

  const apiUrl = selectedLanguage && selectedLevel
    ? `/api/notes/filter?language=${selectedLanguage}&level=${selectedLevel}`
    : '/api/notes'; // Fallback to all notes if no selection

  const { data: fetchedNotes, loading, error } = useFetch(apiUrl, [selectedLanguage, selectedLevel]);

  const notesToDisplay = fetchedNotes ? fetchedNotes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  const handleCloseModal = () => {
    setSelectedNote(null);
  };

  if (loading) {
    return <div className="notes-container">{t('loadingNotes')}</div>;
  }

  if (error) {
    return <div className="notes-container" style={{ color: 'red' }}>{t('errorLoadingNotes', { error: error })}</div>;
  }

  if (!selectedLanguage || !selectedLevel) {
    return (
      <div className="notes-container">
        <h2>{t('selectLanguageLevelToViewNotes')}</h2>
        <p>{t('youCanDoThisFrom')} <a href="/select-language">{t('selectLanguage')}</a> {t('and')} <a href="/select-level">{t('selectLevel')}</a> {t('pages')}.</p>
      </div>
    );
  }

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h2>{t('notesFor')} {selectedLanguage} - {selectedLevel}</h2>
        <input
          type="text"
          placeholder={t('searchNotes')}
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="notes-grid">
        {notesToDisplay.length > 0 ? (
          notesToDisplay.map((note) => (
            <NoteCard
              key={note._id}
              title={note.title}
              description={note.description || t('noDescriptionAvailable')} // Use description from backend or default
              onClick={() => handleNoteClick(note)}
            />
          ))
        ) : (
          <p>{t('noNotesFound')} {selectedLanguage} - {selectedLevel}.</p>
        )}
      </div>
      <button className="start-quiz-button">{t('startQuiz')}</button>

      {selectedNote && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-button" onClick={handleCloseModal}>&times;</button>
            <h3>{selectedNote.title}</h3>
            <MarkdownRenderer content={selectedNote.content} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
