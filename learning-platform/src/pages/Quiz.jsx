import React, { useState, useEffect } from 'react';
import QuizQuestion from '../components/QuizQuestion';
import useLearningStore from '../store/useLearningStore';
import useFetch from '../hooks/useFetch';
import { useTranslation } from 'react-i18next';
import '../styles/Quiz.css';

const Quiz= () => {
  const { t } = useTranslation();
  const { selectedLanguage, selectedLevel, updateQuizProgress } = useLearningStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const apiUrl = selectedLanguage && selectedLevel
    ? `/api/quizzes/filter?language=${selectedLanguage}&level=${selectedLevel}`
    : null; // Don't fetch if no language/level selected

  const { data: fetchedQuizzes, loading, error } = useFetch(apiUrl, [selectedLanguage, selectedLevel]);

  const quizQuestions = fetchedQuizzes && fetchedQuizzes.length > 0 ? fetchedQuizzes[0].questions : [];
  const currentQuestion = quizQuestions[currentQuestionIndex];

  useEffect(() => {
    // Reset quiz state when language or level changes
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowFeedback(false);
    setQuizCompleted(false);
  }, [selectedLanguage, selectedLevel]);

  const handleSelectOption = (option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion._id]: option,
    }));
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizCompleted(true);
      // Calculate results and update progress
      const correctCount = quizQuestions.filter(
        (q) => selectedAnswers[q._id] === q.correctAnswer
      ).length;
      const totalQuestions = quizQuestions.length;
      const accuracy = (correctCount / totalQuestions) * 100;

      updateQuizProgress(fetchedQuizzes[0]._id, {
        score: accuracy,
        correct: correctCount,
        total: totalQuestions,
        answers: selectedAnswers,
      });

      alert(t('quizFinished', { correct: correctCount, total: totalQuestions, accuracy: accuracy.toFixed(2) }));
      // Navigate to dashboard or results page
    }
  };

  const handlePreviousQuestion = () => {
    setShowFeedback(false);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  if (loading) {
    return <div className="quiz-container">Loading quiz...</div>;
  }

  if (error) {
    return <div className="quiz-container" style={{ color: 'red' }}>Error: {error}</div>;
  }

  if (!selectedLanguage || !selectedLevel) {
    return (
      <div className="quiz-container">
        <h2>Please select a Language and Level to start a quiz.</h2>
        <p>You can do this from the <a href="/select-language">Select Language</a> and <a href="/select-level">Select Level</a> pages.</p>
      </div>
    );
  }

  if (quizQuestions.length === 0) {
    return <div className="quiz-container">No quizzes found for {selectedLanguage} - {selectedLevel}.</div>;
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>Quiz for {selectedLanguage} - {selectedLevel}</h2>
        <p>Question {currentQuestionIndex + 1} of {quizQuestions.length}</p>
      </div>
      {currentQuestion && (
        <QuizQuestion
          question={currentQuestion.questionText}
          options={currentQuestion.options}
          selectedOption={selectedAnswers[currentQuestion._id]}
          onSelectOption={handleSelectOption}
          showFeedback={showFeedback}
          correctAnswer={currentQuestion.correctAnswer}
        />
      )}
      <div className="quiz-navigation-buttons">
        <button
          className="prev-button"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <button
          className="next-button"
          onClick={handleNextQuestion}
          disabled={!selectedAnswers[currentQuestion._id] && !quizCompleted} // Disable next if no answer selected and quiz not completed
        >
          {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
