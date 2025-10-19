import React from 'react';

const jobs = [
  {
    id: 'api-challenge',
    company: 'TechCorp',
    jobTitle: 'Backend API Developer',
    description: 'Design a robust API for analytics.',
    tags: ['Recommended', 'Remote'],
    sprint: {
      name: 'API Design Sprint',
      details: 'A 1-page PDF document outlining the endpoint paths, request/response models, and status codes.'
    }
  },
  {
    id: 'frontend-challenge',
    company: 'Webify',
    jobTitle: 'Frontend Dashboard Engineer',
    description: 'Create a modern dashboard interface for business analytics.',
    tags: ['Urgent'],
    sprint: {
      name: 'Frontend Dashboard Sprint',
      details: 'React component library and demo page.'
    }
  }
];

export default function JobListings({ onApply }) {
  return (
    <div className="main-content">
      <h2 style={{ marginBottom: '32px' }}>Job Offers</h2>
      <div style={{ marginBottom: '24px', color: '#888', fontSize: '1rem', background: '#fffbe6', borderRadius: '8px', padding: '12px' }}>
        <strong>Interview Tip:</strong> Before you accept a sprint, review the deliverables and prepare a short pitch about your skills!
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {jobs.map(job => (
          <li key={job.id} className="card">
            <div style={{ flex: 1 }}>
              <div style={{ color: '#FF9800', fontWeight: 700, fontSize: '1.1rem' }}>{job.company}</div>
              <h3 style={{ margin: '4px 0 0 0' }}>{job.jobTitle}</h3>
              <p style={{ margin: '8px 0 0 0' }}>{job.description}</p>
              <div style={{ marginTop: '8px', marginBottom: '8px' }}>
                {job.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <button
                className="button-primary"
                style={{ width: '120px', marginTop: '16px' }}
                onClick={() => onApply(job)}
              >
                Apply
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}