import React from 'react';

const NoteCard= ({ title, description, onClick }) => {
  return (
    <div className="note-card" onClick={onClick}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default NoteCard;
