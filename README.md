# badgehub-frontend

The webinterface to Badgehub that interfaces with the badgehub api backend

## Development

To start development, run

```bash
npm run dev
```

## Swagger/OpenAPI synchronization

Make sure the swagger file is always up to date.

When the API in `badgehub-api` has changed, synchronize by running

```bash
npm run swagger
```

This generates an api file and models in `src/badgehub-api-client/generated`.

## Tools

Tools used

- [Next.js](https://nextjs.org/) the React framework
- [Orval](https://orval.dev/) for generating code from Swagger