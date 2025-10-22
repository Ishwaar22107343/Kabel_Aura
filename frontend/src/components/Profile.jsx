import React from 'react';
import ProgressStepper from './ProgressStepper';
import { useTilt } from '../hooks/useTilt';

const SkillBadge = ({ skill }) => {
  const tiltRef = useTilt();
  return (
    <li ref={tiltRef} className="card tilt-card" style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ background: '#FF9800', color: '#fff', borderRadius: '50%', minWidth: '40px', height: '40px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginRight: '16px', fontSize: '1.2rem' }}>✓</span>
      <span>
        <strong>{skill.sprintName}</strong> for {skill.companyName} <br />
        <small style={{ color: '#555' }}>Verified on {new Date(skill.issuedOn).toLocaleDateString()}</small>
      </span>
    </li>
  );
};

export default function Profile({ profile, stepStatus }) {
  if (!profile) return <div className="main-content"><h2>Loading Profile...</h2></div>;

  return (
    <div className="main-content">
      <ProgressStepper {...stepStatus} />
      {/* ... The rest of your profile file is IDENTICAL to before ... */}
      <h2 style={{ marginBottom: '32px', marginTop: '48px' }}>Your Profile</h2>
      <div style={{ marginBottom: '20px', paddingLeft: '4px', lineHeight: '1.6' }}>
        <strong>Name:</strong> {profile.name}<br />
        <strong>Email:</strong> {profile.email}<br />
        <strong>Headline:</strong> {profile.headline}
      </div>
      <h3 style={{ marginBottom: '24px', paddingLeft: '4px' }}>Verified Skills & Badges</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {profile.verified_skills && profile.verified_skills.length > 0 ? (
          profile.verified_skills.map((skill, index) => (
            <SkillBadge key={skill.sprintId + index} skill={skill} />
          ))
        ) : (
          <div className="card" style={{ textAlign: 'center', border: '2px dashed #ddd', background: '#fafafa' }}>
            <p>No badges earned yet. Complete a Skill Sprint to get your first one!</p>
          </div>
        )}
      </ul>
    </div>
  );
}