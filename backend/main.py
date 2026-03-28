"""
Hybrid Deepfake Detection System — FastAPI Backend
Uses Subprocess to run external DeepFakesON-Phys via rPPG-Toolbox
"""

import os
import uuid
import logging
import subprocess
import json
import sys

# Use the same Python interpreter this process is running under
PYTHON_EXE = sys.executable
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import shutil

# --- Logging ---
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)

# --- App ---
app = FastAPI(
    title="DeepFakesON-Phys API",
    description="Detects deepfakes using rPPG-Toolbox",
    version="3.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

# DeepFakesON-Phys primarily supports videos
ALLOWED_EXTENSIONS = {".mp4", ".avi", ".mov", ".mkv", ".webm", ".flv"}


@app.get("/")
async def health_check():
    return {"status": "ok", "service": "DeepFakesON-Phys API v3.0"}


@app.post("/analyze")
@app.post("/detect")
async def detect(file: UploadFile = File(...)):
    """
    Analyze an uploaded video using DeepFakesON-Phys subprocess.
    """
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")

    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type: {ext}. Allowed: {', '.join(sorted(ALLOWED_EXTENSIONS))}"
        )

    # Save file
    file_id = str(uuid.uuid4())
    file_path = os.path.join(UPLOAD_DIR, f"{file_id}{ext}")

    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        logger.info(f"Uploaded: {file.filename} ({os.path.getsize(file_path) / 1024:.1f} KB)")
        
        # Run external script
        logger.info("Executing deepfakesONphys/run.py subprocess...")
        script_path = os.path.join(os.path.dirname(__file__), "model", "deepfakesONphys", "run.py")
        
        if not os.path.exists(script_path):
             return JSONResponse(status_code=500, content={"error": "Model script not found at model/deepfakesONphys/run.py"})

        # Pass the file_path to the script
        result = subprocess.run(
            [PYTHON_EXE, script_path, file_path],
            capture_output=True,
            text=True
        )
        
        logger.info(f"Subprocess finished with return code {result.returncode}")
        
        if result.returncode != 0:
            logger.error(f"Subprocess Error: {result.stderr}")
            raise HTTPException(status_code=500, detail="Model processing failed.")
        
        # Parse output as JSON (Assuming run.py will print a JSON string)
        try:
            output_data = json.loads(result.stdout)
            return JSONResponse(content=output_data)
        except json.JSONDecodeError:
            # If not JSON, return as string
            return JSONResponse(content={"result": result.stdout})

    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
