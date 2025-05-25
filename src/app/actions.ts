"use server";

import { GetProjectsParams } from "@/badgehub-api-client/generated/models";
import {
  getCategories,
  getDevices,
  getPrivate,
  getProjects,
} from "@/badgehub-api-client/generated/swagger/public/public";

export async function getProjectData(searchParams: GetProjectsParams) {
  return Promise.all([
    getProjects(searchParams),
    getCategories(),
    getDevices(),
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
