"use client"

import {AppList} from "@/components/AppList";
import {SessionProvider} from "next-auth/react";
import {LoginButton} from "@/components/LoginButton";
import {useEffect, useState} from "react";
import {
    getAppsResponse,
    getCategoriesResponse,
    getDevicesResponse
} from "@/badgehub-api-client/generated/swagger/public/public";
import {getAppData} from "../actions";

export interface SearchParams {
    category: string;
    device: string;
}

export default function Listing({ searchParams }: {
    searchParams: Partial<SearchParams>;
}) {
    const [data, setData] = useState<[getAppsResponse, getCategoriesResponse, getDevicesResponse] | null>(null);

    useEffect(() => {
        getAppData(searchParams).then((data) => setData(data));
    }, [searchParams]);

    return (
        <SessionProvider>
            <LoginButton/>
            {data ? <AppList data={data}/> : <p>Loading new data...</p>}
        </SessionProvider>
    );
}
