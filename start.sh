#!/bin/bash
set -e

# Install dependencies
pip install -r requirements.txt

# Start the application
exec gunicorn app:app --workers 1 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:${PORT:-8000} --timeout 120 --access-logfile - --error-logfile -
