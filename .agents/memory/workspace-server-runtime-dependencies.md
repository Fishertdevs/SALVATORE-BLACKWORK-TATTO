---
name: Workspace server runtime dependencies
description: Runtime dependency resolution for bundled API-server code that imports shared workspace libraries.
---

When a bundled API server imports a workspace library whose code references an external package, declare that package as a direct runtime dependency of the server artifact as well. Typechecking and bundle creation can succeed while the deployed ESM bundle still fails to resolve an indirect package.

**Why:** A shared SDK dependency was externalized by the server build and was missing from the server's runtime module resolution.

**How to apply:** After adding a shared workspace library to the API server, check which external packages the emitted server bundle imports and ensure the server runtime installs them directly.
