# gunicorn.conf.py
# Production configuration for handling 1000+ concurrent users
# Run with: gunicorn -c gunicorn.conf.py main:app

import multiprocessing

# ─── Workers ───────────────────────────────────────────────────────────────────
# Formula: (2 x CPU cores) + 1
# For most cloud servers (2 CPU): 4-5 workers
# Each async worker handles ~200-300 concurrent requests via asyncio
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "uvicorn.workers.UvicornWorker"  # async workers for FastAPI

# ─── Network ───────────────────────────────────────────────────────────────────
import os
bind = f"0.0.0.0:{os.environ.get('PORT', '4000')}"
backlog = 2048                # Queue up to 2048 pending connections

# ─── Timeouts ──────────────────────────────────────────────────────────────────
timeout = 60                  # Kill worker if request takes > 60s
keepalive = 5                 # Keep connections alive for 5s (reuse TCP)
graceful_timeout = 30         # Give workers 30s to finish on shutdown

# ─── Reliability ───────────────────────────────────────────────────────────────
max_requests = 1000           # Restart a worker after 1000 requests (prevents memory leaks)
max_requests_jitter = 100     # Add randomness so all workers don't restart at once
preload_app = True            # Load app once in master, fork to workers (saves memory)

# ─── Logging ───────────────────────────────────────────────────────────────────
accesslog = "-"               # Print access logs to stdout
errorlog = "-"                # Print error logs to stdout
loglevel = "info"
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s %(D)sμs'
