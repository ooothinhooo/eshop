import react from "@vitejs/plugin-react-swc";
import * as path from "path";
import { defineConfig } from "vite";
import envCompatible from "vite-plugin-env-compatible";

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react(), envCompatible],
  resolve: {
    alias: [{ find: "~", replacement: path.resolve(__dirname, "src") }],
  },

  define: {
    "process.env": {},
  },
});
