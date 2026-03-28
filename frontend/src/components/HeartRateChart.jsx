/**
 * HeartRateChart Component
 * Line chart displaying the rPPG signal using Chart.js.
 */
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

export default function HeartRateChart({ signal, heartRate }) {
  if (!signal || signal.length === 0) {
    return (
      <div className="heart-rate-chart" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No rPPG signal data available</p>
      </div>
    );
  }

  const labels = signal.map((_, i) => i + 1);

  const data = {
    labels,
    datasets: [
      {
        label: 'rPPG Signal',
        data: signal,
        borderColor: '#f472b6',
        backgroundColor: 'rgba(244, 114, 182, 0.1)',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(15, 15, 42, 0.9)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        titleColor: '#e8e8f0',
        bodyColor: '#9898b8',
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Frame',
          color: '#6868a0',
          font: { size: 11, family: 'Inter' },
        },
        ticks: {
          color: '#6868a0',
          font: { size: 10 },
          maxTicksLimit: 10,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.03)',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Amplitude',
          color: '#6868a0',
          font: { size: 11, family: 'Inter' },
        },
        ticks: {
          color: '#6868a0',
          font: { size: 10 },
          maxTicksLimit: 5,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.03)',
        },
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeOutQuart',
    },
  };

  return (
    <div className="heart-rate-chart">
      <Line data={data} options={options} />
    </div>
  );
}
