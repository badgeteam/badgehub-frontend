import { useSession } from "next-auth/react";
import * as jose from "jose";

// async function verify() {
//   console.log("run verify()");
//
//   const token =
//     "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJsRTVzX1JiTGZkVzFMQk9Hdl9RNE1MZktoRmJVNXJ6dkZsVEc4UGZyQzVzIn0.eyJleHAiOjE3Mjg5OTY4OTksImlhdCI6MTcyODk5NjU5OSwiYXV0aF90aW1lIjoxNzI4OTk2NTk5LCJqdGkiOiI0NGU3NmI3ZS01MDdjLTRhYTQtOTcwYS0yNDA1M2QxNjVlNjMiLCJpc3MiOiJodHRwczovL2xlbXVyLTExLmNsb3VkLWlhbS5jb20vYXV0aC9yZWFsbXMvYmFkZ2VodWIiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFjY291bnQiXSwic3ViIjoiNjhiNmFiZjgtNjBhNC00MWFlLTlmMTQtYTc3ZmQ2M2EwMjA3IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYmFkZ2VodWIiLCJzaWQiOiIxNDExYzZhNi0wMWUxLTQ4ODMtOGMxYS1mYzZjMzk1OGYxYWIiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8qIiwiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1iYWRnZWh1YiIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJ2aWV3LWlkZW50aXR5LXByb3ZpZGVycyIsInZpZXctcmVhbG0iLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsInJlYWxtLWFkbWluIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJiYWRnZWh1YiBBZG1pbmlzdHJhdG9yIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW4iLCJnaXZlbl9uYW1lIjoiYmFkZ2VodWIiLCJmYW1pbHlfbmFtZSI6IkFkbWluaXN0cmF0b3IiLCJlbWFpbCI6ImFkbWluQGVtYWlsLmNvbSJ9.Hl2ZlD95F565_wJE6J9IbcBJbJGqroLF6Z8q8_7hrFc3n8g0xPhcRngL0Qo1TrZqK2lM5MIDSgBm-l_Ei5Xg2NEs2qqpMBioaTudSz5Na3REk8fhLgCeae1W58LWmH7cI6Cbi05NQr4LGrFBmziHxXLAqcUvqXqQgmKL6QHNYt7Sp6nuJQWdnqyJG2D7xGnL6K6-B6tkqnE6OlzXoqcWuY8zXpuSwv1ptyjF6W6_dxRRPzAnI9DyOaYrjcfTgaZ31GXo4p30vUfX_0j26yqzyLJOTN6DBvGMvo_y8nHPt1ku7knfNouO6w5V0tnPcIReQpflZcy5rDqa0FhZIgthlA";
//
//   // const pubkey = new TextEncoder().encode(
//   //   "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArW3sdwzFuuZdDg1WJ2aTbvGTfJHPQsyhcT3AlI0J8kSO5i2b10svFNnqYU3LZHC5Arhgv+IEi0bSQOOE5WKX2y7LHVhZADvKu5XtvQ1MGT9Q0h9LqXyugiIGCMAfS8k97iMYJ4OIrfzElmiFlgAzGiATNrRVdGWieX02L5EFxEl5ovFszQ+eg0gmT9+QkQBz3+XteJIrETYhZT5YZY39XMvU45gm0vzkoX36R65VyhKQteYYEbcR4jL49Vs7BZ4O7EUTiF58Ag+XqLpV+W32B/Let/GNjIIV3WUA0Yq2jXeTnufVkKkv0m5E9ogE+gov4o/FDBMIz972+iNuq1u+WwIDAQAB",
//   // );
//
//   const alg = "RS256";
//
//   try {
//     console.log("importSPKI");
//     //   const spki = `-----BEGIN PUBLIC KEY-----
//     // MIMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArW3sdwzFuuZdDg1WJ2aTbvGTfJHPQsyhcT3AlI0J8kSO5i2b10svFNnqYU3LZHC5Arhgv+IEi0bSQOOE5WKX2y7LHVhZADvKu5XtvQ1MGT9Q0h9LqXyugiIGCMAfS8k97iMYJ4OIrfzElmiFlgAzGiATNrRVdGWieX02L5EFxEl5ovFszQ+eg0gmT9+QkQBz3+XteJIrETYhZT5YZY39XMvU45gm0vzkoX36R65VyhKQteYYEbcR4jL49Vs7BZ4O7EUTiF58Ag+XqLpV+W32B/Let/GNjIIV3WUA0Yq2jXeTnufVkKkv0m5E9ogE+gov4o/FDBMIz972+iNuq1u+WwIDAQAB
//     // -----END PUBLIC KEY-----`;
//     // const publicKey = await jose.importSPKI(spki, alg);
//
//     // jwk from pasting jwt in https://jwt.io/
//     const jwk = {
//       e: "AQAB",
//       kty: "RSA",
//       n: "rW3sdwzFuuZdDg1WJ2aTbvGTfJHPQsyhcT3AlI0J8kSO5i2b10svFNnqYU3LZHC5Arhgv-IEi0bSQOOE5WKX2y7LHVhZADvKu5XtvQ1MGT9Q0h9LqXyugiIGCMAfS8k97iMYJ4OIrfzElmiFlgAzGiATNrRVdGWieX02L5EFxEl5ovFszQ-eg0gmT9-QkQBz3-XteJIrETYhZT5YZY39XMvU45gm0vzkoX36R65VyhKQteYYEbcR4jL49Vs7BZ4O7EUTiF58Ag-XqLpV-W32B_Let_GNjIIV3WUA0Yq2jXeTnufVkKkv0m5E9ogE-gov4o_FDBMIz972-iNuq1u-Ww",
//     };
//     const publicKey = await jose.importJWK(jwk, alg);
//     console.log("start verification");
//     const { payload, protectedHeader } = await jose.jwtVerify(token, publicKey);
//     console.log("result", payload, protectedHeader);
//   } catch (error) {
//     console.error(error);
//   }
// }

// function verifySync() {
//   verify();
//   return <p>Verification...</p>;
// }

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
      <p>JWT: {(session as any)?.accessToken}</p>
      {html}
    </>
  );
}
