import { defineConfig } from "orval";
import dotenv from "dotenv";

dotenv.config();

const baseUrl = process.env.BADGEHUB_API_BASEURL || "https://api-staging.badgehub.nl";
export default defineConfig({
  badgehub: {
    output: {
      override:{
        useNativeEnums: true,
      },
      mode: "tags-split",
      target: "src/badgehub-api-client/generated/swagger",
      schemas: "src/badgehub-api-client/generated/models",
      client: "fetch",
      baseUrl:
        baseUrl,
    },

    input: {
      target:
        `${baseUrl}/swagger.json`,
    },
  },
});
