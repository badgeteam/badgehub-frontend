"use server";

import { getToken } from "@/app/actions";

export const customFetch = async <T>(
  url: string,
  options: RequestInit,
): Promise<T> => {
  const token = await getToken();

  const customOptions: RequestInit = {
    ...options,
    headers: [["Authorization", `Bearer ${token}`]],
  };

  console.log("customFetch url", url);

  const request = new Request(url, customOptions);

  console.log("customFetch request", request);

  const response = await fetch(request);
  const data = await response.json();

  return { status: response.status, data } as T;
};
