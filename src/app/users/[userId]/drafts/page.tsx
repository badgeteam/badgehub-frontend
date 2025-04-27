import { getUserDraftProjects } from "@/badgehub-api-client/generated/swagger/private/private";

export default async function AppPage({
  params,
}: {
  params: { userId: string };
}) {
  const response = await getUserDraftProjects(params.userId);
  if (response.status === 404) {
    return <p>No draft apps found for user {params.userId}</p>;
  }

  const apps = response.data;
  return (
    <article>
      <h2>{params.userId} Draft Projects</h2>
      <ul>
        {apps?.map((app) => (
          <li key={app.slug}>
            <h3>{app.name}</h3>
            <p>{app.description}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
