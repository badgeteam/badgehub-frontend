import { ReactNode } from "react";
import styles from "./layout.module.css";

export default function AppsListingLayout(props: { children: ReactNode }) {
  return (
    <main>
      <h1 className={styles.title}>Apps</h1>
      {props.children}
    </main>
  );
}
