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

// `tslib` is left as a bare external import inside the prebuilt _libs chunks
// (e.g. @radix-ui/react-select) but the prebuilt deploy to Vercel ships
// without node_modules — the runtime then 500s on every SSR request with
// ERR_MODULE_NOT_FOUND 'tslib'. Alias it to its actual entry file so it is
// bundled like the rest of the libs.
const tslibEntry = new URL("node_modules/tslib/tslib.es6.mjs", import.meta.url).pathname;

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
        { find: /^tslib$/, replacement: tslibEntry },
      ],
    },
  },
  nitro: {
    alias: {
      "punycode/": punycodeEntry,
      punycode: punycodeEntry,
      tslib: tslibEntry,
    },
  },
});
