"use client";

import { createProject } from "@/badgehub-api-client/generated/swagger/private/private";
import { useState } from "react";

export default function ProjectPage() {
  const [slug, setSlug] = useState("");
  const [error, setError] = useState<string | null>(null);
  const saveProject = async () => {
    try {
      const result = await createProject(slug, {});

      if (!result.status.toString().startsWith("2")) {
        setError("Failed to create project: code" + result.status);
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
}
