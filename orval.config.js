import { defineConfig } from 'orval';

export default defineConfig({
    petstore: {
        output: {
            mode: 'tags-split',
            target: 'src/badgehub-api-client/generated/swagger',
            schemas: 'src/badgehub-api-client/generated/models',
            client: 'fetch',
            baseUrl: 'http://localhost:8001',
        },

        input: {
            target: 'src/badgehub-api-client/swagger.json',
        },
    },
});