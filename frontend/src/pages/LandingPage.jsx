/**
 * LandingPage — Clean, honest landing page for Castellan.
 * No fake stats, fake team, or fabricated numbers.
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage({ user }) {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const goToDashboard = () => navigate(user ? '/dashboard' : '/login');
  const toggleFaq = (idx) => setOpenFaq(openFaq === idx ? null : idx);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of the fixed nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const faqs = [
    { q: 'What file types are supported?', a: 'Images: JPG, PNG, WEBP, BMP. Videos: MP4, MOV, AVI, MKV, WEBM. The system extracts frames and analyzes facial regions using our multi-signal pipeline.' },
    { q: 'How does the detection work?', a: 'We use 5 analysis signals: CNN feature extraction (ResNet18), frequency domain analysis (FFT spectrum), noise pattern analysis, edge consistency checks, and color anomaly detection. For videos, rPPG biological signal analysis adds heart rate validation.' },
    { q: 'Is it 100% accurate?', a: 'No detection system is 100% accurate. Castellan provides confidence scores and signal breakdowns so you can make informed judgments. It\'s a tool to assist analysis, not replace human judgment.' },
    { q: 'Are my files stored?', a: 'No. Files are analyzed in-memory and deleted immediately after processing. Nothing is stored on our servers.' },
    { q: 'Does it have an API?', a: 'Yes. The backend exposes a REST API at POST /analyze that accepts image or video uploads and returns JSON with prediction, confidence, signal breakdown, heatmaps, and heart rate data.' },
  ];

  return (
    <div className="landing-page">
      <div className="blob" id="blob1"></div>
      <div className="blob" id="blob2"></div>
      <div className="blob" id="blob3"></div>

      {/* ══════ NAV ══════ */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
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
        <ul className="nav-links">
          <li><a href="#home" className="nav-link-btn active" onClick={(e) => scrollToSection(e, 'home')}>Home</a></li>
          <li><a href="#how-it-works" className="nav-link-btn" onClick={(e) => scrollToSection(e, 'how-it-works')}>How It Works</a></li>
          <li><a href="#technology" className="nav-link-btn" onClick={(e) => scrollToSection(e, 'technology')}>Technology</a></li>
          <li><a href="#faq" className="nav-link-btn" onClick={(e) => scrollToSection(e, 'faq')}>FAQ</a></li>
        </ul>
        <div className="nav-cta">
          <button className="btn-ghost" onClick={goToDashboard}>Dashboard</button>
          {user ? (
            <div className="avatar">{user.email?.slice(0, 2).toUpperCase()}</div>
          ) : (
            <button className="btn-primary" onClick={() => navigate('/login')}>Sign In</button>
          )}
        </div>
      </nav>

      {/* ══════ HERO ══════ */}
      <section className="hero wrap" id="home">
        <div className="hero-eyebrow fade-in">🛡️ &nbsp;Open Source · <span>CNN + rPPG Hybrid Detection</span></div>
        <h1 className="fade-in">Detect <em>Deepfakes</em><br/>With Multi-Signal AI</h1>
        <p className="fade-in">
          Castellan combines CNN visual analysis with remote photoplethysmography (rPPG) biological signal detection — analyzing frequency patterns, noise consistency, and heart rate signals to identify AI-generated media.
        </p>
        <div className="hero-btns fade-in">
          <button className="btn-lg primary" onClick={goToDashboard}>Try It Now — Free</button>
          <a href="#how-it-works" className="btn-lg ghost" onClick={(e) => scrollToSection(e, 'how-it-works')}>See How It Works</a>
        </div>

        <div className="hero-visual fade-in">
          <div className="hero-card">
            <div className="scan-preview">
              <div className="scan-anim"></div>
              <div className="face-detect">
                <span className="detect-lbl">ANALYZING…</span>
              </div>
            </div>
            <div className="hero-stats">
              <div className="hstat"><div className="hstat-v">5</div><div className="hstat-l">Analysis Signals</div></div>
              <div className="hstat"><div className="hstat-v">CNN</div><div className="hstat-l">ResNet18 Backbone</div></div>
              <div className="hstat"><div className="hstat-v">rPPG</div><div className="hstat-l">Heart Rate Validation</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ HOW IT WORKS ══════ */}
      <section className="why-section wrap" id="how-it-works">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Upload a photo or video and get a multi-signal analysis in seconds.</p>
        </div>
        <div className="why-grid">
          <div className="why-card fade-in">
            <div className="why-icon blue">📤</div>
            <h3>1. Upload</h3>
            <p>Drop any image (JPG, PNG, WEBP) or video (MP4, MOV, AVI) into the dashboard. The system detects faces and extracts regions of interest automatically.</p>
          </div>
          <div className="why-card fade-in">
            <div className="why-icon purple">🔬</div>
            <h3>2. Analyze</h3>
            <p>Five independent analysis signals run simultaneously: CNN features, frequency spectrum, noise patterns, edge consistency, and color analysis. Videos also get rPPG heart rate detection.</p>
          </div>
          <div className="why-card fade-in">
            <div className="why-icon green">📊</div>
            <h3>3. Results</h3>
            <p>Get a REAL / FAKE / SUSPICIOUS verdict with confidence score, signal breakdown chart, Grad-CAM heatmap showing what the AI focused on, and heart rate graph for videos.</p>
          </div>
        </div>
      </section>

      {/* ══════ TECHNOLOGY ══════ */}
      <section className="why-section wrap" id="technology">
        <div className="section-header">
          <h2>The Technology</h2>
          <p>Five independent analysis signals combined for reliable detection.</p>
        </div>
        <div className="feat-big-grid">
          <div className="feat-card fade-in">
            <div className="feat-visual blue">
              <div className="mini-meter" style={{ padding: '0 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--ts)' }}>CNN Output</span>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--blue)' }}>ResNet18</span>
                </div>
                <div className="mini-meter-track"><div className="mini-meter-fill" style={{ width: '75%' }}></div></div>
              </div>
            </div>
            <div className="feat-num">01 — CNN FEATURES</div>
            <h3>Convolutional Neural Network</h3>
            <p>Pretrained ResNet18 extracts visual features and generates Grad-CAM heatmaps showing exactly where the model detects manipulation artifacts in facial regions.</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="feat-pill">ResNet18</span>
              <span className="feat-pill">Grad-CAM</span>
              <span className="feat-pill">Feature extraction</span>
            </div>
          </div>

          <div className="feat-card fade-in">
            <div className="feat-visual purple" style={{ gap: '6px' }}>
              <div className="mini-bars">
                {[60,80,45,90,65,55,75].map((h, i) => (
                  <div key={i} className="mb sbar f" style={{ height: `${h}%`, background: `rgba(155,110,250,${0.4 + (h/200)})` }}></div>
                ))}
              </div>
            </div>
            <div className="feat-num">02 — FREQUENCY ANALYSIS</div>
            <h3>FFT Spectrum Detection</h3>
            <p>2D Fast Fourier Transform reveals frequency-domain artifacts invisible to the human eye. GAN-generated images produce distinctive spectral patterns that differ from natural photographs.</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="feat-pill">2D FFT</span>
              <span className="feat-pill">Radial profile</span>
              <span className="feat-pill">Spectral peaks</span>
            </div>
          </div>

          <div className="feat-card fade-in">
            <div className="feat-visual green">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '220px' }}>
                {[
                  { label: 'Noise variance', w: '72%', color: 'var(--success)' },
                  { label: 'Edge coherence', w: '88%', color: 'var(--blue)' },
                  { label: 'Color consistency', w: '55%', color: 'var(--purple)' },
                ].map((b, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--ts)', width: '100px' }}>{b.label}</span>
                    <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px' }}>
                      <div style={{ height: '4px', width: b.w, background: b.color, borderRadius: '2px' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="feat-num">03 — NOISE & EDGE ANALYSIS</div>
            <h3>Manipulation Artifact Detection</h3>
            <p>Analyzes noise distribution consistency across image blocks and edge sharpness transitions. Spliced or manipulated regions show inconsistent noise patterns and unnatural edge blending.</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="feat-pill">Noise residual</span>
              <span className="feat-pill">Canny edges</span>
              <span className="feat-pill">Laplacian</span>
            </div>
          </div>

          <div className="feat-card fade-in">
            <div className="feat-visual blue">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '28px' }}>💓</span>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '40px' }}>
                  {[30,50,25,60,35,55,40,65,30,50,45,70,35,55,25].map((h, i) => (
                    <div key={i} style={{ width: '4px', height: `${h}%`, background: 'rgba(79,142,247,0.6)', borderRadius: '2px' }}></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="feat-num">04 — rPPG (VIDEO ONLY)</div>
            <h3>Biological Signal Validation</h3>
            <p>Extracts remote photoplethysmography signals from forehead skin — subtle color changes caused by blood flow. Real faces produce measurable heart rate (40-180 BPM); deepfakes typically don't.</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="feat-pill">Heart rate</span>
              <span className="feat-pill">Butterworth filter</span>
              <span className="feat-pill">FFT</span>
            </div>
          </div>
        </div>

        {/* Fusion explanation */}
        <div className="cta-strip" style={{ marginTop: '20px' }}>
          <h2>Multi-Signal Fusion</h2>
          <p>All 5 signals are combined with weighted scoring. CNN (15%) + Frequency (30%) + Noise (25%) + Edges (15%) + Color (15%). For videos, rPPG adds biological validation.</p>
          <button className="btn-lg primary" onClick={goToDashboard}>Try It Yourself →</button>
        </div>
      </section>

      {/* ══════ FAQ ══════ */}
      <section className="why-section wrap" id="faq">
        <div className="section-header">
          <h2>FAQ</h2>
          <p>Common questions about Castellan.</p>
        </div>
        <div className="faq-section" style={{ padding: 0 }}>
          {faqs.map((f, i) => (
            <div className={`faq-item${openFaq === i ? ' open' : ''}`} key={i} onClick={() => toggleFaq(i)}>
              <div className="faq-q"><span>{f.q}</span><span className="faq-chevron">▾</span></div>
              <div className="faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer>
        <div className="footer-logo">
          <div className="logo-mark" style={{ width: '28px', height: '28px', borderRadius: '8px' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: '14px', height: '14px' }}>
              <path d="M15,6 C13,4 9,4 7,7 C5,10 6,14 8,16 C9,17 9,19 8,21 L13,21 C14,19 15,16 16,14 C17,12 17,9 15,6 Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span>Castellan</span>
        </div>
        <p>Hybrid Deepfake Detection System · CNN + rPPG</p>
        <div className="footer-links">
          <a href="#home" onClick={(e) => scrollToSection(e, 'home')}>Home</a>
          <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')}>How It Works</a>
          <a href="#technology" onClick={(e) => scrollToSection(e, 'technology')}>Technology</a>
          <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')}>FAQ</a>
        </div>
      </footer>
    </div>
  );
}
