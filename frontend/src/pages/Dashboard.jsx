/**
 * Dashboard Page — Detection Dashboard
 * Refactored from original App.jsx. Contains upload → analyze → results flow.
 */
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { supabase } from '../supabaseClient';
import UploadZone from '../components/UploadZone';
import VideoPreview from '../components/VideoPreview';
import ResultDashboard from '../components/ResultDashboard';

const PIPELINE_STEPS = [
  'Extracting frames',
  'Detecting faces',
  'CNN analysis',
  'rPPG analysis',
  'Fusing results',
];

export default function Dashboard({ user }) {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [progressStep, setProgressStep] = useState(0);

  const handleFileSelect = useCallback((selectedFile) => {
    setFile(selectedFile);
    setResult(null);
    setError('');
    setStatus('idle');
    setProgressStep(0);
  }, []);

  const handleRemove = useCallback(() => {
    setFile(null);
    setResult(null);
    setError('');
    setStatus('idle');
    setProgressStep(0);
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!file) return;
    setStatus('analyzing');
    setResult(null);
    setError('');

    const progressInterval = setInterval(() => {
      setProgressStep((prev) => prev < PIPELINE_STEPS.length - 1 ? prev + 1 : prev);
    }, 2000);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post('http://localhost:8000/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 120000,
      });
      clearInterval(progressInterval);
      setProgressStep(PIPELINE_STEPS.length - 1);
      setResult(response.data);
      setStatus('done');
    } catch (err) {
      clearInterval(progressInterval);
      setError(err.response?.data?.detail || err.message || 'Analysis failed. Please try again.');
      setStatus('error');
    }
  }, [file]);

  const handleReset = useCallback(() => {
    setFile(null);
    setResult(null);
    setError('');
    setStatus('idle');
    setProgressStep(0);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const progressPercent = status === 'analyzing'
    ? ((progressStep + 1) / PIPELINE_STEPS.length) * 100
    : 0;

  return (
    <div className="dashboard-page">
      {/* Header */}
      <header className="nav">
        <div className="nav-logo" onClick={() => navigate('/')}>
          <div className="logo-mark">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M15,6 C13,4 9,4 7,7 C5,10 6,14 8,16 C9,17 9,19 8,21 L13,21 C14,19 15,16 16,14 C17,12 17,9 15,6 Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="4" y1="12" x2="20" y2="12" strokeWidth="0.5" opacity="0.4"/>
              <line x1="12" y1="4" x2="12" y2="20" strokeWidth="0.5" opacity="0.4"/>
              <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </div>
          <span className="logo-txt">Castellan</span>
        </div>
        <div className="nav-cta">
          <div className="badge-live"><span className="live-dot"></span>AI Engine Active</div>
          <div className="avatar">{user?.email?.slice(0, 2).toUpperCase() || 'U'}</div>
          <button className="btn-ghost" onClick={handleLogout}>Sign Out</button>
        </div>
      </header>

      {/* Dashboard content */}
      <main className="dash-wrap">
        <div className="dash-header">
          <div>
            <h1>Detection Dashboard</h1>
            <p>Real-time deepfake analysis powered by CNN + rPPG hybrid engine</p>
          </div>
        </div>

        {/* Upload */}
        {!file && status === 'idle' && (
          <div className="panel" style={{ marginBottom: '20px' }}>
            <div className="panel-title"><span className="pdot"></span>Upload Media for Analysis</div>
            <UploadZone onFileSelect={handleFileSelect} />
          </div>
        )}

        {/* Preview + Analyze */}
        {file && status === 'idle' && (
          <div className="panel" style={{ marginBottom: '20px' }}>
            <div className="panel-title"><span className="pdot"></span>Video Preview</div>
            <VideoPreview file={file} onRemove={handleRemove} onAnalyze={handleAnalyze} isAnalyzing={false} />
          </div>
        )}

        {/* Progress */}
        {status === 'analyzing' && (
          <div className="panel" style={{ marginBottom: '20px' }}>
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <div className="analyzing-ring"></div>
              <p style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: 'var(--tp)' }}>Analyzing Video</p>
              <p style={{ fontSize: '14px', color: 'var(--ts)', marginBottom: '20px' }}>Running hybrid deepfake detection pipeline…</p>
              <div className="progress-track" style={{ maxWidth: '400px', margin: '0 auto' }}>
                <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
                {PIPELINE_STEPS.map((step, i) => (
                  <span key={step} style={{
                    fontSize: '12px',
                    color: i < progressStep ? 'var(--success)' : i === progressStep ? 'var(--blue)' : 'var(--tm)',
                    display: 'flex', alignItems: 'center', gap: '6px'
                  }}>
                    <span style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: i < progressStep ? 'var(--success)' : i === progressStep ? 'var(--blue)' : 'var(--tm)',
                      boxShadow: i === progressStep ? '0 0 8px rgba(79,142,247,0.5)' : 'none',
                    }}></span>
                    {step}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {status === 'done' && result && (
          <ResultDashboard result={result} onReset={handleReset} />
        )}

        {/* Error */}
        {status === 'error' && (
          <div className="panel" style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>❌</div>
            <h3 style={{ color: 'var(--danger)', marginBottom: '8px' }}>Analysis Failed</h3>
            <p style={{ color: 'var(--ts)', marginBottom: '20px' }}>{error}</p>
            <button className="btn-primary" onClick={handleReset}>🔄 Try Again</button>
          </div>
        )}
      </main>
    </div>
  );
}
