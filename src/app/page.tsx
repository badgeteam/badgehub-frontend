import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <section>
        <Link href={"/listing"}>
          <h1>Apps</h1>
        </Link>
      </section>
    </main>
  );
}
