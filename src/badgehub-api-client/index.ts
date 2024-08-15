// TODO: This should probably be replaced with a generated client using OpenAPI
const DEFAULT_API_ROUTE = "http://localhost:8001/api/v3";

interface BadgehubApp {
  name: string;
  slug: string;
  category_slug: string;
  user_name: string;
  devices: BadgehubDevice[];
}

export async function getApps(options?: {category?: string, device?: string}) {
  const searchParams = new URLSearchParams(options);
  const path = searchParams.size == 0 ? '/apps' : `/apps?${searchParams}`;
  const response = await fetch(DEFAULT_API_ROUTE + path);
  const data = await response.json();
  return data as BadgehubApp[];
}

export async function getAllApps() {
  const response = await fetch(DEFAULT_API_ROUTE + "/apps");
  const data = await response.json();
  return data as BadgehubApp[];
}

type BadgehubAppDetail = BadgehubApp & {
  description: string;
  devices: string[];
};

export async function getApp(slug: string) {
  const response = await fetch(DEFAULT_API_ROUTE + `/apps/${slug}`);
  const data = await response.json();
  return data as BadgehubAppDetail;
}

export interface BadgehubCategory {
  name: string;
  slug: string;
}

export async function getCategories() {
  const response = await fetch(DEFAULT_API_ROUTE + "/categories");
  const data = await response.json();
  return data as BadgehubCategory[];
}

export interface BadgehubDevice {
  name: string;
  slug: string;
}

export async function getDevices() {
  const response = await fetch(DEFAULT_API_ROUTE + "/devices");
  const data = await response.json();
  return data as BadgehubDevice[];
}