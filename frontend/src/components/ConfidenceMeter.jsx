/**
 * ConfidenceMeter Component
 * Animated SVG ring gauge showing confidence percentage.
 */
import React, { useEffect, useState } from 'react';

export default function ConfidenceMeter({ value, prediction }) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    // Animate from 0 to target value
    const timer = setTimeout(() => setAnimatedValue(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const percentage = Math.round(animatedValue * 100);
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedValue * circumference);

  // Color based on prediction
  const getColor = () => {
    switch (prediction) {
      case 'REAL': return '#06d6a0';
      case 'FAKE': return '#ef4444';
      case 'SUSPICIOUS': return '#f59e0b';
      default: return '#6868a0';
    }
  };

  const color = getColor();

  return (
    <div className="confidence-meter">
      <div className="confidence-ring">
        <svg width="160" height="160" viewBox="0 0 160 160">
          <circle
            className="confidence-ring-bg"
            cx="80"
            cy="80"
            r={radius}
          />
          <circle
            className="confidence-ring-fill"
            cx="80"
            cy="80"
            r={radius}
            stroke={color}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ filter: `drop-shadow(0 0 6px ${color}40)` }}
          />
        </svg>
        <div className="confidence-ring-value">
          <div className="confidence-ring-percentage" style={{ color }}>
            {percentage}%
          </div>
          <div className="confidence-ring-label">Confidence</div>
        </div>
      </div>
    </div>
  );
}
