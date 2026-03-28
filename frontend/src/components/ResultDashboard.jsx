/**
 * ResultDashboard Component
 * Displays analysis results: prediction badge, stats, confidence meter,
 * signal breakdown chart, heart rate chart, and Grad-CAM heatmap.
 */
import React from 'react';
import ConfidenceMeter from './ConfidenceMeter';
import HeartRateChart from './HeartRateChart';
import SignalBreakdown from './SignalBreakdown';

/** Get prediction icon */
const getPredictionIcon = (prediction) => {
  switch (prediction) {
    case 'REAL': return '✅';
    case 'FAKE': return '🚫';
    case 'SUSPICIOUS': return '⚠️';
    default: return '❓';
  }
};

/** Get prediction CSS class */
const getPredictionClass = (prediction) => {
  return prediction?.toLowerCase() || 'unknown';
};

export default function ResultDashboard({ result, onReset }) {
  const {
    prediction,
    confidence,
    heart_rate,
    rppg_signal_strength,
    heatmap,
    rppg_signal,
    cnn_fake_probability,
    frames_analyzed,
    processing_time,
    media_type,
    face_detected,
    signal_breakdown,
    error,
  } = result;

  const isImage = media_type === 'image';

  return (
    <div className="result-dashboard stagger-children" id="result-dashboard">
      {/* Header with prediction badge */}
      <div className="result-header">
        <h2>Analysis Complete</h2>
        <div className={`prediction-badge ${getPredictionClass(prediction)}`}>
          <span className="prediction-badge-icon">{getPredictionIcon(prediction)}</span>
          {prediction}
        </div>
        {error && (
          <p style={{ color: 'var(--warn)', marginTop: '12px', fontSize: '14px' }}>
            ⚠️ {error}
          </p>
        )}
      </div>

      {/* Stats grid */}
      <div className="result-stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-card-icon">🧠</div>
          <div className="stat-card-value">
            {cnn_fake_probability !== undefined ? (cnn_fake_probability * 100).toFixed(1) + '%' : '—'}
          </div>
          <div className="stat-card-label">AI-Generated Score</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-card-icon">🎯</div>
          <div className="stat-card-value">
            {confidence !== undefined ? (confidence * 100).toFixed(1) + '%' : '—'}
          </div>
          <div className="stat-card-label">Confidence</div>
        </div>
        {!isImage && (
          <div className="glass-card stat-card">
            <div className="stat-card-icon">💓</div>
            <div className="stat-card-value">
              {heart_rate > 0 ? `${heart_rate.toFixed(1)}` : '—'}
            </div>
            <div className="stat-card-label">Heart Rate (BPM)</div>
          </div>
        )}
        <div className="glass-card stat-card">
          <div className="stat-card-icon">{isImage ? '📸' : '🎞️'}</div>
          <div className="stat-card-value">{frames_analyzed || '—'}</div>
          <div className="stat-card-label">{isImage ? 'Image Analyzed' : 'Frames Analyzed'}</div>
        </div>
      </div>

      {/* Signal Breakdown Chart */}
      {signal_breakdown && Object.keys(signal_breakdown).length > 0 && (
        <div className="glass-card chart-card" style={{ marginBottom: '20px' }}>
          <div className="chart-card-title">
            <span>📊</span> AI Detection Signal Breakdown
          </div>
          <SignalBreakdown breakdown={signal_breakdown} />
        </div>
      )}

      {/* Charts: Confidence + Heart Rate */}
      <div className={isImage ? 'result-charts-single' : 'result-charts'}>
        <div className="glass-card chart-card">
          <div className="chart-card-title">
            <span>🎯</span> Confidence Score
          </div>
          <ConfidenceMeter value={confidence} prediction={prediction} />
        </div>
        {!isImage && (
          <div className="glass-card chart-card">
            <div className="chart-card-title">
              <span>💗</span> rPPG Signal (Heart Rate)
            </div>
            <HeartRateChart signal={rppg_signal} heartRate={heart_rate} />
          </div>
        )}
      </div>

      {/* Heatmap */}
      {heatmap && (
        <div className="heatmap-section">
          <div className="glass-card heatmap-card">
            <div className="heatmap-title">
              <span>🔥</span> Grad-CAM Heatmap — CNN Attention Areas
            </div>
            <img
              className="heatmap-image"
              src={`data:image/png;base64,${heatmap}`}
              alt="Grad-CAM heatmap showing CNN attention areas"
              id="heatmap-image"
            />
          </div>
        </div>
      )}

      {/* Processing info */}
      <div className="processing-info">
        <div className="processing-info-item">
          ⏱️ {processing_time}s processing time
        </div>
        <div className="processing-info-item">
          {isImage ? '📸' : '🖼️'} {frames_analyzed} {isImage ? 'image' : 'frames'} analyzed
        </div>
        <div className="processing-info-item">
          {face_detected ? '👤 Face detected' : '👤 No face detected'}
        </div>
      </div>

      {/* Reset button */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button id="btn-new-analysis" className="btn btn-ghost" onClick={onReset}>
          🔄 New Analysis
        </button>
      </div>
    </div>
  );
}
