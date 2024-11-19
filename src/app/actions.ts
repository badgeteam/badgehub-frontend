import { GetAppsParams } from "@/badgehub-api-client/generated/models";
import { getDevices, getCategories, getApps } from "@/badgehub-api-client/generated/swagger/public/public";

export async function getAppData(searchParams: GetAppsParams) {
  return Promise.all([getApps(searchParams), getCategories(), getDevices()]);
}
