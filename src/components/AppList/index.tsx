import Link from "next/link";
import styles from "./AppList.module.css";
import { Filter } from "@/components/Filter";
import {
  getAppsResponse,
  getCategoriesResponse,
  getDevicesResponse,
} from "@/badgehub-api-client/generated/swagger/public/public";

type AppListProps = {
  data: [getAppsResponse, getCategoriesResponse, getDevicesResponse];
};

export function AppList({ data }: AppListProps) {
  const [apps, categories, devices] = data;

  return (
    <>
      <Filter categories={categories.data} devices={devices.data} />

      {apps.data.map((app) => (
        <article className={styles.appCard} key={app.slug}>
          <Link href={`/apps/${app.slug}`}>
            <h2>{app.name}</h2>
          </Link>
          <Link href={`/categories/${app.category}`}>
            {app.category}
          </Link>
          <p>{app.user_name}</p>
        </article>
      ))}
    </>
  );
}
