"use client"

import {AppList} from "@/components/AppList";
import {SessionProvider, useSession} from "next-auth/react";
import {LoginButton} from "@/components/LoginButton";
import {useEffect, useState} from "react";
import {
    getAppsResponse,
    getCategoriesResponse,
    getDevicesResponse
} from "@/badgehub-api-client/generated/swagger/public/public";
import {getAppData, setToken} from "../actions";

export interface SearchParams {
    category: string;
    device: string;
}

export default function Listing({ searchParams }: {
    searchParams: Partial<SearchParams>;
}) {
    const {data: session, status} = useSession();
    const [data, setData] = useState<[getAppsResponse, getCategoriesResponse, getDevicesResponse] | null>(null);

    const token = (session as any)?.accessToken;

    // console.log("### Listing", (session as any)?.accessToken);

    // TODO: rewrite
    // TODO: first self sign?
    setToken(token);

    useEffect(() => {
        getAppData(searchParams).then((data) => setData(data));
    }, [searchParams]);

    return (
        <>
            <LoginButton/>
            {data ? <AppList data={data}/> : <p>Loading new data...</p>}
        </>
    );
}
