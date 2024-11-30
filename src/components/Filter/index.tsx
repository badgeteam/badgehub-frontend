"use client";

import styles from "./Filter.module.css";
import { useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Category, Badge } from "@/badgehub-api-client/generated/models";

type FilterProps = {
  categories: Category[];
  devices: Badge[];
};

export function Filter({ categories, devices }: FilterProps) {
  const router = useRouter();
  const params = useSearchParams();

  const inputCategoryRef = useRef<HTMLSelectElement>(null);
  const inputDeviceRef = useRef<HTMLSelectElement>(null);

  const setUrlParams = () => {
    const searchParams = new URLSearchParams();

    if (inputCategoryRef.current) {
      if (inputCategoryRef.current.value != "") {
        searchParams.set("category", inputCategoryRef.current.value);
      } else {
        searchParams.delete("category");
      }
    }

    if (inputDeviceRef.current) {
      if (inputDeviceRef.current.value != "") {
        searchParams.set("device", inputDeviceRef.current.value);
      } else {
        searchParams.delete("device");
      }
    }

    router.replace(`?${searchParams}`);
  };

  return (
    <section className={styles.appFilter}>
      Filter:
      <select
        name="categories"
        id="categories"
        onChange={setUrlParams}
        ref={inputCategoryRef}
        defaultValue={params.get("category") || ""}
      >
        <option value="" key="all">
          All
        </option>
        {categories.map((category) => (
          <option value={category.slug} key={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
      <select
        name="devices"
        id="devices"
        onChange={setUrlParams}
        ref={inputDeviceRef}
        defaultValue={params.get("device") || ""}
      >
        <option value="" key="all">
          All
        </option>
        {devices.map((category) => (
          <option value={category.slug} key={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
    </section>
  );
}
