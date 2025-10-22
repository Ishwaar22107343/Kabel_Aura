import React from 'react';

const steps = [
  { id: 'accept', label: 'Accept Invitation' },
  { id: 'submit', label: 'Submit Work' },
  { id: 'verify', label: 'Get Verified' },
];

export default function ProgressStepper({ acceptComplete, submitComplete, verifyComplete }) {
  const completions = [acceptComplete, submitComplete, verifyComplete];
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', padding: '0 0 0 4px' }}>
      {steps.map((step, idx) => {
        const complete = completions[idx];
        return (
          <React.Fragment key={step.id}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ background: complete ? '#FF9800' : '#ececec', color: complete ? '#fff' : '#888', border: complete ? '2px solid #e68900' : '2px solid #ddd', borderRadius: '50%', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.3rem', marginBottom: '6px', transition: 'all 0.4s ease' }}>
                {complete ? '✓' : idx + 1}
              </div>
              <span style={{ fontSize: '1rem', color: complete ? '#FF9800' : '#888', fontWeight: complete ? 700 : 400, padding: '0 8px', transition: 'all 0.4s ease' }}>
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div style={{ flex: 1, maxWidth: '64px', height: '5px', background: completions[idx+1] ? '#FF9800' : '#ececec', margin: '0 10px', borderRadius: '2px', alignSelf: 'flex-start', marginTop: '16px', transition: 'background 0.4s ease' }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}