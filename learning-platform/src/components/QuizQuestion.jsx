import React from 'react';

const QuizQuestion= ({
  question,
  options,
  selectedOption,
  onSelectOption,
  showFeedback,
  correctAnswer,
}) => {
  return (
    <div className="quiz-question-card">
      <h3>{question}</h3>
      <div className="quiz-options">
        {options.map((option, index) => {
          const isSelected = selectedOption === option;
          const isCorrect = showFeedback && option === correctAnswer;
          const isIncorrect = showFeedback && isSelected && option !== correctAnswer;

          return (
            <button
              key={index}
              className={`quiz-option-button ${isSelected ? 'selected' : ''} ${isCorrect ? 'correct' : ''} ${isIncorrect ? 'incorrect' : ''}`}
              onClick={() => onSelectOption(option)}
              disabled={showFeedback}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizQuestion;
