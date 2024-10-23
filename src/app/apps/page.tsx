import { AppList } from "@/components/AppList";
import { LoginButton } from "@/components/LoginButton";
import { getAppData } from "../actions";

export interface SearchParams {
  category: string;
  device: string;
}

export default async function Listing({
  searchParams,
}: {
  searchParams: Partial<SearchParams>;
}) {
  let data;
  try {
    // TODO add caching
    data = await getAppData(searchParams);
  } catch (e) {
    if (!(e instanceof Error)) {
      return <p>Caught object that wasn&amp;t an error.</p>;
    }
    return (
      <>
        <p>Error while rendering</p>
        <code>
          <pre>{JSON.stringify(e.message)}</pre>
        </code>
      </>
    );
  }

  return (
    <>
      <LoginButton />
      <AppList data={data} />
    </>
  );
}
