import React from 'react';
import ProgressStepper from './ProgressStepper';

const mockProfile = {
  userId: 'student123',
  name: 'Alex Dragon',
  email: 'alex@university.edu',
  headline: 'Aspiring Software Engineer',
  verified_skills: [
    {
      sprintId: 'techcorp-api-challenge',
      sprintName: 'API Design Sprint',
      companyName: 'TechCorp',
      issuedOn: '2023-10-27T10:00:00Z'
    }
  ]
};

export default function Profile() {
  return (
    <div className="main-content">
      <ProgressStepper />
      <h2 style={{ marginBottom: '32px' }}>Your Profile</h2>
      <div style={{ marginBottom: '20px', paddingLeft: '4px' }}>
        <strong>Name:</strong> {mockProfile.name}<br />
        <strong>Email:</strong> {mockProfile.email}<br />
        <strong>Headline:</strong> {mockProfile.headline}
      </div>
      <h3 style={{ marginBottom: '24px', paddingLeft: '4px' }}>Verified Skills & Badges</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {mockProfile.verified_skills.map(skill => (
          <li key={skill.sprintId} className="card" style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{
              background: '#FF9800',
              color: '#fff',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              marginRight: '12px'
            }}>
              ✓
            </span>
            <span>
              <strong>{skill.sprintName}</strong> @ {skill.companyName} <br />
              <small>Issued {new Date(skill.issuedOn).toLocaleDateString()}</small>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}