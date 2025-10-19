// --- FILE: frontend/src/components/InvitationScreen.jsx ---
import React from 'react';
import ClarityScore from './ClarityScore';

export default function InvitationScreen({ job, onAccept, onDecline }) {
  return (
    <div className="main-content">
      <button onClick={onDecline} className="back-button">
        &larr; Back to Job Offers
      </button>
      <div className="job-invitation-layout">
        <div className="clarity-score-column">
          <h1 className="invitation-header">You're a strong match.</h1>
          {/* SUPERVISOR'S NOTE: Passing the dynamic reason from the job object */}
          <ClarityScore score={78} reason={job.clarityReason} />
        </div>
        <div className="job-details-column">
          <div style={{ color: '#888', fontWeight: 500 }}>{job.company}</div>
          <h2 className="job-title-header">{job.jobTitle}</h2>
          <p className="invitation-paragraph">
            This isn't another dead-end application. Your profile stands out. Instead of a screening call, {job.company} invites you to prove your skills directly with a short Skill Sprint.
          </p>
          <button
            className="button-primary button-accept"
            onClick={() => onAccept(job)}
          >
            I'm Ready. Start the Sprint.
          </button>
          <a href="#" className="secondary-action">No thanks, I'll apply the old way.</a>
        </div>
      </div>
    </div>
  );
}