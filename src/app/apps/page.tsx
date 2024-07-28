import { getApps } from "@/badgehub-api-client";
import Link from "next/link";

export default async function Listing() {
  const apps = await getApps();

  return (
    <>
      {apps.map((app) => (
        <article>
          <Link href={`/apps/${app.slug}`}>
            <h2>{app.name}</h2>
          </Link>
        </article>
      ))}
    </>
  );
}
