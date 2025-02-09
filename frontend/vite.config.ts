import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		port: 3000,
		proxy: {
			"/api": {
				target: "http://localhost:3001",
				changeOrigin: true,
			},
		},
	},
	resolve: {
		alias: {
			"use-sync-external-store/shim/with-selector": require.resolve("use-sync-external-store/shim/with-selector"),
		},
	},
});
