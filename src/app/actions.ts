"use server";

import { GetAppsParams } from "@/badgehub-api-client/generated/models";
import {
  getApps,
  getCategories,
  getDevices,
} from "@/badgehub-api-client/generated/swagger/public/public";

export async function getAppData(searchParams: GetAppsParams, token: string) {
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });
  const options: RequestInit = {
    headers,
  };
  return Promise.all([
    getApps(searchParams, options),
    getCategories(options),
    getDevices(options),
  ]);
}

export async function getLogoutUrl() {
  return process.env.KEYCLOAK_LOGOUT_URL;
}
