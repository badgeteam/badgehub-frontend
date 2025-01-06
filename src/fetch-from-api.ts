"use server";

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
  const requestUrl = getUrl(url);
  const request = new Request(requestUrl, options);
  const response = await fetch(request);
  const data = await getBody(response);

  return { status: response.status, data } as T;
};
