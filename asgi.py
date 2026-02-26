"""
ASGI entrypoint for Railway deployment
"""
from app import app

# Export for Railway/Gunicorn detection
__all__ = ["app"]
