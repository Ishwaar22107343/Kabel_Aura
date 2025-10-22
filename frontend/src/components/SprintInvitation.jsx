import React from 'react';

export default function SprintInvitation({ sprint, onAccept }) {
  if (!sprint) {
    return (
      <div className="main-content">
        <h2>No Sprint Selected</h2>
        <p>Please go back to Job Offers and select a sprint.</p>
      </div>
    );
  }

  return (
    <div className="main-content">
      <h2 style={{ marginBottom: '20px' }}>{sprint.sprint.name}</h2>
      <div style={{ color: '#FF9800', fontWeight: 500, marginBottom: '12px' }}>For {sprint.company}</div>
      
      <div style={{marginTop: '30px', marginBottom: '30px'}}>
        <h3 style={{borderBottom: '2px solid #eee', paddingBottom: '8px'}}>The Challenge</h3>
        <p>{sprint.description}</p>
      </div>
      
      <div style={{marginTop: '30px', marginBottom: '30px'}}>
        <h3 style={{borderBottom: '2px solid #eee', paddingBottom: '8px'}}>Deliverables</h3>
        <p>{sprint.sprint.details}</p>
      </div>
      
      <button className="button-primary" onClick={onAccept}>
        Accept & Begin Sprint
      </button>
    </div>
  );
}