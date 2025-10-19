import React from 'react';

const navItems = [
  { key: 'submit', label: 'Submit Resume' },
  { key: 'jobs', label: 'Job Offers' },
  { key: 'sprint', label: 'Sprint Invitation' },
  { key: 'profile', label: 'Profile / Badges' },
];

const Sidebar = ({ active, setActive }) => (
  <aside className="sidebar">
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
