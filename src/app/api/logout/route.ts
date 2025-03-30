import { redirect } from "next/navigation";

function handler() {
  redirect(
    `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout?client_id=${encodeURIComponent(process.env.KEYCLOAK_ID!)}`,
  );
}

export { handler as GET, handler as POST };
