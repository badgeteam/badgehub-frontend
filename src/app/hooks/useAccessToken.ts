import { useSession } from "next-auth/react";
import { decodeJwt } from "jose";

export const useAccessToken = () => {
  const { data: session, status } = useSession();
  const token = (session as any)?.accessToken as string | undefined;
  const decodedToken = token === undefined ? undefined : decodeJwt(token);
  return { session, status, token, decodedToken };
};
