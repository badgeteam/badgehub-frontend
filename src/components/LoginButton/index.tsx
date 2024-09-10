import {useSession, signIn, signOut} from "next-auth/react"
import styles from "./LoginButton.module.css";

export function LoginButton() {
    const {data: session} = useSession();

    if (session) {
        return (
            <div className={styles.container}>
                {session?.user?.email}
                <button className={styles.button} onClick={() => signOut()}>Sign out</button>
            </div>
        )
    }
    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={() => signIn()}>Sign in</button>
        </div>
    )
}