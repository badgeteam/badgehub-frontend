import { useSession } from "next-auth/react";
import AuthTest from "@/components/AuthTest";

export function Account() {
  const { data: session, status } = useSession();

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

  return (
    <>
      <h1>Account</h1>
      <AuthTest />
      <p>JWT: {JSON.stringify(session, null, 2)}</p>
      {html}
    </>
  );
}
