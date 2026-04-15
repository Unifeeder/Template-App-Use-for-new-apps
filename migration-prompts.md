# Migration Prompts — Convert Vite-Only Apps to Unified Architecture

Use these prompts when you have an existing DP World app that was built with Vite-only (no Express backend) and needs to be converted to the unified full-stack architecture used by the Shipping Solutions template.

---

## Prompt 1: Add Express Backend + PostgreSQL to an Existing Vite App

Paste this into any Vite-only DP World app:

---

This app needs to be converted to the unified full-stack architecture used by our Shipping Solutions template. Currently it's Vite-only — I need Express added as the backend serving both API routes and the frontend in production, plus a PostgreSQL database wired up and ready to use.

Here's exactly what to do:

### A. Create `server/` directory with these files:

**`server/app.ts`** — Express 5 app with:
- `app.disable("x-powered-by")`
- `cors()` for dev, restricted in production
- `express.json()` and `express.urlencoded({ extended: true })`
- `/api` route mount
- API 404 handler: any `/api/*` route not matched returns `{ error: "Not found" }` with status 404
- In production only: `express.static()` serving `dist/public`, then SPA fallback via `app.get("/{*splat}", ...)` sending `index.html`
- Global error handler as last middleware: returns JSON `{ error: "Internal server error" }`, hides stack traces when `NODE_ENV=production`
- Static dir resolved via `path.dirname(process.argv[1])` (not `process.cwd()` or `import.meta.url`)

**`server/index.ts`** — Server entry:
- Listen on `SERVER_PORT || PORT || 3001`
- Add graceful shutdown: handle SIGTERM and SIGINT, call `server.close()` then `process.exit(0)`

**`server/routes/index.ts`** — Router that mounts sub-routers

**`server/routes/health.ts`** — GET `/healthz` returning `{ status: "ok" }`

**`server/build.ts`** — esbuild script:
- Bundle `server/index.ts` to `dist/index.cjs`
- Format: `cjs` (NOT esm — Express uses dynamic `require()`)
- Platform: `node`, target: `node20`
- Bundle everything except mark `pg-native` as external

**`tsconfig.server.json`** — Separate server tsconfig extending `../../tsconfig.base.json` with `include: ["server"]`

### B. Update `vite.config.ts`:
- Add proxy for `/api` in dev: `server.proxy: { "/api": "http://localhost:3001" }`
- Change `build.outDir` to `dist/public`
- Make PORT and BASE_PATH have fallback defaults so builds never fail: `const port = parseInt(process.env.PORT || "5173")` and `const basePath = process.env.BASE_PATH || "/"`

### C. Update `package.json` scripts:
```json
"dev": "concurrently --kill-others \"SERVER_PORT=3001 tsx watch server/index.ts\" \"vite --config vite.config.ts --host 0.0.0.0\"",
"build": "vite build --config vite.config.ts && tsx server/build.ts",
"start": "NODE_ENV=production node dist/index.cjs",
"typecheck": "tsc -p tsconfig.json --noEmit && tsc -p tsconfig.server.json --noEmit"
```

### D. Add server dependencies:
- `dependencies`: `express@^5`, `cors@^2`, `@workspace/db` (workspace:*)
- `devDependencies`: `@types/express@^5.0.6`, `@types/cors@^2.8.19`, `esbuild@^0.27`, `concurrently@^9`, `tsx` (from catalog)

### E. Wire up PostgreSQL database:
- The `@workspace/db` package already has Drizzle ORM + pg driver configured
- Add `@workspace/db` as a dependency: `"@workspace/db": "workspace:*"`
- Import the database in your server routes: `import { db } from "@workspace/db"`
- `DATABASE_URL` environment variable must be set (Replit provisions this automatically)
- Schema is defined in `lib/db/src/schema/index.ts` — add your tables there
- Run `pnpm --filter @workspace/db push` to push schema to the database
- The database is PostgreSQL, managed by Replit, available in both dev and production

### F. Update artifact.toml production config:
```toml
[services.web.production.run]
runner = "node"
args = ["artifacts/<app-name>/dist/index.cjs"]

[services.web.production.healthCheck]
path = "/api/healthz"
```

### Important:
- Express 5 uses `/{*splat}` for wildcard routes, NOT `*`
- CJS bundle format only — ESM breaks Express's dynamic `require()`
- Static dir resolution uses `process.argv[1]` to find the bundle location
- Do NOT use `cookie-parser` or `helmet` unless actually needed
- Keep all existing frontend code in `src/` — don't move it

---

## Prompt 2: Quick Health Check — Verify an App Uses the Right Architecture

Paste this to verify any app:

---

Check if this app uses the unified Express+Vite architecture with PostgreSQL:

1. Does it have a `server/` directory with `app.ts` and `index.ts`?
2. Does `package.json` have `express` as a dependency?
3. Does `vite.config.ts` have a proxy for `/api`?
4. Does the build script produce `dist/index.cjs` (server) + `dist/public/` (frontend)?
5. Does `artifact.toml` use `node` runner pointing to `dist/index.cjs`?
6. Does `package.json` have `@workspace/db` as a dependency?
7. Is `DATABASE_URL` set in the environment?
8. Can the server import `{ db } from "@workspace/db"` and query the database?

If any of these are missing, the app needs to be converted. Use the migration prompt from the Shipping Solutions template.

---

## Prompt 3: Move Existing API Routes from a Separate Backend

Paste this when an app has a separate API package:

---

This app has API routes in a separate package/service. Merge them into the unified Express server inside the main app:

1. Move all route files into `server/routes/`
2. Mount them in `server/routes/index.ts` via `router.use()`
3. Keep the health check at `/healthz`
4. Update the Vite proxy in `vite.config.ts` to forward `/api` to `http://localhost:3001`
5. If the old backend had its own database connection, switch to importing `{ db } from "@workspace/db"` instead
6. Remove the old separate backend package
7. Remove any old workflow/artifact registrations for the separate API server
8. Update `artifact.toml` to include `/api` in paths
9. Run `pnpm install` to clean up the lockfile

---

## Prompt 4: Add PostgreSQL to an App That Already Has Express But No Database

Paste this when an app has the unified architecture but is missing the database:

---

This app needs a PostgreSQL database wired up and ready to use:

1. Add `@workspace/db` as a dependency in `package.json`: `"@workspace/db": "workspace:*"`
2. The `lib/db` package already has Drizzle ORM configured with PostgreSQL
3. Import the database in your server routes: `import { db } from "@workspace/db"`
4. Define your tables in `lib/db/src/schema/index.ts` using Drizzle's `pgTable`
5. Push the schema to the database: `pnpm --filter @workspace/db push`
6. Make sure `DATABASE_URL` is set in the environment (Replit provisions this automatically)
7. Make sure `pg-native` is marked as external in your `server/build.ts` esbuild config
8. The database is available in both development and production environments

Example route using the database:
```typescript
import { Router } from "express";
import { db } from "@workspace/db";
import { myTable } from "@workspace/db/schema";

const router = Router();

router.get("/items", async (_req, res) => {
  const items = await db.select().from(myTable);
  res.json(items);
});

export default router;
```
