import Link from "next/link";
import styles from "./AppList.module.css";
import { Filter } from "@/components/Filter";
import {
  getCategoriesResponse,
  getDevicesResponse,
  getProjectsResponse,
} from "@/badgehub-api-client/generated/swagger/public/public";

type AppListProps = {
  data: [getProjectsResponse, getCategoriesResponse, getDevicesResponse];
};

export function AppList({ data }: AppListProps) {
  const [apps, categories, devices] = data;

  return (
    <>
      <Filter categories={categories.data} devices={devices.data} />

      {apps.data.map((project) => (
        <article className={styles.appCard} key={project.slug}>
          <Link href={`/apps/${project.slug}`}>
            <h2>{project.name}</h2>
          </Link>
          <Link href={`/categories/${project.category}`}>
            {project.category}
          </Link>
          <p>{project.user_name}</p>
        </article>
      ))}
    </>
  );
}
