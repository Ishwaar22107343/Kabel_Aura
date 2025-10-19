import React from 'react';

export default function SprintInvitation({ sprint, onAccept }) {
  if (!sprint) return <div className="main-content"><h2>Select a job to view sprint details.</h2></div>;
  return (
    <div className="main-content">
      <h2 style={{ marginBottom: '20px' }}>{sprint.sprint.name}</h2>
      <div style={{ color: '#FF9800', fontWeight: 500, marginBottom: '12px' }}>{sprint.company}</div>
      <div style={{ fontWeight: 600, marginBottom: '8px' }}>{sprint.jobTitle}</div>
      <p style={{ marginBottom: '24px' }}>{sprint.sprint.details}</p>
      <button className="button-primary" onClick={onAccept}>Accept Sprint Invitation</button>
    </div>
  );
}