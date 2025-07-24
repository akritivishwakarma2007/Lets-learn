import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminPanel.css';

const AdminPanel= () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>{t('adminPanel')}</h2>
      </div>

      <div className="admin-sections">
        <div className="admin-section-card" onClick={() => handleNavigation('/admin/users')}>
          <h3>{t('manageUsers')}</h3>
          <p>{t('manageUsersDescription')}</p>
        </div>
        <div className="admin-section-card" onClick={() => handleNavigation('/admin/notes')}>
          <h3>{t('manageNotes')}</h3>
          <p>{t('manageNotesDescription')}</p>
        </div>
        <div className="admin-section-card" onClick={() => handleNavigation('/admin/quizzes')}>
          <h3>{t('manageQuizzes')}</h3>
          <p>{t('manageQuizzesDescription')}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
