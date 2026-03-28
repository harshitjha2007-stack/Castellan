/**
 * MediaPreview Component (renamed from VideoPreview)
 * Shows the uploaded video or image with file info and action buttons.
 */
import React, { useMemo } from 'react';

export default function VideoPreview({ file, onRemove, onAnalyze, isAnalyzing }) {
  const mediaUrl = useMemo(() => URL.createObjectURL(file), [file]);
  const fileSize = useMemo(() => {
    const mb = file.size / (1024 * 1024);
    return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(file.size / 1024).toFixed(0)} KB`;
  }, [file]);

  const isImage = file.type.startsWith('image/');
  const isVideo = file.type.startsWith('video/');

  return (
    <div className="video-preview-container">
      <div className="glass-card video-preview-wrapper">
        {isVideo && (
          <video
            className="video-preview"
            src={mediaUrl}
            controls
            muted
            id="video-preview-player"
          />
        )}
        {isImage && (
          <img
            className="video-preview"
            src={mediaUrl}
            alt={file.name}
            id="image-preview"
            style={{ objectFit: 'contain' }}
          />
        )}
      </div>
      <div className="video-info">
        <div className="video-filename">
          <div className="video-filename-icon">{isImage ? '📸' : '📹'}</div>
          <div>
            <div>{file.name}</div>
            <div className="video-size">{fileSize}</div>
          </div>
        </div>
        <div className="video-actions">
          <button
            id="btn-remove-video"
            className="btn btn-danger"
            onClick={onRemove}
            disabled={isAnalyzing}
          >
            ✕ Remove
          </button>
          <button
            id="btn-analyze"
            className="btn btn-primary"
            onClick={onAnalyze}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? '⏳ Analyzing...' : `🔍 Analyze ${isImage ? 'Image' : 'Video'}`}
          </button>
        </div>
      </div>
    </div>
  );
}
