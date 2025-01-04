"use server";

import { getToken } from "@/app/actions";

const getBody = <T>(c: Response | Request): Promise<T> => {
  const contentType = c.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return c.json();
  }

  return c.text() as Promise<T>;
};

const baseUrl =
  process.env.BADGEHUB_API_BASEURL || "https://api-staging.badgehub.nl";
const getUrl = (contextUrl: string): string => {
  return baseUrl + contextUrl;
};

export const fetchWithBaseUrl = async <T>(
  url: string,
  options: RequestInit,
): Promise<T> => {
  const token = await getToken();

  const requestUrl = getUrl(url);

  const customOptions: RequestInit = {
    ...options,
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  };

  const request = new Request(requestUrl, customOptions);

  const response = await fetch(request);
  const data = await getBody(response);

  return { status: response.status, data } as T;
};
