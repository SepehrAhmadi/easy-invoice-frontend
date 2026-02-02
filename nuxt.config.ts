import tailwindcss from "@tailwindcss/vite";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      BASE_URL: process.env.NUXT_PUBLIC_BASE_URL,
      API_URL: process.env.NUXT_PUBLIC_API_URL,
    },
  },
  css: ["~/assets/style/main.css"],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    plugins: [tailwindcss(), vuetify({ autoImport: true })],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  modules: ["@pinia/nuxt"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
});
