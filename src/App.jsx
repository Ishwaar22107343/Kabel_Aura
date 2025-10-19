import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import SubmitResume from './components/SubmitResume';
import JobListings from './components/JobListings';
import SprintInvitation from './components/SprintInvitation';
import Profile from './components/Profile';
import NotificationBell from './components/NotificationBell';
import NotificationDropdown from './components/NotificationDropdown';

function App() {
  const [activeScene, setActiveScene] = useState('jobs');
  const [selectedSprint, setSelectedSprint] = useState(null);

  // Notification state
  const [notificationCount, setNotificationCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  function handleApply(job) {
    setSelectedSprint(job);
    setActiveScene('sprint');
  }

  function handleAcceptSprint() {
    setActiveScene('submit');
  }

  function handleSubmissionSuccess() {
    setActiveScene('profile');
    setNotificationCount(prev => prev + 1);
    setNotifications(prev => [
      ...prev,
      { id: Date.now(), message: 'Your resume was submitted successfully!' }
    ]);
  }

  let MainContent;
  switch (activeScene) {
    case 'jobs':
      MainContent = <JobListings onApply={handleApply} />;
      break;
    case 'sprint':
      MainContent = (
        <SprintInvitation
          sprint={selectedSprint}
          onAccept={handleAcceptSprint}
        />
      );
      break;
    case 'submit':
      MainContent = (
        <SubmitResume
          sprint={selectedSprint}
          onSuccess={handleSubmissionSuccess}
        />
      );
      break;
    case 'profile':
      MainContent = <Profile />;
      break;
    default:
      MainContent = <JobListings onApply={handleApply} />;
  }

  return (
    <div>
      <header className="app-header" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '16px 32px', background: '#fff' }}>
        <NotificationBell count={notificationCount} onClick={() => setDropdownOpen(prev => !prev)} />
        {dropdownOpen && <NotificationDropdown notifications={notifications} />}
      </header>
      <Sidebar active={activeScene} setActive={setActiveScene} />
      {MainContent}
    </div>
  );
}

export default App;
