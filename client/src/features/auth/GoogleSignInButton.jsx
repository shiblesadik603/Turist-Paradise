import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

/**
 * Renders Google's own "Sign in with Google" button (loaded via the <script> tag in
 * index.html) and hands the resulting ID token to the backend for verification.
 * Renders nothing if VITE_GOOGLE_CLIENT_ID isn't configured.
 */
export const GoogleSignInButton = ({ rememberMe = false, onError }) => {
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuth();

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || !buttonRef.current) return undefined;

    let cancelled = false;
    let pollId = null;

    const handleCredentialResponse = async (response) => {
      try {
        await loginWithGoogle(response.credential, rememberMe);
        navigate("/home");
      } catch {
        onError?.("Google sign-in failed. Please try again.");
      }
    };

    const init = () => {
      if (cancelled) return;
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
        width: 320,
      });
    };

    if (window.google?.accounts?.id) {
      init();
    } else {
      // The GSI script loads async — poll briefly until it's ready.
      pollId = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(pollId);
          init();
        }
      }, 100);
    }

    return () => {
      cancelled = true;
      if (pollId) clearInterval(pollId);
    };
  }, [rememberMe, loginWithGoogle, navigate, onError]);

  if (!GOOGLE_CLIENT_ID) return null;

  return (
    <div ref={buttonRef} style={{ display: "flex", justifyContent: "center", margin: "16px 0" }} />
  );
};
