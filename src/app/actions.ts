"use server";

import { GetAppsParams } from "@/badgehub-api-client/generated/models";
import {
  getApps,
  getCategories,
  getDevices,
} from "@/badgehub-api-client/generated/swagger/public/public";

let token = "";

export async function getAppData(
  searchParams: GetAppsParams,
  newToken: string,
) {
  token = newToken;
  return Promise.all([getApps(searchParams), getCategories(), getDevices()]);
}

export async function getToken() {
  // console.log("### getToken", token);
  return token;
}
