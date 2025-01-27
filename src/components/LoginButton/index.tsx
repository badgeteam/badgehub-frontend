"use client";

import { useSession, signIn, signOut, SessionProvider } from "next-auth/react";
import styles from "./LoginButton.module.css";
import { getLogoutUrl } from "@/app/actions";

export function LoginButton() {
  return (
    <SessionProvider>
      <LoginButtonInternal />
    </SessionProvider>
  );
}

export function LoginButtonInternal() {
  const { data: session, status } = useSession();

  let html;

  switch (status) {
    case "loading":
      html = <p>...</p>;
      break;
    case "unauthenticated":
      html = (
        <button className={styles.button} onClick={() => signIn()}>
          Sign in
        </button>
      );
      break;
    case "authenticated":
      html = (
        <>
          {session?.user?.email}
          <button className={styles.button} onClick={() => fullSignout()}>
            Sign out
          </button>
        </>
      );
      break;
  }

  return <div className={styles.container}>{html}</div>;

  async function fullSignout() {
    const callbackUrl = await getLogoutUrl();
    console.log("callbackUrl", callbackUrl);
    if (!callbackUrl) {
      throw new Error("Logout url is not defined");
      // Add KEYCLOAK_LOGOUT_URL to .env
    }
    signOut({
      redirect: true,
      callbackUrl,
    });
  }
}
