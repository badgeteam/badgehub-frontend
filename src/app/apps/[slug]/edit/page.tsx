"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  changeDraftAppMetadata,
  deleteDraftFile,
  getDraftProject,
  getDraftProjectResponse200,
  publishVersion,
  writeDraftFile,
} from "@/badgehub-api-client/generated/swagger/private/private";
import {
  FileMetadata,
  Project,
  ProjectSlug,
} from "@/badgehub-api-client/generated/models";

import styles from "./edit.module.css";
import { FileList } from "@/components/FileList";

export default function EditProjectPage() {
  const { slug: projectSlug } = useParams() as { slug: ProjectSlug };
  const [projectDetails, setProjectDetails] = useState<
    getDraftProjectResponse200["data"] | undefined
  >(undefined);
  const [projectCacheBuster, setProjectCacheBuster] = useState({});
  const triggerUpdate = () => setProjectCacheBuster({});
  const [projectUpdates, setProjectUpdates] = useState<Partial<Project>>({});
  useEffect(() => {
    getDraftProject(projectSlug as string).then((r) => {
      if (r.status !== 200) {
        throw new Error("Failed to fetch project details");
      }
      setProjectDetails(r.data);
    });
  }, [projectSlug, projectCacheBuster]);

  if (!projectDetails) {
    return <main>Loading...</main>;
  }

  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const key = target.id;
    const value = target.value;
    setProjectUpdates((prev) => {
      if (!prev) return prev;
      return { ...prev, [key]: value };
    });
  };
  const onClickPublish = async () => {
    if (Object.keys(projectUpdates).length) {
      await changeDraftAppMetadata(projectSlug, projectUpdates);
    }
    await publishVersion(projectSlug);
    triggerUpdate();
  };
  const onClickSave = async () => {
    if (!Object.keys(projectUpdates).length) return;
    await changeDraftAppMetadata(projectSlug, projectUpdates);
    triggerUpdate();
  };

  const uploadFile = async () => {
    const fileInput = document.getElementById(
      "fileUploadField",
    ) as HTMLInputElement;
    const files = fileInput.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    await writeDraftFile(projectSlug, file.name, {
      file,
    });
    triggerUpdate();
  };

  async function deleteFile(file: FileMetadata) {
    await deleteDraftFile(projectSlug, encodeURIComponent(file.full_path));
    triggerUpdate();
  }

  const overWritableProps = [
    "name",
    "description",
    "license",
  ] as const satisfies (keyof Project)[];
  const files = projectDetails?.version?.files;
  return (
    <main>
      <h1>Edit Project {projectSlug}</h1>
      <pre>
        {JSON.stringify({
          name: projectDetails.name,
          description: projectDetails.description,
          revision: projectDetails.revision,
        })}
      </pre>
      <pre>updates: {JSON.stringify(projectUpdates)}</pre>
      <p>
        Here you can edit the project. You can add badges, and change the
        settings.
      </p>
      {overWritableProps.map((propKey) => {
        return (
          <div className={styles.row} key={propKey}>
            <p>{propKey}</p>
            <input id={propKey} onInput={onInput} />
          </div>
        );
      })}
      <div className={styles.row}>
        <button onClick={onClickSave}>Save</button>
        <button onClick={onClickPublish}>Publish</button>
      </div>
      <div id={"files"}>
        <p>Files</p>
        <p>Here you can add files to your project.</p>
        <p>current Files</p>
        <FileList
          files={files}
          revisionAlias={"draft"}
          projectSlug={projectSlug}
          onClickDelete={deleteFile}
        />
        <div className={styles.row}>
          <input id={"fileUploadField"} type="file" />
          <button onClick={uploadFile}>Upload</button>
        </div>
      </div>
    </main>
  );
}
