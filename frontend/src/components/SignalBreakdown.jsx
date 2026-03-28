/**
 * SignalBreakdown Component
 * Horizontal bar chart showing % contribution of each analysis signal.
 */
import React from 'react';

const SIGNAL_LABELS = {
  xception_cnn: { label: 'XceptionNet CNN', icon: '🧠', color: '#4F8EF7' },
  cnn_features: { label: 'CNN Features', icon: '🧠', color: '#4F8EF7' },
  frequency_analysis: { label: 'Frequency Analysis', icon: '📊', color: '#9B6EFA' },
  noise_patterns: { label: 'Noise Patterns', icon: '🔍', color: '#FF5A6E' },
  edge_consistency: { label: 'Edge Consistency', icon: '✂️', color: '#F7A440' },
  color_analysis: { label: 'Color Analysis', icon: '🎨', color: '#3DEBB1' },
};

export default function SignalBreakdown({ breakdown }) {
  if (!breakdown || Object.keys(breakdown).length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'var(--tm)', fontSize: '14px' }}>
        No signal breakdown available
      </div>
    );
  }

  return (
    <div className="signal-breakdown">
      {Object.entries(breakdown).map(([key, value]) => {
        const meta = SIGNAL_LABELS[key] || { label: key, icon: '📡', color: '#4F8EF7' };
        const barClass = value > 60 ? 'high' : value > 35 ? 'medium' : 'low';

        return (
          <div className="signal-row" key={key}>
            <div className="signal-label">
              <span className="signal-icon">{meta.icon}</span>
              <span className="signal-name">{meta.label}</span>
            </div>
            <div className="signal-bar-track">
              <div
                className={`signal-bar-fill ${barClass}`}
                style={{
                  width: `${Math.min(value, 100)}%`,
                  background: `linear-gradient(90deg, ${meta.color}88, ${meta.color})`,
                  boxShadow: `0 0 8px ${meta.color}40`,
                }}
              ></div>
            </div>
            <span className="signal-value" style={{ color: meta.color }}>{value}%</span>
          </div>
        );
      })}
    </div>
  );
}
