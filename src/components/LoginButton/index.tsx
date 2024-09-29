import {useSession, signIn, signOut} from "next-auth/react"
import styles from "./LoginButton.module.css";

export function LoginButton() {
    const {data: session, status} = useSession();

    let html;

    switch (status) {
        case "loading":
            html = <p>...</p>;
            break;
        case "unauthenticated":
            html = <button className={styles.button} onClick={() => signIn()}>Sign in</button>;
            break;
        case "authenticated":
            html = <>
                {session?.user?.email}
                <button className={styles.button} onClick={() => signOut()}>Sign out</button>
            </>
            break;
    }

    return (
        <div className={styles.container}>
            {html}
        </div>
    )
}