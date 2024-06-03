import path from "path"
import react from "@vitejs/plugin-react"
import svgr from 'vite-plugin-svgr'
import { defineConfig } from "vite"

export default defineConfig({
	build: {
    manifest: true,
    outDir: "dist/",
  },
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/",
})