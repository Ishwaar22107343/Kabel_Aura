// --- FILE: frontend/src/components/ClarityScore.jsx ---
import React, { useState, useEffect } from 'react';

// SUPERVISOR'S NOTE: Size increased for more impact, as requested.
const ClarityScore = ({ score, reason }) => {
  const [offset, setOffset] = useState(440); // Start with the circle empty

  const size = 160; // BIGGER
  const strokeWidth = 12;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const progressOffset = ((100 - score) / 100) * circumference;
    const timer = setTimeout(() => setOffset(progressOffset), 100);
    return () => clearTimeout(timer);
  }, [score, circumference]);

  const circleStyle = {
    strokeDasharray: circumference,
    strokeDashoffset: offset,
    transition: 'stroke-dashoffset 1.2s cubic-bezier(0.65, 0, 0.35, 1)', // Smoother animation
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: size, height: size, marginBottom: '16px' }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle stroke="#e6e6e6" fill="transparent" strokeWidth={strokeWidth} r={radius} cx={center} cy={center} />
          <circle stroke="#FF9800" fill="transparent" strokeWidth={strokeWidth} strokeLinecap="round" r={radius} cx={center} cy={center} style={circleStyle} transform={`rotate(-90 ${center} ${center})`} />
        </svg>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: '700', color: '#222' }}>
          {score}%
        </div>
      </div>
      {/* SUPERVISOR'S NOTE: Displaying the dynamic reason from Firestore */}
      <p className="clarity-subtext">Clarity Score based on {reason}.</p>
    </div>
  );
};

export default ClarityScore;