"use client";

import { AppList } from "@/components/AppList";
import { SessionProvider, useSession } from "next-auth/react";
import { LoginButton } from "@/components/LoginButton";
import { useEffect, useState } from "react";
import {
  getProjectsResponse,
  getCategoriesResponse,
  getDevicesResponse,
} from "@/badgehub-api-client/generated/swagger/public/public";
import { getProjectData } from "../actions";

export interface SearchParams {
  category: string;
  device: string;
}

export default function Listing({
  searchParams,
}: {
  searchParams: Partial<SearchParams>;
}) {
  const { data: session } = useSession();
  const [data, setData] = useState<
    [getProjectsResponse, getCategoriesResponse, getDevicesResponse] | null
  >(null);

  useEffect(() => {
    async function getData() {
      const token = (session as any)?.accessToken;
      const data = await getProjectData(searchParams, token);
      setData(data);
    }

    getData();
  }, [searchParams, session]);

  return (
    <>
      <LoginButton />
      {data ? <AppList data={data} /> : <p>Loading new data...</p>}
    </>
  );
}
