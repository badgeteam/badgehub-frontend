// TODO: This should probably be replaced with a generated client using OpenAPI
const DEFAULT_API_ROUTE = "http://localhost:8001/api/v3";

interface BadgehubApp {
  name: string;
  slug: string;
  category_slug: string;
  user_name: string;
}

export async function getApps() {
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

interface BadgehubCategory {
  name: string;
  slug: string;
}

export async function getCategories() {
  const response = await fetch(DEFAULT_API_ROUTE + "/categories");
  const data = await response.json();
  return data as BadgehubCategory[];
}
