import { useSession } from "next-auth/react";

export const useAccessToken = () => {
  const { data: session, status } = useSession();
  const token = (session as any)?.accessToken as string | undefined;
  return { session, status, token };
};
