import { useSession } from "next-auth/react";

export function useBadgeHubUserId(): number | undefined | null {
  const { data: session } = useSession();
  return session?.user ? 0 : undefined; // TODO user id mapping
}
