import { useEffect, useState } from "react";
import {
  getDraftProject,
  getDraftProjectResponse200,
} from "@/badgehub-api-client/generated/swagger/private/private";
import {
  getProject,
  getProjectResponse,
} from "@/badgehub-api-client/generated/swagger/public/public";
import { Project } from "@/badgehub-api-client/generated/models";
import { useAccessToken } from "@/app/hooks/useAccessToken";
import { getAuthenticatedRequestInit } from "@/app/getAuthenticatedRequestInit";

export const useDraftProject = (
  projectSlug: string,
  token: string | undefined,
) => {
  const [projectDetails, setProjectDetails] = useState<Project | undefined>(
    undefined,
  );
  const [projectCacheBuster, setProjectCacheBuster] = useState({});
  const triggerUpdate = () => setProjectCacheBuster({});
  useEffect(() => {
    if (!token) {
      // TODO loading state and error handling
      return;
    }
    getDraftProject(projectSlug, getAuthenticatedRequestInit(token)).then(
      (r) => {
        if (r.status !== 200) {
          console.error("Failed to fetch project details:", r.data);
          throw new Error("Failed to fetch project details");
        }
        setProjectDetails(r.data);
      },
    );
  }, [projectSlug, token, projectCacheBuster]);

  return {
    projectDetails,
    triggerUpdate,
  };
};

export const useProject = (projectSlug: string) => {
  // TODO loading state and error handling
  const [projectDetails, setProjectDetails] = useState<Project | undefined>(
    undefined,
  );
  const [projectCacheBuster, setProjectCacheBuster] = useState({});
  const triggerUpdate = () => setProjectCacheBuster({});
  useEffect(() => {
    getProject(projectSlug).then((r) => {
      if (r.status !== 200) {
        console.error("Failed to fetch project details:", r.data);
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
