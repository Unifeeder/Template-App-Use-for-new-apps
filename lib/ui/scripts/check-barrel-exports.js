import { readdirSync, readFileSync } from "node:fs";
import { basename, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const componentsDir = resolve(root, "src/components");
const indexPath = resolve(root, "src/index.ts");

const componentFiles = readdirSync(componentsDir)
  .filter((f) => f.endsWith(".tsx"))
  .map((f) => basename(f, ".tsx"));

const indexContent = readFileSync(indexPath, "utf-8");

const exportedNames = new Set();
for (const line of indexContent.split("\n")) {
  const match = line.match(
    /export\s+(?:\*|{[^}]+})\s+from\s+["']\.\/components\/([^"']+)["']/,
  );
  if (match) {
    exportedNames.add(match[1]);
  }
}

const missing = componentFiles.filter((name) => !exportedNames.has(name));

if (missing.length > 0) {
  console.error("Barrel export drift detected in lib/ui/src/index.ts!");
  console.error(
    "The following components are missing from the barrel export:\n",
  );
  for (const name of missing.sort()) {
    console.error(`  - src/components/${name}.tsx`);
  }
  console.error(
    '\nAdd `export * from "./components/<name>"` to lib/ui/src/index.ts for each.',
  );
  process.exit(1);
} else {
  console.log(
    `All ${componentFiles.length} component files are exported in index.ts.`,
  );
}
