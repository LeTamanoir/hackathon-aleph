import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // build: {
  //   // target: "es2015",
  //   // commonjsOptions: { include: [] },
  // },
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    global: {},
    process: { env: {} },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
});
