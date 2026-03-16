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
    // Only track once per browser session
    const SESSION_KEY = "visitor_tracked";
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
        sessionStorage.setItem(SESSION_KEY, "1");
      })
      .catch(() => {
        // Swallow errors — visitor tracking should never affect user experience
      });
  }, []);

  return null;
}
