import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import useLearningStore from '../store/useLearningStore';
import { useTranslation } from 'react-i18next';
import '../styles/Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard= () => {
  const { t } = useTranslation();
  const { quizProgress } = useLearningStore();

  // Calculate overall stats
  let totalQuestions = 0;
  let attemptedQuestions = 0;
  let correctAnswers = 0;

  const quizScores= [];

  Object.values(quizProgress).forEach((quiz) => {
    totalQuestions += quiz.total;
    attemptedQuestions += quiz.total; // Assuming all questions in a quiz are attempted once started
    correctAnswers += quiz.correct;
    // For line chart, assuming quiz.date is available or using a mock date
    quizScores.push({ date: `Quiz ${quiz.id}`, score: quiz.score });
  });

  const accuracy = attemptedQuestions > 0 ? ((correctAnswers / attemptedQuestions) * 100).toFixed(2) : '0.00';

  // Bar Chart Data
  const barChartData = {
    labels: ['Correct', 'Incorrect'],
    datasets: [
      {
        label: 'Answers',
        data: [correctAnswers, attemptedQuestions - correctAnswers],
        backgroundColor: ['#28a745', '#dc3545'],
        borderColor: ['#28a745', '#dc3545'],
        borderWidth: 1,
      },
    ],
  };

  // Line Chart Data
  const lineChartData = {
    labels: quizScores.map(score => score.date),
    datasets: [
      {
        label: 'Quiz Score (%)',
        data: quizScores.map(score => score.score),
        fill: false,
        borderColor: '#007bff',
        tension: 0.1,
      },
    ],
  };

  const lineChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Your Learning Dashboard</h2>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Questions</h3>
          <p>{totalQuestions}</p>
        </div>
        <div className="stat-card">
          <h3>Attempted Questions</h3>
          <p>{attemptedQuestions}</p>
        </div>
        <div className="stat-card">
          <h3>Correct Answers</h3>
          <p>{correctAnswers}</p>
        </div>
        <div className="stat-card">
          <h3>Accuracy</h3>
          <p>{accuracy}%</p>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="chart-card">
          <h3>Performance (Correct vs. Incorrect)</h3>
          <Bar data={barChartData} />
        </div>
        <div className="chart-card">
          <h3>Progress Over Time</h3>
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
      </div>

      <div className="dashboard-section">
        <h3>Recent Quiz History</h3>
        {Object.keys(quizProgress).length > 0 ? (
          Object.entries(quizProgress).map(([quizId, quiz]) => (
            <div key={quizId} className="quiz-history-item">
              <h4>Quiz ID: {quizId}</h4>
              <p>Score: {quiz.score.toFixed(2)}% ({quiz.correct}/{quiz.total})</p>
              {/* Link to revisit quiz or notes */}
            </div>
          ))
        ) : (
          <p>No quiz history available. Complete some quizzes to see your progress!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
