<<<<<<< HEAD
"use client";

import { AppList } from "@/components/AppList";
import { SessionProvider } from "next-auth/react";
import { LoginButton } from "@/components/LoginButton";
import { useEffect, useState } from "react";
||||||| parent of 4ace4de (Render the app listing on the server)
"use client"

import {AppList} from "@/components/AppList";
import {SessionProvider} from "next-auth/react";
import {LoginButton} from "@/components/LoginButton";
import {useEffect, useState} from "react";
=======
import { AppList } from "@/components/AppList";
import { LoginButton } from "@/components/LoginButton";
import { useEffect, useState } from "react";
>>>>>>> 4ace4de (Render the app listing on the server)
import {
  getAppsResponse,
  getCategoriesResponse,
  getDevicesResponse,
} from "@/badgehub-api-client/generated/swagger/public/public";
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
      {data ? <AppList data={data} /> : <p>Loading new data...</p>}
    </>
  );
}
