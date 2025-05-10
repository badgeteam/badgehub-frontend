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
import { getApiBaseUrl } from "@/fetch-from-api";

export default function EditProjectPage() {
  const { slug } = useParams() as { slug: ProjectSlug };
  const [projectDetails, setProjectDetails] = useState<
    getDraftProjectResponse200["data"] | undefined
  >(undefined);
  const [projectCacheBuster, setProjectCacheBuster] = useState({});
  const triggerUpdate = () => setProjectCacheBuster({});
  const [projectUpdates, setProjectUpdates] = useState<Partial<Project>>({});
  useEffect(() => {
    getDraftProject(slug as string).then((r) => {
      if (r.status !== 200) {
        throw new Error("Failed to fetch project details");
      }
      setProjectDetails(r.data);
    });
  }, [slug, projectCacheBuster]);
  const [apiBaseUrl, setApiBaseUrl] = useState<string | undefined>();
  useEffect(() => {
    getApiBaseUrl().then(setApiBaseUrl);
  }, []);

  if (!projectDetails || !apiBaseUrl) {
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
      await changeDraftAppMetadata(slug, projectUpdates);
    }
    await publishVersion(slug);
    triggerUpdate();
  };
  const onClickSave = async () => {
    if (!Object.keys(projectUpdates).length) return;
    await changeDraftAppMetadata(slug, projectUpdates);
    triggerUpdate();
  };

  const uploadFile = async () => {
    const fileInput = document.getElementById(
      "fileUploadField",
    ) as HTMLInputElement;
    const files = fileInput.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    await writeDraftFile(slug, file.name, {
      file,
    });
    triggerUpdate();
  };

  async function deleteFile(file: FileMetadata) {
    await deleteDraftFile(slug, encodeURIComponent(file.full_path));
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
      <h1>Edit Project {slug}</h1>
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
        <div id={"fileList"}>
          {files &&
            files.map((file) => {
              return (
                <div className={styles.row} key={file.full_path}>
                  <p>name:</p>
                  <a
                    href={`${apiBaseUrl}/api/v3/projects/${slug}/draft/files/${encodeURIComponent(file.full_path)}`}
                    download
                  >
                    {file.full_path}
                  </a>
                  {file.full_path === "metadata.json" ? null : (
                    <button onClick={() => deleteFile(file)}>delete</button>
                  )}
                </div>
              );
            })}
        </div>
        <div className={styles.row}>
          <input id={"fileUploadField"} type="file" />
          <button onClick={uploadFile}>Upload</button>
        </div>
      </div>
    </main>
  );
}
