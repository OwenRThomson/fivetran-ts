# Copilot Instructions for fivetran-ts

## Project Overview

- This is a TypeScript library for interacting with the Fivetran API, organized for modularity and type safety.
- The main client is implemented in `src/lib/FivetranClient.ts`, which wraps API endpoints and handles authentication.
- API requests and responses are strongly typed and separated into feature-based modules under `src/types/connections/`.

## Architecture & Patterns

- **Feature-based Type Organization:**
  - Each API function (e.g., getConnectionDetails, createConnection) has its own file in `src/types/connections/` for requests, responses, and shared types.
  - Shared types (e.g., `ConnectionData`, enums) are in `src/types/connections/types.ts`.
- **Client Structure:**
  - The `FivetranClient` class exposes grouped API methods (e.g., `connection`, `groups`).
  - Methods delegate to feature modules, passing a `makeRequest` function for HTTP calls.
- **Networking:**
  - All HTTP requests use `fetchWithErrorHandling` from `src/utils/networkFetch.ts`, which returns a discriminated union type (`NetworkResult<T>`).
  - Error handling is standardized; all API methods return either data or a structured error.
- **Authentication:**
  - Uses HTTP Basic Auth with credentials encoded via `js-base64`.

## Developer Workflow

- **Adding/Updating Endpoints:**
  - Create or update the relevant request/response types in `src/types/connections/`.
  - Implement the API method in `FivetranClient` or as a standalone function/module.
  - Use the feature-based type files for discoverability and maintainability.
- **Testing:**
  - No test runner is configured by default. Add tests as needed and update the `test` script in `package.json`.
- **Builds:**
  - No build step is required for pure TypeScript usage. If bundling is needed, add a build script.

## Conventions & Integration

- **Type Safety:**
  - Always use the types from `src/types/connections/types.ts` for shared fields.
  - Request/response types should reference shared types to avoid duplication.
- **Extending the Client:**
  - New API features should be added as new modules in `src/types/connections/` and exposed via the client.
  - Example: To add a new endpoint, create `src/types/connections/newFeature.ts` and update `FivetranClient`.
- **External Dependencies:**
  - Only `js-base64` is used for encoding credentials.

## Key Files & Directories

- `src/lib/FivetranClient.ts`: Main API client implementation.
- `src/utils/networkFetch.ts`: Centralized HTTP and error handling.
- `src/types/connections/`: Feature-based API type definitions and modules.
- `src/types/connections/types.ts`: Shared connection types and enums.

## Example Pattern

```typescript
// Example: Adding a new endpoint
// 1. Define types in src/types/connections/newEndpoint.ts
// 2. Implement method in FivetranClient, delegating to the new module
// 3. Use fetchWithErrorHandling for all HTTP calls
```

---

If any conventions or workflows are unclear, please ask for clarification or request examples from the codebase.
