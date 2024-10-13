"use client";
import Link from "next/link";
import styles from "./MainNav.module.css";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export function MainNav() {
  const pathname = usePathname();

  console.log("pathname", pathname);

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
        className={pathname == "/account" ? styles.currentLink : ""}
        aria-current={pathname == "/account" ? "page" : "false"}
      >
        <h1>Account</h1>
      </Link>
    </nav>
  );
}
