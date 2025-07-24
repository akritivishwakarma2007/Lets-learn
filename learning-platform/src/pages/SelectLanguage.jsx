import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useLearningStore from '../store/useLearningStore';
import '../styles/Selection.css';

const SelectLanguage= () => {
  const { t } = useTranslation();
  const { selectedLanguage, setSelectedLanguage } = useLearningStore();
  const navigate = useNavigate();

  const languages = [
    'Python',
    'C++',
    'C',
    'Java',
    'DSA',
  ];

  useEffect(() => {
    // Pre-select language if already in store
    if (selectedLanguage) {
      setSelectedLanguage(selectedLanguage);
    }
  }, [selectedLanguage, setSelectedLanguage]);

  const handleSelectLanguage = (lang) => {
    setSelectedLanguage(lang);
  };

  const handleNext = () => {
    if (selectedLanguage) {
      console.log('Selected Language:', selectedLanguage);
      navigate('/select-level');
    } else {
      alert('Please select a language.');
    }
  };

  return (
    <div className="selection-container">
      <h2>{t('selectYourLanguage')}</h2>
      <div className="selection-options">
        {languages.map((lang) => (
          <div
            key={lang}
            className={`selection-option-card ${selectedLanguage === lang ? 'selected' : ''}`}
            onClick={() => setSelectedLanguage(lang)}
          >
            <h3>{lang}</h3>
          </div>
        ))}
      </div>
      <div className="selection-buttons">
        <button className="next-button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default SelectLanguage;
