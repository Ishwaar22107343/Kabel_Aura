import React from 'react';

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