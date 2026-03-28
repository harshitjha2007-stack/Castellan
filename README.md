# 🛡️ DeepGuard — Hybrid Deepfake Detection System

Detects deepfake videos using a hybrid approach combining:
- **CNN (ResNet18)** — visual artifact detection with Grad-CAM heatmaps
- **rPPG Analysis** — remote photoplethysmography for biological signal validation

## Project Structure

```
├── backend/
│   ├── main.py              # FastAPI app with /analyze endpoint
│   ├── frame_extractor.py   # OpenCV frame sampling
│   ├── face_detector.py     # Haar cascade face detection
│   ├── cnn_model.py         # ResNet18 + Grad-CAM
│   ├── rppg_module.py       # rPPG signal processing
│   ├── fusion.py            # CNN + rPPG fusion logic
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main app component
│   │   ├── index.css        # Dark glassmorphism theme
│   │   └── components/      # React components
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Installation

### Prerequisites
- Python 3.9+
- Node.js 18+
- pip & npm

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

> **Note:** First run will download the pretrained ResNet18 weights (~44MB).

### Frontend Setup

```bash
cd frontend
npm install
```

## Run Instructions

### 1. Start Backend

```bash
cd backend
python main.py
```

Backend runs at `http://localhost:8000`

### 2. Start Frontend (separate terminal)

```bash
cd frontend
npm run dev
```

Frontend runs at `http://localhost:5173`

### 3. Use the App

1. Open `http://localhost:5173` in your browser
2. Drag & drop a video (MP4, AVI, MOV, MKV, WEBM)
3. Click **Analyze Video**
4. View results: prediction badge, confidence meter, heart rate chart, Grad-CAM heatmap

## API Reference

### `POST /analyze`

Upload a video file for deepfake analysis.

**Request:** `multipart/form-data` with field `file`

**Response:**
```json
{
  "prediction": "REAL | FAKE | SUSPICIOUS",
  "confidence": 0.85,
  "heart_rate": 72.5,
  "rppg_signal_strength": 0.34,
  "heatmap": "<base64 PNG>",
  "rppg_signal": [0.01, -0.02, ...],
  "cnn_fake_probability": 0.23,
  "frames_analyzed": 12,
  "processing_time": 3.45
}
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | FastAPI, PyTorch, OpenCV, SciPy |
| Frontend | React 18, Vite 5, Chart.js, Axios |
| CNN Model | ResNet18 (pretrained, ImageNet) |
| Signal Processing | Butterworth bandpass, FFT |
