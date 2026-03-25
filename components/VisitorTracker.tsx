"use client";
import { useEffect } from "react";

/**
 * VisitorTracker
 * Silent client-side component that logs a single visit to the server
 * per browser session. Uses sessionStorage to avoid double-counting on
 * reloads. Does NOT render any UI.
 */
export default function VisitorTracker() {
  useEffect(() => {
    const currentPath = window.location.pathname || "/";
    const SESSION_KEY = `visitor_tracked_${currentPath}`;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;

      const apiBase =
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

      fetch(`${apiBase}/visitors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: window.location.pathname || "/",
          referrer: document.referrer || null,
        }),
      })
        .then(() => {
          try { sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* ignore */ }
        })
        .catch(() => {
          // Swallow errors — visitor tracking should never affect user experience
        });
    } catch {
      // sessionStorage unavailable (private/restricted mode) — skip tracking
    }
  }, []);

  return null;
}
