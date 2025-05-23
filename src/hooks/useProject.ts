import { useEffect, useState } from "react";
import {
  getDraftProject,
  getDraftProjectResponse200,
} from "@/badgehub-api-client/generated/swagger/private/private";
import {
  getProject,
  getProjectResponse,
} from "@/badgehub-api-client/generated/swagger/public/public";

export const useProject = (projectSlug: string) => {
  const [projectDetails, setProjectDetails] = useState<
    getProjectResponse["data"] | undefined
  >(undefined);
  const [projectCacheBuster, setProjectCacheBuster] = useState({});
  const triggerUpdate = () => setProjectCacheBuster({});
  useEffect(() => {
    getProject(projectSlug as string).then((r) => {
      if (r.status !== 200) {
        throw new Error("Failed to fetch project details");
      }
      setProjectDetails(r.data);
    });
  }, [projectSlug, projectCacheBuster]);

  return {
    projectDetails,
    triggerUpdate,
  };
};
