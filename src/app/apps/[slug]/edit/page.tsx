"use client";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import {
  changeDraftAppMetadata,
  deleteDraftFile,
  deleteProject,
  publishVersion,
  writeDraftFile,
} from "@/badgehub-api-client/generated/swagger/private/private";
import {
  FileMetadata,
  Project,
  ProjectSlug,
} from "@/badgehub-api-client/generated/models";

import styles from "@/styles/row.module.css";
import { FileList } from "@/components/FileList";
import { useDraftProject } from "@/hooks/useProject";
import { getAuthenticatedRequestInit } from "@/app/getAuthenticatedRequestInit";
import { useAccessToken } from "@/app/hooks/useAccessToken";
import editStyles from "./edit.module.css";

export default function EditProjectPage() {
  const { slug: projectSlug } = useParams() as { slug: ProjectSlug };
  const { token, decodedToken } = useAccessToken();
  const { projectDetails, triggerUpdate } = useDraftProject(projectSlug, token);
  const [projectUpdates, setProjectUpdates] = useState<Partial<Project>>({});
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  if (!projectDetails || !token) {
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
  const onClickSaveAndPublish = async () => {
    if (Object.keys(projectUpdates).length) {
      await changeDraftAppMetadata(
        projectSlug,
        projectUpdates,
        getAuthenticatedRequestInit(token),
      );
    }
    await publishVersion(projectSlug, getAuthenticatedRequestInit(token));
    triggerUpdate();
  };

  const onConfirmDelete = async () => {
    await deleteProject(projectSlug, getAuthenticatedRequestInit(token));
    document.location = `/users/${decodedToken?.sub}/drafts`;
  };
  const onDismissDelete = async () => {
    dialogRef?.current?.close();
  };
  const onClickDeleteButton = () => {
    dialogRef?.current?.show();
  };

  const uploadFile = async () => {
    const fileInput = document.getElementById(
      "fileUploadField",
    ) as HTMLInputElement;
    const files = fileInput.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    await writeDraftFile(
      projectSlug,
      file.name,
      {
        file,
      },
      getAuthenticatedRequestInit(token),
    );
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
    <>
      <dialog className={editStyles.closeDialog} ref={dialogRef}>
        <p>Are you sure you want to delete the project [{projectSlug}]?</p>
        <button onClick={onDismissDelete}>Cancel</button>
        <button onClick={onConfirmDelete}>OK</button>
      </dialog>
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
          <button onClick={onClickDeleteButton}>Delete</button>
          <button onClick={onClickSaveAndPublish}>Save & Publish</button>
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
    </>
  );
}
