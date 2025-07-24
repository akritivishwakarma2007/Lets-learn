import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useLearningStore from '../store/useLearningStore';
import '../styles/UserProfile.css';

const UserProfile= () => {
  const { t } = useTranslation();
  const { selectedLanguage, selectedLevel, setSelectedLanguage, setSelectedLevel, quizProgress } = useLearningStore();

  const [currentLanguage, setCurrentLanguage] = useState(selectedLanguage);
  const [currentLevel, setCurrentLevel] = useState(selectedLevel);

  useEffect(() => {
    setCurrentLanguage(selectedLanguage);
    setCurrentLevel(selectedLevel);
  }, [selectedLanguage, selectedLevel]);

  const languages = [
    'Python',
    'C++',
    'C',
    'Java',
    'DSA',
  ];

  const levels = [
    'Beginner',
    'Intermediate',
    'Advanced',
  ];

  const handleUpdatePreferences = (e) => {
    e.preventDefault();
    setSelectedLanguage(currentLanguage);
    setSelectedLevel(currentLevel);
    alert(t('preferencesUpdated'));
  };

  // Mock badges for now
  const userBadges = ['Beginner Coder', 'Python Enthusiast'];

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>{t('userProfile')}</h2>
      </div>

      <div className="profile-section">
        <h3>{t('personalInformation')}</h3>
        <div className="profile-info">
          <p>{t('username')}: <span>User123</span></p>
          <p>{t('email')}: <span>user@example.com</span></p>
        </div>
      </div>

      <div className="profile-section">
        <h3>{t('learningPreferences')}</h3>
        <form onSubmit={handleUpdatePreferences} className="profile-form">
          <div className="form-group">
            <label htmlFor="language-select">{t('selectLanguage')}:</label>
            <select
              id="language-select"
              value={currentLanguage || ''}
              onChange={(e) => setCurrentLanguage(e.target.value)}
            >
              <option value="">{t('select')}</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="level-select">{t('selectLevel')}:</label>
            <select
              id="level-select"
              value={currentLevel || ''}
              onChange={(e) => setCurrentLevel(e.target.value)}
            >
              <option value="">{t('select')}</option>
              {levels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="form-submit-button">{t('updatePreferences')}</button>
        </form>
      </div>

      <div className="profile-section">
        <h3>{t('quizHistory')}</h3>
        <div className="profile-quiz-history">
          {Object.keys(quizProgress).length > 0 ? (
            Object.entries(quizProgress).map(([quizId, quiz]) => (
              <div key={quizId} className="quiz-history-item">
                <h4>{t('quizId')}: {quizId}</h4>
                <p>{t('score')}: {quiz.score.toFixed(2)}% ({quiz.correct}/{quiz.total})</p>
                {/* Add more details like date, link to quiz, etc. */}
              </div>
            ))
          ) : (
            <p>{t('noQuizHistory')}</p>
          )}
        </div>
      </div>

      <div className="profile-section">
        <h3>{t('badges')}</h3>
        <div className="profile-badges">
          {userBadges.length > 0 ? (
            <ul>
              {userBadges.map((badge, index) => (
                <li key={index}>{badge}</li>
              ))}
            </ul>
          ) : (
            <p>{t('noBadgesYet')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
