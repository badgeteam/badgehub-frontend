import { getAppDetails } from "@/badgehub-api-client/generated/swagger/public/public";

export default async function AppPage({
  params,
}: {
  params: { slug: string };
}) {
  const response = await getAppDetails(params.slug);
  const app = response.data;

  return (
    <article>
      <h2>{app.name}</h2>
      <p>Author: {app.user_name}</p>
      <p>Category: {app.category_slug}</p>
      {app.description}
      <h3>Supported Devices:</h3>
      <ul>
        {app.devices.map((device) => (
          <li key={device}>{JSON.stringify(device, null, 2)}</li>
        ))}
      </ul>
    </article>
  );
}
