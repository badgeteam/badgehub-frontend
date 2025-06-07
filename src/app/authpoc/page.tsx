"use client";

import Keycloak from "keycloak-js";
import classes from "./style.module.css";
import { useEffect, useState, useRef } from "react";

export default function AuthPOC() {
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
  const [loading, setLoading] = useState(true);
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
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
      keycloak.logout();
    }
  };

  const checkAuthentication = () => {
    if (keycloak) {
      console.log("keycloak", keycloak);
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
        {keycloak?.authenticated && <p>Welcome! You are logged in.</p>}
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
