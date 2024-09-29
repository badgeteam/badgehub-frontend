import Link from "next/link";
import styles from "./AppList.module.css";
import { Filter } from "@/components/Filter";
import {
    getAppsResponse,
    getCategoriesResponse,
    getDevicesResponse
} from "@/badgehub-api-client/generated/swagger/public/public";

export function AppList({ data }: {
    data: [getAppsResponse, getCategoriesResponse, getDevicesResponse];
}) {
    const [apps, categories, devices] = data;

    return (
        <>
            <Filter categories={categories.data} devices={devices.data} />

            {apps.data.map((app) => (
                <article className={styles.appCard} key={app.slug}>
                    <Link href={`/apps/${app.slug}`}>
                        <h2>{app.name}</h2>
                    </Link>
                    <Link href={`/categories/${app.category_slug}`}>
                        {app.category_slug}
                    </Link>
                    <p>{app.user_name}</p>
                </article>
            ))}
        </>
    );
}
