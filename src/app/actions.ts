"use server";

import { GetAppsParams } from "@/badgehub-api-client/generated/models";
import {
  getApps,
  getCategories,
  getDevices,
} from "@/badgehub-api-client/generated/swagger/public/public";

/**
 * TODO: rewrite to Next.js conforming code.
 *
 * I don't think this is the right Next.js way to do this.
 *
 * With setToken, the token is set from the browser to the Next.js server.
 * The server code can then read the token with getToken().
 *
 * It works, but it feels like a hack. Next.js has a way to handle this better, right?
 */

let token = "";

export async function getAppData(searchParams: GetAppsParams) {
  // console.log("getAppData searchParams", searchParams);
  return Promise.all([getApps(searchParams), getCategories(), getDevices()]);
}

export async function setToken(tokenIn: string) {
  // console.log("### setToken", tokenIn);
  token = tokenIn;
}

export async function getToken() {
  // console.log("### getToken", token);
  return token;
}
