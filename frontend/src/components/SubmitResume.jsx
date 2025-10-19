// --- FILE: frontend/src/components/SubmitResume.jsx ---
import React, { useState } from 'react';
import ProgressStepper from './ProgressStepper';

export default function SubmitResume({ sprint, onSuccess, stepStatus }) {
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = e => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !sprint) return;
    setIsSubmitting(true);
    setError('');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('username', 'ishwaar');
    formData.append('company', sprint.company);
    formData.append('title', sprint.sprint.name);

    try {
      // SUPERVISOR'S NOTE: This is the corrected line.
      // My placeholder "{ ... }" was the mistake. This is the real code.
      const API_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${API_URL}/api/sprints/${sprint.id}/submit`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.detail || 'An unknown error occurred.');
      
      if (onSuccess) await onSuccess();

    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="main-content">
      <ProgressStepper {...stepStatus} />
      <h2 style={{ marginBottom: '32px', marginTop: '48px' }}>Submit Your Work</h2>
      <div style={{ marginBottom: '24px', color: '#888', fontSize: '1rem', background: '#fffbe6', borderRadius: '8px', padding: '12px' }}>
        <strong>Deliverable:</strong> {sprint?.sprint?.details || 'A PDF of your work.'}
      </div>
      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginBottom: '12px' }}>
          Upload your PDF:
          <input type="file" accept="application/pdf" onChange={handleFileChange} style={{ marginLeft: '12px' }} required />
        </label>
        <button type="submit" className="button-primary" disabled={!file || isSubmitting}>
          {isSubmitting ? 'Verifying...' : 'Submit and Get Verified'}
        </button>
        {error && <div style={{ color: 'red', marginTop: '12px' }}>Error: {error}</div>}
      </form>
    </div>
  );
}