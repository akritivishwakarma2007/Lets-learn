import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useLearningStore from '../store/useLearningStore';
import '../styles/Selection.css';

const SelectLevel= () => {
  const { t } = useTranslation();
  const { selectedLevel, setSelectedLevel } = useLearningStore();
  const navigate = useNavigate();

  const levels = [
    'Beginner',
    'Intermediate',
    'Advanced',
  ];

  useEffect(() => {
    // Pre-select level if already in store
    if (selectedLevel) {
      setSelectedLevel(selectedLevel);
    }
  }, [selectedLevel, setSelectedLevel]);

  const handleSelectLevel = (level) => {
    setSelectedLevel(level);
  };

  const handleNext = () => {
    if (selectedLevel) {
      console.log('Selected Level:', selectedLevel);
      navigate('/notes');
    } else {
      alert('Please select a level.');
    }
  };

  const handleBack = () => {
    navigate('/select-language');
  };

  return (
    <div className="selection-container">
      <h2>{t('selectYourLevel')}</h2>
      <div className="selection-options">
        {levels.map((level) => (
          <div
            key={level}
            className={`selection-option-card ${selectedLevel === level ? 'selected' : ''}`}
            onClick={() => setSelectedLevel(level)}
          >
            <h3>{level}</h3>
          </div>
        ))}
      </div>
      <div className="selection-buttons">
        <button className="back-button" onClick={handleBack}>
          Back
        </button>
        <button className="next-button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default SelectLevel;
