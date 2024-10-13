"use server";

import {
  getApps,
  getCategories,
  getDevices,
} from "@/badgehub-api-client/generated/swagger/public/public";
import { GetAppsParams } from "@/badgehub-api-client/generated/models";

export async function getAppData(searchParams: GetAppsParams) {
  return Promise.all([getApps(searchParams), getCategories(), getDevices()]);
}
