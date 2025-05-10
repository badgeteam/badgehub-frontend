import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getPrivateData } from "@/app/actions";

/**
 * This is only demo code, to be removed later
 *
 * It's only for demonstrating the API authentication
 */

export default function AuthTest() {
  const { data: session } = useSession();
  const [data, setData] = useState<any>(null);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    async function getData() {
      const token = (session as any)?.accessToken;
      const data = await getPrivateData(token);
      console.log("data", data);
      setData(data);
    }

    if (trigger) {
      getData();
    }
  }, [session, trigger]);

  return (
    <>
      <div style={{ textAlign: "right" }}>
        <button
          style={{ padding: "5px 10px" }}
          onClick={() => {
            setTrigger(true);
          }}
        >
          Test API authentication
        </button>
        {data ? <p>{data.data.message}</p> : ""}
      </div>
    </>
  );
}
