import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],

          "vendor-router": ["react-router-dom"],

          "vendor-redux": ["@reduxjs/toolkit", "react-redux"],

          "vendor-appwrite": ["appwrite"],

          "vendor-tinymce": ["@tinymce/tinymce-react"],

          "vendor-forms": ["react-hook-form"],

          "vendor-parser": ["html-react-parser"],
        },
      },
    },
  },

  server: {
    hmr: true,
  },
});
