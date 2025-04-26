import { getApp } from "@/badgehub-api-client/generated/swagger/public/public";

export default async function AppPage({
  params,
}: {
  params: { slug: string };
}) {
  const response = await getApp(params.slug);
  if (response.status === 404) {
    return <p>App {params.slug} not found</p>;
  }

  const app = response.data;
  return (
    <article>
      <h2>{app.name}</h2>
      <p>Author: {app.user_name}</p>
      <p>Category: {app.category}</p>
      {app.description}
      <h3>Supported Devices:</h3>
      <ul>
        {app.badges?.map((device) => (
          <li key={device}>{JSON.stringify(device, null, 2)}</li>
        ))}
      </ul>
    </article>
  );
}
