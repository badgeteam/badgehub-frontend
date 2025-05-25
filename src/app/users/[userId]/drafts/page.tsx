"use client";
import { useEffect, useState } from "react";
import { getUserDraftProjects } from "@/badgehub-api-client/generated/swagger/private/private";
import styles from "./drafts.module.css";
import { Project } from "@/badgehub-api-client/generated/models";

export default function AppPage({ params }: { params: { userId: string } }) {
  const [apps, setApps] = useState<Project[] | undefined>(undefined);
  useEffect(() => {
    getUserDraftProjects(params.userId).then((r) => {
      if (r.status !== 200) {
        console.error("Failed to fetch draft projects:", r);
        return;
      }
      setApps(r.data);
    });
  }, [params.userId]);

  return (
    <article>
      <h2>{params.userId} Draft Projects</h2>
      <a className={styles.underlined} href={"/create-project"}>
        Create Project
      </a>
      <ul>
        {apps?.map((app) => (
          <li key={app.slug}>
            <h3>{app.name}</h3>
            <p>{app.description}</p>
            <a className={styles.underlined} href={`/apps/${app.slug}/edit`}>
              edit
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}
