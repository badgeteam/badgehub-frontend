"use client";

import Keycloak from "keycloak-js";
import classes from "./style.module.css";
import { useEffect, useState, useRef } from "react";

// See https://www.keycloak.org/securing-apps/javascript-adapter

export default function AuthPOC() {
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<any>(null);
  const initRef = useRef(false);

  useEffect(() => {
    // Prevent multiple initializations using ref
    if (initRef.current) {
      return;
    }
    initRef.current = true;

    async function initKeycloak() {
      try {
        const kc = new Keycloak({
          url: "https://keycloak.p1m.nl",
          realm: "master",
          clientId: "badgehub",
        });

        const authenticated = await kc.init({
          onLoad: "check-sso",
          checkLoginIframe: false,
          pkceMethod: "S256",
          // Use a more specific redirect URI to avoid loops
          redirectUri: window.location.href.split("?")[0].split("#")[0],
        });

        setKeycloak(kc);
        setLoading(false);

        if (authenticated) {
          console.log("User is authenticated");
          console.log("Token:", kc.token);

          // Get user info from token
          if (kc.tokenParsed) {
            setUserInfo({
              username: kc.tokenParsed.preferred_username,
              email: kc.tokenParsed.email,
              emailVerified: kc.tokenParsed.email_verified,
              roles: kc.tokenParsed.realm_access?.roles || [],
            });
          }
        } else {
          console.log("User is not authenticated");
        }
      } catch (error) {
        console.error("Failed to initialize Keycloak:", error);
        setLoading(false);
      }
    }

    initKeycloak();
  }, []); // Empty dependency array - only run once

  const handleLogin = () => {
    if (keycloak) {
      keycloak.login();
    }
  };

  const handleLogout = () => {
    if (keycloak) {
      setUserInfo(null); // Clear user info on logout
      keycloak.logout();
    }
  };

  const checkAuthentication = () => {
    if (keycloak) {
      console.log("authenticated", keycloak.authenticated);
      console.log("token", keycloak.token);
    }
  };

  if (loading) {
    return (
      <section className={classes.container}>
        <h1>Auth POC</h1>
        <p>Initializing authentication...</p>
      </section>
    );
  }

  return (
    <section className={classes.container}>
      <h1>Auth POC</h1>

      <div>
        <p>
          Status:{" "}
          {keycloak?.authenticated ? "Authenticated" : "Not authenticated"}
        </p>
        {keycloak?.authenticated && userInfo && (
          <div>
            <p>
              <strong>Welcome!</strong>
            </p>
            <p>Username: {userInfo.username}</p>
            <p>Email: {userInfo.email}</p>
            <p>Email Verified: {userInfo.emailVerified ? "Yes" : "No"}</p>
            <details>
              <summary>Roles ({userInfo.roles.length})</summary>
              <ul>
                {userInfo.roles.map((role: string, index: number) => (
                  <li key={index}>{role}</li>
                ))}
              </ul>
            </details>
          </div>
        )}
      </div>

      <div className={classes.buttonGroup}>
        <button onClick={handleLogin} disabled={!keycloak}>
          Login
        </button>
        <button
          onClick={handleLogout}
          disabled={!keycloak || !keycloak.authenticated}
        >
          Logout
        </button>
        <button onClick={checkAuthentication} disabled={!keycloak}>
          Check Status
        </button>
      </div>
    </section>
  );
}
