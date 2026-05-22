import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "docs/**",
    "*.js",
    "*.py",
    "check_browser_inserted.ts",
    "check_inserted.ts",
    "test_all_actions.ts",
    "test_db_local.ts",
  ]),
]);

export default eslintConfig;
