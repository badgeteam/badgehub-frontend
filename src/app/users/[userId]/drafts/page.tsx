"use client";
import { useEffect, useState } from "react";
import { getUserDraftProjects } from "@/badgehub-api-client/generated/swagger/private/private";
import styles from "./drafts.module.css";
import { Project } from "@/badgehub-api-client/generated/models";
import { getAuthenticatedRequestInit } from "@/app/getAuthenticatedRequestInit";
import { useAccessToken } from "@/app/hooks/useAccessToken";
import { SessionProvider } from "next-auth/react";

const AppPageComponent = ({ userId }: { userId: string }) => {
  const { token, session, decodedToken } = useAccessToken();
  const userName =
    decodedToken?.sub === userId ? session?.user?.name : decodedToken?.sub;
  const [apps, setApps] = useState<Project[] | undefined>(undefined);
  useEffect(() => {
    if (!token) {
      return;
    }
    getUserDraftProjects(userId, {}, getAuthenticatedRequestInit(token)).then(
      (r) => {
        if (r.status !== 200) {
          console.error("Failed to fetch draft projects:", r);
          return;
        }
        setApps(r.data);
      },
    );
  }, [token, userId]);
  // TODO loading state and error handling
  return (
    <article>
      <h2>{userName} Draft Projects</h2>
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
};

export default function AppPage({ params }: { params: { userId: string } }) {
  return (
    <SessionProvider>
      <AppPageComponent userId={params.userId} />
    </SessionProvider>
  );
}
