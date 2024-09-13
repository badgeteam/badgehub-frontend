import {AppList} from "@/components/AppList";

export interface SearchParams {
  category: string;
  device: string;
}

export default async function Listing({
  searchParams,
}: {
  searchParams: Partial<SearchParams>;
}) {



  return (
    <>
      <AppList searchParams={searchParams}/>
    </>
  );
}
