
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import '.styles/App.css'; // Keep this for now, will be replaced by global styles
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import SelectLanguage from './pages/SelectLanguage';
import SelectLevel from './pages/SelectLevel';
import Notes from './pages/Notes';
import Quiz from './pages/Quiz';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import AdminPanel from './pages/AdminPanel';

function App() {
  const [theme, setTheme] = useState('light');
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>{t('welcome')}</h1>
          <button onClick={toggleTheme}>{t('toggleTheme')}</button>
          <div className="language-switcher">
            <button onClick={() => changeLanguage('en')}>English</button>
            <button onClick={() => changeLanguage('es')}>Español</button>
          </div>
          <nav>
            <Link to="/register">{t('register')}</Link> |{' '}
            <Link to="/login">{t('login')}</Link> |{' '}
            <Link to="/select-language">{t('selectLanguage')}</Link> |{' '}
            <Link to="/select-level">{t('selectLevel')}</Link> |{' '}
            <Link to="/notes">{t('notes')}</Link> |{' '}
            <Link to="/quiz">{t('quiz')}</Link> |{' '}
            <Link to="/dashboard">{t('dashboard')}</Link> |{' '}
            <Link to="/profile">{t('userProfile')}</Link> |{' '}
            <Link to="/admin">{t('adminPanel')}</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/select-language" element={<SelectLanguage />} />
            <Route path="/select-level" element={<SelectLevel />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/" element={<Login />} /> {/* Default route */}
          </Routes>
          

        </main>
      </div>
    </Router>
  );
}

export default App;
