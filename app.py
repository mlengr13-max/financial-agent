"""
FastAPI application entrypoint for Railway/Vercel deployment
"""
import os
import sys
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

load_dotenv()

# Create FastAPI app
app = FastAPI(
    title="Financial Agent API",
    description="AI-powered financial analysis REST API",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import routes
try:
    from backend.api import routes
    app.include_router(routes.router, prefix="/api", tags=["Analysis"])
except Exception as e:
    print(f"Warning: Could not load API routes: {e}")

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "financial-agent-api"}

@app.get("/")
def root():
    """Root endpoint"""
    return {
        "message": "Financial Agent API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000))
    )
