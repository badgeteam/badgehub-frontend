import Link from "next/link";
import styles from "./AppList.module.css";
import { Filter } from "@/components/Filter";
import {fetchAppData} from "@/app/lib/fetch";

export interface SearchParams {
    category: string;
    device: string;
}

export async function AppList({
                                          searchParams,
                                      }: {
    searchParams: Partial<SearchParams>;
}) {

    const [apps, categories, devices] = await fetchAppData(searchParams);

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
