import { getUserDraftProjects } from "@/badgehub-api-client/generated/swagger/private/private";
import styles from "./drafts.module.css";

export default async function AppPage({
  params,
}: {
  params: { userId: number };
}) {
  const response = await getUserDraftProjects(params.userId);

  const apps = response.data;
  return (
    <article>
      <h2>{params.userId} Draft Projects</h2>
      <a className={styles.createDraftLink} href={"/create-project"}>
        Create Project
      </a>
      <ul>
        {apps?.map((app) => (
          <li key={app.slug}>
            <h3>{app.name}</h3>
            <p>{app.description}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
