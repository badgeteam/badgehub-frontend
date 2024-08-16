import Link from "next/link";
import styles from "./apps.module.css";
import {getApps, getCategories, getDevices} from "@/badgehub-api-client/generated/swagger/public/public";
import {Filter} from "@/components/Filter";

export interface SearchParams {
    category: string;
    device: string;
}

export default async function Listing({searchParams} : { searchParams: Partial<SearchParams> }) {
    const [apps, categories, devices]
        = await Promise.all([getApps(searchParams), getCategories(), getDevices()])

    return (
        <>
            <Filter categories={categories.data} devices={devices.data}/>

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
