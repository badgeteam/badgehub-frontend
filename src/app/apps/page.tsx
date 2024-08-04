import { getApps } from "@/badgehub-api-client";
import Link from "next/link";

import styles from "./apps.module.css";

export default async function Listing() {
  const apps = await getApps();

  return (
    <>
      {apps.map((app) => (
        <article className={styles.appCard} key={app.slug}>
          <Link href={`/apps/${app.slug}`}>
            <h2>{app.name}</h2>
          </Link>
          <Link href={`/categories/${app.category_slug}`}>
            {app.category_slug}
          </Link>
          <p>{app.user_name}</p>
        </article>
      ))}
    </>
  );
}
