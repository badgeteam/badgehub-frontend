"use client"
import {SessionProvider, useSession} from "next-auth/react"
import {LoginButton} from "@/components/LoginButton";
import {Account} from "@/components/Account";

export default function Listing() {
    return (
        <SessionProvider>
            <LoginButton/>

            <Account/>

        </SessionProvider>
    );
}
