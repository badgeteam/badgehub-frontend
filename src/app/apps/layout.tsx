"use client";

import { SessionProvider } from "next-auth/react";
import styles from "./layout.module.css";
import { ReactNode } from "react";

type AppsListingLayoutProps = {
  children: ReactNode;
};

export default function AppsListingLayout({
  children,
}: AppsListingLayoutProps) {
  return (
    <main>
      <h1 className={styles.title}>Apps</h1>
      <SessionProvider>{children}</SessionProvider>
    </main>
  );
}
