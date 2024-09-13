"use client"
import {AppList} from "@/components/AppList";
import {SessionProvider} from "next-auth/react";
import {LoginButton} from "@/components/LoginButton";
import {Suspense} from "react";

export interface SearchParams {
    category: string;
    device: string;
}

export default function Listing({
                                    searchParams,
                                }: {
    searchParams: Partial<SearchParams>;
}) {


    return (
        <SessionProvider>
            <LoginButton/>
            <Suspense fallback={<p>Loading...</p>}>
                <AppList searchParams={searchParams}/>
            </Suspense>
        </SessionProvider>
    );
}
