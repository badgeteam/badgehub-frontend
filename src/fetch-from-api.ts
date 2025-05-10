"use server";

const getBody = <T>(c: Response | Request): Promise<T> => {
  const contentType = c.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return c.json();
  }

  return c.text() as Promise<T>;
};

const apiBaseUrl =
  process.env.BADGEHUB_API_BASEURL || "https://badgehub-api.p1m.nl/";
const getUrl = (contextUrl: string): string => {
  return apiBaseUrl + contextUrl;
};

export async function getApiBaseUrl(): Promise<string> {
  return apiBaseUrl;
}

export const fetchWithBaseUrl = async <T>(
  url: string,
  options: RequestInit,
): Promise<T> => {
  const requestUrl = getUrl(url);
  const request = new Request(requestUrl, options);
  const response = await fetch(request);
  const data = await getBody(response);

  return { status: response.status, data } as T;
};
