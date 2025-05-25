import { useAccessToken } from "@/app/hooks/useAccessToken";

export function useBadgeHubUserId(): string | undefined {
  const { decodedToken } = useAccessToken();
  return decodedToken?.sub;
}
