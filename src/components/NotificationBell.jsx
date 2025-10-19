import React from 'react';

export default function NotificationBell({ count, onClick }) {
  return (
    <div style={{ position: 'relative', cursor: 'pointer' }} onClick={onClick}>
      <span role="img" aria-label="notifications" style={{ fontSize: '2rem' }}>🔔</span>
      {count > 0 && (
        <span style={{
          position: 'absolute',
          top: 0,
          right: 0,
          background: '#FF9800',
          color: '#fff',
          borderRadius: '50%',
          minWidth: 20,
          height: 20,
          fontWeight: 700,
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {count}
        </span>
      )}
    </div>
  );
}