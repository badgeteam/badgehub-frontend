import { LayoutProps } from "../../../.next/types/app/layout";
import styles from "./layout.module.css";

export default function AppsListingLayout(props: LayoutProps) {
  return (
    <main>
      <h1 className={styles.title}>Apps</h1>
      {props.children}
    </main>
  );
}
