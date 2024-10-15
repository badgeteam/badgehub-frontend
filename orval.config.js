import { defineConfig } from "orval";
import dotenv from "dotenv";

/**
 * See https://orval.dev/
 */

dotenv.config();

export default defineConfig({
  badgehub: {
    output: {
      mode: "tags-split",
      target: "src/badgehub-api-client/generated/swagger",
      schemas: "src/badgehub-api-client/generated/models",
      client: "fetch",
      baseUrl:
        process.env.BADGEHUB_API_BASEURL || "https://api-staging.badgehub.nl",
      override: {
        mutator: {
          path: "./src/custom-fetch.ts",
          name: "customFetch",
        },
      },
    },

    input: {
      target:
        "https://raw.githubusercontent.com/badgeteam/badgehub-api/master/public/swagger.json",
    },
  },
});
