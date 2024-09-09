"use client"
import {SessionProvider} from "next-auth/react"
import {LoginButton} from "@/components/LoginButton";

export interface SearchParams {
    category: string;
    device: string;
}

export default function Listing({session}: any) {
    console.log('props.session', session);

    return (
        <SessionProvider session={session}>
            <h1>Account</h1>

            <LoginButton/>
        </SessionProvider>
    );
}
