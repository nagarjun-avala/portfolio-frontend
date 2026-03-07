"use client";
import { useEffect } from "react";

/**
 * VisitorTracker
 * Silent client-side component that logs a single visit to the server
 * when the web-developer-folio portfolio page is loaded.
 * Does NOT render any UI.
 */
export default function VisitorTracker() {
  useEffect(() => {
    const apiBase =
      process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

    fetch(`${apiBase}/visitors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Use 'no-cors' so the request fires even if CORS is strict on the server side
      // and we don't block the page on a failure.
      body: JSON.stringify({
        page: window.location.pathname || "/",
        referrer: document.referrer || null,
      }),
    }).catch(() => {
      // Swallow errors — visitor tracking should never affect user experience
    });
  }, []);

  return null;
}
