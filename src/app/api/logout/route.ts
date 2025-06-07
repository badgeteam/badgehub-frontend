import { redirect } from "next/navigation";

function handler() {
  redirect(
    // `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout?client_id=${encodeURIComponent(process.env.KEYCLOAK_ID!)}&post_logout_redirect_uri=${encodeURIComponent(process.env.BADGEHUB_API_BASEURL!)}`,
    `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout?client_id=${encodeURIComponent(process.env.KEYCLOAK_ID!)}&post_logout_redirect_uri=${encodeURIComponent("https://badgehub.p1m.nl/")}`,
  );
}

export { handler as GET, handler as POST };
