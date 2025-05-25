import { useAccessToken } from "@/app/hooks/useAccessToken";
import { decodeJwt } from "jose";

export function useBadgeHubUserId(): string | undefined {
  const { token } = useAccessToken();
  const decodedToken = token && decodeJwt(token);
  return decodedToken ? decodedToken.sub : undefined;
}
