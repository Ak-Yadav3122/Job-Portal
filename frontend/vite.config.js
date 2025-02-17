import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // Your backend URL
        changeOrigin: true,
        secure: false,  // For local development with self-signed certificates
      },
    },
  },
});