"use server";

import { GetProjectsParams } from "@/badgehub-api-client/generated/models";
import {
  getProjects,
  getCategories,
  getDevices,
  getPrivate,
} from "@/badgehub-api-client/generated/swagger/public/public";

export async function getProjectData(
  searchParams: GetProjectsParams,
  token: string,
) {
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });
  const options: RequestInit = {
    headers,
  };
  return Promise.all([
    getProjects(searchParams, options),
    getCategories(options),
    getDevices(options),
  ]);
}

export async function getPrivateData(token: string) {
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });
  const options: RequestInit = {
    headers,
  };
  return getPrivate(options);
}
