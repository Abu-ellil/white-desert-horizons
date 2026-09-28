import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

// `require("punycode/")` (mongodb → whatwg-url → tr46) breaks rolldown's
// resolver — alias both forms straight to the punycode entry file.
const punycodeEntry = new URL("node_modules/punycode/punycode.js", import.meta.url).pathname;

// `tslib` stays a bare external inside the prebuilt server libs, but deployed
// lambdas ship without node_modules — bundle it in like every other lib.
const tslibEntry = new URL("node_modules/tslib/tslib.es6.mjs", import.meta.url).pathname;

export default defineConfig({
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({ server: { entry: "server" } }),
    nitro({
      // Deploy target: Vercel (emits .vercel/output per the Build Output API).
      preset: process.env.NITRO_PRESET || "vercel",
      alias: {
        "punycode/": punycodeEntry,
        punycode: punycodeEntry,
        tslib: tslibEntry,
      },
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
});
