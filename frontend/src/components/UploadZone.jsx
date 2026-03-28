/**
 * UploadZone Component
 * Drag & drop / click-to-upload for both video and image files.
 */
import React, { useState, useRef, useCallback } from 'react';

const ALLOWED_TYPES = [
  'video/mp4', 'video/avi', 'video/quicktime', 'video/x-matroska', 'video/webm',
  'image/jpeg', 'image/png', 'image/webp', 'image/bmp',
];
const MAX_SIZE_MB = 200;

export default function UploadZone({ onFileSelect }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef(null);

  const validateFile = useCallback((file) => {
    if (!file) return 'No file selected';
    const ext = file.name.split('.').pop().toLowerCase();
    const validExts = ['mp4', 'avi', 'mov', 'mkv', 'webm', 'flv', 'jpg', 'jpeg', 'png', 'webp', 'bmp', 'tiff'];
    if (!ALLOWED_TYPES.includes(file.type) && !validExts.includes(ext)) {
      return `Unsupported format: .${ext}`;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return `File too large. Max: ${MAX_SIZE_MB}MB`;
    }
    return null;
  }, []);

  const handleFile = useCallback((file) => {
    const error = validateFile(file);
    if (error) {
      alert(error);
      return;
    }
    onFileSelect(file);
  }, [validateFile, onFileSelect]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleClick = () => inputRef.current?.click();

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  return (
    <div
      id="upload-zone"
      className={`glass-card upload-zone animate-fade-in-up ${isDragOver ? 'drag-over' : ''}`}
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="upload-icon">📁</div>
      <h3 className="upload-title">Upload Image or Video for Analysis</h3>
      <p className="upload-subtitle">Drag & drop your file here, or click to browse</p>
      <div className="upload-formats">
        {['JPG', 'PNG', 'WEBP', 'MP4', 'AVI', 'MOV', 'MKV'].map(fmt => (
          <span key={fmt} className="upload-format-tag">{fmt}</span>
        ))}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        className="upload-input"
        onChange={handleInputChange}
      />
    </div>
  );
}
