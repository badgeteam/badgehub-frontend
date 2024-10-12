import {signIn, signOut, useSession} from "next-auth/react"
import styles from "@/components/LoginButton/LoginButton.module.css";

export function Account() {
    const {data: session, status} = useSession();

    let html = <></>;

    switch (status) {
        case "loading":
            html = <p>...</p>;
            break;
        case "unauthenticated":
            html = <p>Sign in to acccess your account</p>;
            break;
        case "authenticated":
            html = <p>Welcome to your account</p>;
            break;
    }

    return <>
        <h1>Account</h1>
        <p>Token: {(session as any)?.accessToken}</p>
        {html}
    </>;
}