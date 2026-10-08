import { useEffect, useState } from "react";
import "./ServerWakeBanner.css";

const HEALTH_URL = `${import.meta.env.VITE_BACKEND_URL}/health`;
const SHOW_AFTER_MS = 2500;
const RETRY_EVERY_MS = 3000;
const GIVE_UP_AFTER_MS = 120000;

/**
 * Free hosting puts the API to sleep after ~15 idle minutes, and the first request then takes
 * 30-60s. Pinging /health as soon as the app opens starts the wake-up immediately, and the
 * banner (shown only if it's actually slow) explains the wait instead of leaving a dead-looking page.
 */
export const ServerWakeBanner = () => {
  const [waking, setWaking] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const startedAt = Date.now();
    const showTimer = setTimeout(() => {
      if (!cancelled) setWaking(true);
    }, SHOW_AFTER_MS);

    const check = async () => {
      try {
        const response = await fetch(HEALTH_URL, { cache: "no-store" });
        if (response.ok) {
          if (!cancelled) setWaking(false);
          clearTimeout(showTimer);
          return;
        }
      } catch {
        // network error / still starting — retry below
      }
      if (cancelled) return;
      if (Date.now() - startedAt < GIVE_UP_AFTER_MS) {
        setTimeout(check, RETRY_EVERY_MS);
      } else {
        setWaking(false);
      }
    };

    check();
    return () => {
      cancelled = true;
      clearTimeout(showTimer);
    };
  }, []);

  if (!waking) return null;

  return (
    <div className="server-wake-banner" role="status">
      <span className="server-wake-banner__spinner" aria-hidden="true" />
      <span>
        Starting the server — free hosting sleeps when idle, so the first visit can take up to a
        minute. This page will work as soon as it&apos;s ready.
      </span>
    </div>
  );
};
