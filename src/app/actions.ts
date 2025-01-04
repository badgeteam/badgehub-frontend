"use server";

import { GetAppsParams } from "@/badgehub-api-client/generated/models";
import {
  getApps,
  getCategories,
  getDevices,
} from "@/badgehub-api-client/generated/swagger/public/public";

let token = "";

export async function getAppData(searchParams: GetAppsParams) {
  console.log("getAppData searchParams", searchParams);
  return Promise.all([getApps(searchParams), getCategories(), getDevices()]);
}

export async function setToken(tokenIn: string) {
  console.log("### setToken", tokenIn);

  token = tokenIn;
}

export async function getToken() {
  console.log("### getToken", token);

  return token;
}
