"use client";

import { createProject } from "@/badgehub-api-client/generated/swagger/private/private";
import { useState } from "react";
import { getAuthenticatedRequestInit } from "@/app/getAuthenticatedRequestInit";
import { useAccessToken } from "@/app/hooks/useAccessToken";
import { SessionProvider } from "next-auth/react";

const CreateProject = () => {
  const { status, token } = useAccessToken();
  const [slug, setSlug] = useState("");
  const [error, setError] = useState<string | null>(null);
  if (!token) {
    return <p>You must be logged in to create a project.</p>;
  }
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  const saveProject = async () => {
    try {
      const result = await createProject(
        slug,
        {},
        getAuthenticatedRequestInit(token),
      );

      if (!result.status.toString().startsWith("2")) {
        console.error("Failed to create project:", result.data);
        setError("Failed to create project: code" + result.status);
        return;
      }
      document.location = `/apps/${slug}/edit`;
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };
  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }
  return (
    <main>
      <h1>Create Project</h1>
      <p>Here you can create a new project.</p>
      <input
        type="text"
        placeholder="Enter project slug"
        onChange={(e) => setSlug(e.target.value)}
        value={slug}
      />
      <button onClick={saveProject}>Save Project</button>
    </main>
  );
};

export default function ProjectPage() {
  return (
    <SessionProvider>
      <CreateProject />
    </SessionProvider>
  );
}
