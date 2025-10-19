import React from 'react';

const steps = [
  { label: 'Sprint Invitation', complete: true },
  { label: 'Submit Resume', complete: true },
  { label: 'Earn Badge', complete: true }
];

export default function ProgressStepper() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', padding: '0 0 0 4px' }}>
      {steps.map((step, idx) => (
        <React.Fragment key={step.label}>
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center'
          }}>
            <div style={{
              background: step.complete ? '#FF9800' : '#ececec',
              color: step.complete ? '#fff' : '#888',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '1.3rem',
              marginBottom: '6px'
            }}>
              {step.complete ? '✓' : idx + 1}
            </div>
            <span style={{
              fontSize: '1rem',
              color: step.complete ? '#FF9800' : '#888',
              fontWeight: step.complete ? 700 : 400,
              padding: '0 8px'
            }}>{step.label}</span>
          </div>
          {idx < steps.length - 1 && (
            <div style={{
              width: '64px',
              height: '5px',
              background: steps[idx + 1].complete ? '#FF9800' : '#ececec',
              margin: '0 10px',
              borderRadius: '2px'
            }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}