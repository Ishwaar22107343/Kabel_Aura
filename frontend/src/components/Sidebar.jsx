// --- FILE: frontend/src/components/Sidebar.jsx ---
import React from 'react';

// SUPERVISOR'S NOTE: A simplified, focused navigation.
const navItems = [
  { key: 'jobs', label: 'Job Offers' },
  { key: 'profile', label: 'My Profile' },
];

const Sidebar = ({ active, setActive }) => (
  <aside className="sidebar">
    <div className="sidebar-logo">AURA</div>
    <nav className="sidebar-nav">
      {navItems.map(item => (
        <div
          key={item.key}
          className={`sidebar-nav-item${active === item.key ? ' active' : ''}`}
          onClick={() => setActive(item.key)}
        >
          {item.label}
        </div>
      ))}
    </nav>
  </aside>
);

export default Sidebar;