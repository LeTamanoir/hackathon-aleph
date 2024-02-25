import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  define:
    mode === "development"
      ? {
          global: {},
          "process.env": {},
        }
      : {},
}));
