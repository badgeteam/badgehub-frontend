"use client";
import { FileList } from "@/components/FileList";
import { useProject } from "@/hooks/useProject";

export default function AppPage({ params }: { params: { slug: string } }) {
  const { projectDetails } = useProject(params.slug);
  if (!projectDetails) {
    return <p>App {params.slug} not found</p>;
  }

  return (
    <article>
      <h2>{projectDetails.name}</h2>
      <p>Author: {projectDetails.idp_user_id}</p>
      <p>Category: {projectDetails.category}</p>
      {projectDetails.description}
      <h3>Supported Devices:</h3>
      <ul>
        {projectDetails.badges?.map((device) => (
          <li key={device}>{JSON.stringify(device, null, 2)}</li>
        ))}
      </ul>
      <h3>Files:</h3>
      <FileList
        projectSlug={projectDetails.slug}
        revisionAlias={"latest"}
        files={projectDetails.version?.files}
      />
    </article>
  );
}
