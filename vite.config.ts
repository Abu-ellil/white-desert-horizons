import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

// `require("punycode/")` (mongodb → whatwg-url → tr46) breaks rolldown's
// resolver. BOTH forms must be aliased: `tr46/index.js` literally does
// `require("punycode/")` with a trailing slash, which no tracer can resolve on
// its own. Aliasing only the bare form fails the build with UNLOADABLE_DEPENDENCY.
const punycodeEntry = new URL("node_modules/punycode/punycode.js", import.meta.url).pathname;

// Node resolves bare `"tslib"` through tslib's `exports` map, where the `import`
// + `node` condition points at `modules/index.js` (NOT `tslib.es6.mjs`).
// Vite's resolver can pick that same entry explicitly, so the Nitro tracer copies
// the file the runtime actually asks for.
const tslibEntry = new URL("node_modules/tslib/modules/index.js", import.meta.url).pathname;

export default defineConfig({
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({ server: { entry: "server" } }),
    nitro({
      // Deploy target: Vercel (emits .vercel/output per the Build Output API).
      preset: process.env["NITRO_PRESET"] || "vercel",
      alias: {
        "punycode/": punycodeEntry,
        punycode: punycodeEntry,
        tslib: tslibEntry,
      },
      // Lambdas ship WITHOUT a real node_modules, so any bare specifier left in
      // a prebuilt server chunk must resolve to a file the tracer actually
      // copies. Aliasing `tslib` to `tslib.es6.mjs` made the tracer copy only
      // that one file, while the Radix chunks still import bare `"tslib"` —
      // which resolves to `modules/index.js`. That missing file is why SSR threw
      // ERR_MODULE_NOT_FOUND on Vercel and every page rendered as an empty shell.
      cloudflare: {
        nodeCompat: true,
        deployConfig: true,
      },
    }),
    viteReact(),
  ],
  resolve: {
    alias: [
      { find: /^punycode\/$/, replacement: punycodeEntry },
      { find: /^punycode$/, replacement: punycodeEntry },
      { find: /^tslib$/, replacement: tslibEntry },
    ],
  },
  // The prebuilt Start server core imports the virtual `#tanstack-router-entry` /
  // `#tanstack-start-entry` specifiers, which only exist inside the real build.
  // rolldown's dep pre-bundler can't see that graph, so keep it out of the scan.
  optimizeDeps: {
    exclude: [
      "@tanstack/start-server-core",
      "@tanstack/start-client-core",
      "@tanstack/react-start",
      "@tanstack/react-router",
    ],
  },
});
