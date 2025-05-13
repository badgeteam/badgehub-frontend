"use client";
import Link from "next/link";
import styles from "./MainNav.module.css";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useBadgeHubUserId } from "@/useBadgeHubUserId";
import { SessionProvider } from "next-auth/react";

function MyProjectsLink(props: { pathname: string }) {
  const badgeHubUserId = useBadgeHubUserId();
  if (badgeHubUserId === undefined) {
    return null;
  }
  return (
    <Link
      href={`/users/${badgeHubUserId}/drafts`}
      className={
        props.pathname?.startsWith("/users/") ? styles.currentLink : ""
      }
      aria-current={props.pathname?.startsWith("/users/") ? "page" : "false"}
    >
      <h1>My Projects</h1>
    </Link>
  );
}

export function MainNav() {
  const pathname = usePathname();
  return (
    <nav className={styles.mainNav}>
      <Link
        href={"/apps"}
        className={pathname == "/apps" ? styles.currentLink : ""}
        aria-current={pathname == "/apps" ? "page" : "false"}
      >
        <h1>Apps</h1>
      </Link>
      <Link
        href={"/account"}
        className={pathname === "/account" ? styles.currentLink : ""}
        aria-current={pathname === "/account" ? "page" : "false"}
      >
        <h1>Account</h1>
      </Link>
      <SessionProvider>
        <MyProjectsLink pathname={pathname} />
      </SessionProvider>
    </nav>
  );
}
