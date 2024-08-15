import { getApp } from "@/badgehub-api-client";

export default async function AppPage({
  params,
}: {
  params: { slug: string };
}) {
  const app = await getApp(params.slug);

  return (
    <article>
      <h2>{app.name}</h2>
      <p>Author: {app.user_name}</p>
      <p>Category: {app.category_slug}</p>
      {app.description}
      <h3>Supported Devices:</h3>
      <ul>
        {app.devices.map((device) => (
          <li key={device.slug}>{JSON.stringify(device, null, 2)}</li>
        ))}
      </ul>
    </article>
  );
}
