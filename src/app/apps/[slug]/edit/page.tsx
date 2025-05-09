"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  changeDraftAppMetadata,
  getDraftProject,
  getDraftProjectResponse200,
} from "@/badgehub-api-client/generated/swagger/private/private";
import { Project, ProjectSlug } from "@/badgehub-api-client/generated/models";

export default function EditProjectPage() {
  const { slug } = useParams();
  const [projectDetails, setProjectDetails] = useState<
    getDraftProjectResponse200["data"] | undefined
  >(undefined);
  const [projectCacheBuster, setProjectCacheBuster] = useState({});
  const [projectUpdates, setProjectUpdates] = useState<Partial<Project>>({});
  useEffect(() => {
    getDraftProject(slug as string).then((r) => {
      if (r.status !== 200) {
        throw new Error("Failed to fetch project details");
      }
      setProjectDetails(r.data);
    });
  }, [slug, projectCacheBuster]);
  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const key = target.id;
    const value = target.value;
    setProjectUpdates((prev) => {
      if (!prev) return prev;
      return { ...prev, [key]: value };
    });
  };
  const onClickSave = async () => {
    if (!projectUpdates) return;
    await changeDraftAppMetadata(slug as ProjectSlug, projectUpdates);
    setProjectCacheBuster({});
  };
  return (
    <main>
      <h1>Edit Project {slug}</h1>
      <pre>
        {projectDetails
          ? JSON.stringify({
              name: projectDetails.name,
              description: projectDetails.description,
            })
          : "LOADING"}
      </pre>
      <pre>updates: {JSON.stringify(projectUpdates)}</pre>
      <p>
        Here you can edit the project. You can add badges, and change the
        settings.
      </p>
      <div>
        <p>name</p>
        <input id={"name"} onInput={onInput} />
      </div>
      <div>
        <p>description</p>
        <input id={"description"} onInput={onInput} />
      </div>
      <button onClick={onClickSave}>Save</button>
    </main>
  );
}
