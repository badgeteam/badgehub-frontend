import { FunctionComponent, useEffect, useState } from "react";
import {
  FileMetadata,
  ProjectSlug,
} from "@/badgehub-api-client/generated/models";
import { getApiBaseUrl } from "@/fetch-from-api";
import styles from "@/styles/row.module.css";

export const FileList: FunctionComponent<{
  files?: FileMetadata[];
  projectSlug: ProjectSlug;
  revisionAlias: "draft" | "latest";
  onClickDelete?: (file: FileMetadata) => unknown;
}> = ({ files, projectSlug, revisionAlias, onClickDelete }) => {
  const [apiBaseUrl, setApiBaseUrl] = useState<string | undefined>();
  useEffect(() => {
    getApiBaseUrl().then(setApiBaseUrl);
  }, []);

  if (!files) {
    return null;
  }
  return (
    <div id={"fileList"}>
      {files &&
        files.map((file) => {
          return (
            <div className={styles.row} key={file.full_path}>
              <p>name:</p>
              <a
                href={`${apiBaseUrl}/api/v3/projects/${projectSlug}/${revisionAlias}/files/${encodeURIComponent(file.full_path)}`}
                download
              >
                {file.full_path}
              </a>
              {file.full_path === "metadata.json" || !onClickDelete ? null : (
                <button onClick={() => onClickDelete(file)}>delete</button>
              )}
            </div>
          );
        })}
    </div>
  );
};
