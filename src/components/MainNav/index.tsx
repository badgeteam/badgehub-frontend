import Link from "next/link";
import styles from "./MainNav.module.css";

export function MainNav() {
    return (
        <nav className={styles.mainNav}>
            <Link href={"/apps"}>
                <h1>Apps</h1>
            </Link>
            <Link href={"/account"}>
                <h1>Account</h1>
            </Link>
        </nav>
    );
}
