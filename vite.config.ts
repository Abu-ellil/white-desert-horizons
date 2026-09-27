// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// The `mongodb` driver pulls in `whatwg-url` → `tr46`, which does
// `require("punycode/")` — a trailing-slash specifier npm/node accept but
// rolldown's native resolver rejects with ENOTDIR, breaking the SSR build.
// Alias both forms (client + nitro server) straight to the punycode entry file.
const punycodeEntry = new URL("node_modules/punycode/punycode.js", import.meta.url).pathname;

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    resolve: {
      alias: [
        { find: /^punycode\/$/, replacement: punycodeEntry },
        { find: /^punycode$/, replacement: punycodeEntry },
      ],
    },
  },
  nitro: {
    alias: {
      "punycode/": punycodeEntry,
      punycode: punycodeEntry,
    },
  },
});
