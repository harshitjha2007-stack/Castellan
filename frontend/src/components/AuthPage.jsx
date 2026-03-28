/**
 * AuthPage Component
 * Login / Signup form with Castellan glass-panel styling.
 * Uses Supabase email + password authentication.
 */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function AuthPage({ mode = 'login' }) {
  const navigate = useNavigate();
  const isLogin = mode === 'login';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/dashboard');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } }
        });
        if (error) throw error;
        setSuccess('Account created! Check your email to confirm, then log in.');
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Background blobs */}
      <div className="blob" style={{ width: '420px', height: '320px', background: 'rgba(79,142,247,0.10)', bottom: '-60px', left: '-80px' }}></div>
      <div className="blob" style={{ width: '380px', height: '300px', background: 'rgba(155,110,250,0.09)', bottom: '-40px', right: '-70px' }}></div>

      <div className="auth-container">
        {/* Logo */}
        <Link to="/" className="auth-logo">
          <div className="logo-mark">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M15,6 C13,4 9,4 7,7 C5,10 6,14 8,16 C9,17 9,19 8,21 L13,21 C14,19 15,16 16,14 C17,12 17,9 15,6 Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="4" y1="12" x2="20" y2="12" strokeWidth="0.5" opacity="0.4"/>
              <line x1="12" y1="4" x2="12" y2="20" strokeWidth="0.5" opacity="0.4"/>
              <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </div>
          <span className="logo-txt">Castellan</span>
        </Link>

        {/* Auth card */}
        <div className="auth-card panel">
          <h1 className="auth-title">{isLogin ? 'Welcome back' : 'Create your account'}</h1>
          <p className="auth-subtitle">
            {isLogin
              ? 'Sign in to access the detection dashboard'
              : 'Start detecting deepfakes with AI-powered analysis'}
          </p>

          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="form-row">
                <label>Full Name</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Harshit Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="form-row">
              <label>Email Address</label>
              <input
                className="form-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-row">
              <label>Password</label>
              <input
                className="form-input"
                type="password"
                placeholder={isLogin ? 'Enter your password' : 'Min. 6 characters'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <button
              type="submit"
              className="btn-primary auth-submit"
              disabled={loading}
            >
              {loading
                ? (isLogin ? 'Signing in…' : 'Creating account…')
                : (isLogin ? 'Sign In →' : 'Create Account →')}
            </button>
          </form>

          <div className="auth-footer">
            {isLogin ? (
              <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            ) : (
              <p>Already have an account? <Link to="/login">Sign in</Link></p>
            )}
          </div>
        </div>

        <Link to="/" className="auth-back">← Back to home</Link>
      </div>
    </div>
  );
}
