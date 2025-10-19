// --- FILE: frontend/src/App.jsx ---
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import SubmitResume from './components/SubmitResume';
import JobListings from './components/JobListings';
import InvitationScreen from './components/InvitationScreen'; // Our new star component
import SprintInvitation from './components/SprintInvitation'; // This is now the "Briefing"
import Profile from './components/Profile';

// SUPERVISOR'S NOTE: Using your user, as requested. No more Alex Dragon.
const CURRENT_USER = 'ishwaar';

function App() {
  const [activeScene, setActiveScene] = useState('jobs');
  const [sprints, setSprints] = useState([]);
  const [profile, setProfile] = useState(null);
  const [selectedSprint, setSelectedSprint] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      //... (This part is the same as before, no changes needed)
      setIsLoading(true);
      setError(null);
      try {
        const API_URL = import.meta.env.VITE_API_BASE_URL;
        const [sprintsRes, profileRes] = await Promise.all([
        fetch(`${API_URL}/api/sprints`),
        fetch(`${API_URL}/api/users/${CURRENT_USER}/profile`)
      ]);
        if (!sprintsRes.ok || !profileRes.ok) throw new Error('Network response was not ok');
        const sprintsData = await sprintsRes.json();
        const profileData = await profileRes.json();
        setSprints(sprintsData);
        setProfile(profileData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // --- NEW, CORRECTED JOURNEY FUNCTIONS ---

  const handleSelectJob = (job) => {
    setSelectedSprint(job);
    setActiveScene('invitation'); // Go to the beautiful invitation screen
  };

  const handleAcceptInvitation = () => {
    setActiveScene('briefing'); // Go to the challenge details
  };

  const handleDeclineInvitation = () => {
    setSelectedSprint(null);
    setActiveScene('jobs'); // Go back to the job list
  };

  const handleSubmitAccepted = () => {
    setActiveScene('submit'); // Go to the submission form
  };

  const handleSubmissionSuccess = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/${CURRENT_USER}/profile`);
      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      
      // We now explicitly set the scene to 'profile' AFTER the data is loaded.
      setActiveScene('profile'); 

    } catch (error) {
      console.error("Failed to refetch profile after submission:", error);
      setActiveScene('profile'); // Still navigate even if fetch fails
    }
  };
  
  // This function is for the sidebar clicks
  const navigateToScene = (scene) => {
    setSelectedSprint(null); // Reset any selected sprint
    setActiveScene(scene);
  }

  const renderScene = () => {
    if (isLoading) return <div className="main-content"><h2>Loading Aura...</h2></div>;
    if (error) return <div className="main-content" style={{ color: 'red' }}><h2>Error: {error}</h2><p>Please ensure your backend server is running.</p></div>;

    // SUPERVISOR'S NOTE: This logic now determines the stepper's state.
    const sceneOrder = ['jobs', 'invitation', 'briefing', 'submit', 'profile'];
    const currentSceneIndex = sceneOrder.indexOf(activeScene);
    const stepStatus = {
        acceptComplete: currentSceneIndex >= 2, // 'briefing' or later
        submitComplete: currentSceneIndex >= 4, // 'profile'
        verifyComplete: currentSceneIndex >= 4, // 'profile'
    };

    switch (activeScene) {
      case 'jobs':
        return <JobListings jobs={sprints} onSelectJob={handleSelectJob} />;
      case 'invitation':
        return <InvitationScreen job={selectedSprint} onAccept={handleAcceptInvitation} onDecline={handleDeclineInvitation} />;
      case 'briefing':
        return <SprintInvitation sprint={selectedSprint} onAccept={handleSubmitAccepted} />;
      case 'submit':
        // Pass the status to the stepper on the submit page too
        return <SubmitResume sprint={selectedSprint} onSuccess={handleSubmissionSuccess} stepStatus={stepStatus} />;
      case 'profile':
        // Pass the final status to the stepper on the profile page
        return <Profile profile={profile} stepStatus={stepStatus} />;
      default:
        return <h2>Unknown Scene</h2>;
    }
  };

  return (
    <div>
      {/* The header can be removed if the sidebar is permanent */}
      <Sidebar active={activeScene} setActive={navigateToScene} />
      {renderScene()}
    </div>
  );
}

export default App;