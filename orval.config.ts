import { defineConfig } from "orval";
import dotenv from "dotenv";

dotenv.config();

const baseUrl =
  process.env.BADGEHUB_API_BASEURL || "https://badgehub-api.p1m.nl";
export default defineConfig({
  badgehub: {
    output: {
      override: {
        useNativeEnums: true,
        mutator: {
          path: "./src/fetch-from-api.ts",
          name: "fetchWithBaseUrl",
        },
      },
      mode: "tags-split",
      target: "src/badgehub-api-client/generated/swagger",
      schemas: "src/badgehub-api-client/generated/models",
      client: "fetch",
    },

    input: {
      target: `${baseUrl}/swagger.json`,
    },
  },
});
