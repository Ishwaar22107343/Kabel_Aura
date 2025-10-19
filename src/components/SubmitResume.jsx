import React, { useState } from 'react';

export default function SubmitResume({ onSuccess }) {
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = e => setFile(e.target.files[0]);
  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    if (onSuccess) onSuccess();
  };

  return (
    <div className="main-content">
      <h2 style={{ marginBottom: '32px' }}>Submit Your Resume</h2>
      <div style={{ marginBottom: '24px', color: '#888', fontSize: '1rem', background: '#fffbe6', borderRadius: '8px', padding: '12px' }}>
        <strong>Interview Tip:</strong> Double-check your PDF for clarity. Summarise your solution and why you chose it.
      </div>
      {submitted ? (
        <div style={{ color: 'green', fontWeight: 500, marginTop: '24px' }}>
          Submission received and skill verified!
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: '12px' }}>
            Upload your PDF:
            <input type="file" accept="application/pdf" onChange={handleFileChange} style={{ marginLeft: '12px' }} />
          </label>
          <button
            type="submit"
            className="button-primary"
            disabled={!file}
          >
            Submit Resume
          </button>
        </form>
      )}
    </div>
  );
}
