"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getDraftProject,
  getDraftProjectResponse200,
} from "@/badgehub-api-client/generated/swagger/private/private";

export default function EditProjectPage() {
  const { slug } = useParams();
  const [projectDetails, setProjectDetails] = useState<
    getDraftProjectResponse200["data"] | undefined
  >(undefined);
  useEffect(() => {
    getDraftProject(slug as string).then((r) => {
      if (r.status !== 200) {
        throw new Error("Failed to fetch project details");
      }
      setProjectDetails(r.data);
    });
  }, [slug]);
  return (
    <main>
      <h1>Edit Project {slug}</h1>
      <p>Editing project...</p>
      <pre>{JSON.stringify(projectDetails ?? "LOADING")}</pre>
    </main>
  );
}
