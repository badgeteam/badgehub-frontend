import { defineConfig } from "orval";

export default defineConfig({
  petstore: {
    output: {
      mode: "tags-split",
      target: "src/badgehub-api-client/generated/swagger",
      schemas: "src/badgehub-api-client/generated/models",
      client: "fetch",
      baseUrl: process.env.BADGEHUB_API_BASEURL || "https://api-staging.badgehub.nl",
    },

    input: {
      target:
        "https://raw.githubusercontent.com/badgeteam/badgehub-api/master/public/swagger.json",
    },
  },
});
