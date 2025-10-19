// --- FILE: frontend/src/components/JobListings.jsx ---
import React from 'react';

// This component's ONLY job is to show the list of available jobs.
export default function JobListings({ jobs, onSelectJob }) {
  if (!jobs || jobs.length === 0) {
    return <div className="main-content"><h2>No Job Offers Available</h2><p>Please check your database to make sure the 'sprints' collection has data.</p></div>;
  }

  return (
    <div className="main-content">
      <h2 style={{ marginBottom: '32px' }}>Your Job Matches</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {jobs.map(job => (
          // When a user clicks this card, it tells App.jsx to show the Invitation Screen
          <li key={job.id} className="card" onClick={() => onSelectJob(job)}>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#FF9800', fontWeight: 700, fontSize: '1.1rem' }}>{job.company}</div>
              <h3 style={{ margin: '4px 0 0 0' }}>{job.jobTitle}</h3>
              <p style={{ margin: '8px 0 0 0' }}>{job.description}</p>
            </div>
            <div style={{ fontSize: '2rem', color: '#FF9800', fontWeight: 'bold' }}>&rarr;</div>
          </li>
        ))}
      </ul>
    </div>
  );
}