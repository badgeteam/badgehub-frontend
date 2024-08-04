import Link from "next/link";
import styles from "./MainNav.module.css";

export function MainNav() {
  return (
    <nav className={styles.mainNav}>
      <Link href={"/apps"}>
        <h1>Apps</h1>
      </Link>
      <Link href={"/categories"}>
        <h1>Categories</h1>
      </Link>
      <Link href={"/devices"}>
        <h1>Devices</h1>
      </Link>
    </nav>
  );
}
