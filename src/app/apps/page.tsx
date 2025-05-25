"use client";

import { AppList } from "@/components/AppList";
import { LoginButton } from "@/components/LoginButton";
import { useEffect, useState } from "react";
import {
  getCategoriesResponse,
  getDevicesResponse,
  getProjectsResponse,
} from "@/badgehub-api-client/generated/swagger/public/public";
import { getProjectData } from "../actions";
import { useAccessToken } from "@/app/hooks/useAccessToken";

export interface SearchParams {
  category: string;
  device: string;
}

export default function Listing({
  searchParams,
}: {
  searchParams: Partial<SearchParams>;
}) {
  const { status, token } = useAccessToken();

  const [data, setData] = useState<
    [getProjectsResponse, getCategoriesResponse, getDevicesResponse] | null
  >(null);

  useEffect(() => {
    async function getData() {
      if (status === "loading") return;
      const data = await getProjectData(searchParams);
      setData(data);
    }

    getData();
  }, [searchParams, status, token]);

  return (
    <>
      <LoginButton />
      {data ? <AppList data={data} /> : <p>Loading new data...</p>}
    </>
  );
}
