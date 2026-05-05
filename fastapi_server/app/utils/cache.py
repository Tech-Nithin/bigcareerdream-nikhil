# app/utils/cache.py
"""
Simple in-memory TTL cache for high-traffic endpoints.
No Redis needed — works out of the box.

Usage:
    from app.utils.cache import cache

    # Store a value for 60 seconds
    cache.set("jobs_list", data, ttl=60)

    # Retrieve (returns None if expired or missing)
    data = cache.get("jobs_list")

    # Clear a specific key
    cache.delete("jobs_list")

    # Clear everything
    cache.clear()
"""

import time
import asyncio
from typing import Any, Optional
from threading import Lock


class TTLCache:
    """Thread-safe in-memory cache with Time-To-Live (TTL) expiry."""

    def __init__(self):
        self._store: dict[str, tuple[Any, float]] = {}  # key -> (value, expires_at)
        self._lock = Lock()

    def set(self, key: str, value: Any, ttl: int = 60) -> None:
        """Store a value with a TTL in seconds."""
        expires_at = time.monotonic() + ttl
        with self._lock:
            self._store[key] = (value, expires_at)

    def get(self, key: str) -> Optional[Any]:
        """Retrieve a value. Returns None if key doesn't exist or has expired."""
        with self._lock:
            entry = self._store.get(key)
            if entry is None:
                return None
            value, expires_at = entry
            if time.monotonic() > expires_at:
                del self._store[key]
                return None
            return value

    def delete(self, key: str) -> None:
        """Remove a specific key."""
        with self._lock:
            self._store.pop(key, None)

    def clear(self) -> None:
        """Clear entire cache — use after write operations."""
        with self._lock:
            self._store.clear()

    def size(self) -> int:
        """Return number of keys currently in cache."""
        with self._lock:
            return len(self._store)

    def cleanup_expired(self) -> int:
        """Remove all expired entries. Returns count of removed entries."""
        now = time.monotonic()
        removed = 0
        with self._lock:
            expired_keys = [k for k, (_, exp) in self._store.items() if now > exp]
            for k in expired_keys:
                del self._store[k]
                removed += 1
        return removed


# ─── Global singleton — import this everywhere ────────────────────────────────
cache = TTLCache()


# ─── Recommended TTL values for this project ──────────────────────────────────
# Job listings (change rarely):     TTL = 60s
# Stats / counts:                   TTL = 120s
# Client profile:                   TTL = 30s
# Auth / OTP:                       TTL = 0  (never cache!)
