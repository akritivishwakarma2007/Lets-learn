import React from 'react';
import '../styles/OAuth.css';

const OAuthButtons= ({
  onGoogleLogin,
  onGitHubLogin,
}) => {
  return (
    <div className="oauth-buttons">
      <button className="oauth-button google" onClick={onGoogleLogin}>
        <img src="/google-icon.svg" alt="Google Icon" />
        Sign in with Google
      </button>
      <button className="oauth-button github" onClick={onGitHubLogin}>
        <img src="/github-icon.svg" alt="GitHub Icon" />
        Sign in with GitHub
      </button>
    </div>
  );
};

export default OAuthButtons;
