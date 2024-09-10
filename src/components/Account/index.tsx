import {useSession} from "next-auth/react"

export function Account() {
    const {data: session} = useSession();

    return <>
        <h1>Account</h1>
        <p>{session ? "Welcome to your account" : "Sign in to acccess your account"}</p>
    </>;
}