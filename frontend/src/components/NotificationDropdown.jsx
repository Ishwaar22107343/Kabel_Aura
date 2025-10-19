import React from 'react';

export default function NotificationDropdown({ notifications }) {
  return (
    <div style={{
      position: 'absolute',
      top: '48px',
      right: '32px',
      background: '#fff',
      border: '1px solid #ececec',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(34,34,34,0.08)',
      minWidth: '220px',
      zIndex: 1000,
      padding: '12px'
    }}>
      <strong style={{ fontSize: '1rem', color: '#222' }}>Notifications</strong>
      <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0 0' }}>
        {notifications.length === 0 ? (
          <li style={{ color: '#888', fontSize: '0.95rem' }}>No notifications yet.</li>
        ) : (
          notifications.map(n => (
            <li key={n.id} style={{ marginBottom: '8px', fontSize: '0.98rem', color: '#222' }}>
              {n.message}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}