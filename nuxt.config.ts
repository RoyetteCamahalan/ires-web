import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: ["primeicons/primeicons.css", "~/assets/css/main.css"],
  modules: [
    "@primevue/nuxt-module",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@vueuse/sound/nuxt",
    "nuxt-icon",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  primevue: {
    options: {
      theme: {
        preset: definePreset(Aura, {
          semantic: {
            primary: {
              50: "#EEF0FA",
              100: "#D9DCF4",
              200: "#B3BAE8",
              300: "#8D97DD",
              400: "#6775D1",
              500: "#5A67BA",
              600: "#4E59A4",
              700: "#424C8E",
              800: "#363E77",
              900: "#2A3161",
              950: "#1E244A",
            },
          },
        }),
        options: {
          cssLayer: {
            name: "primevue",
            order: "tailwind-base, primevue, tailwind-utilities",
          },
        },
      },
      pt: {
        select: {
          optionLabel: {
            class: "!text-sm",
          },
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      apiBaseURL: process.env.API_BASE_URL || "https://api.example.com/",
      landingURL: process.env.LANDING_URL || "https://hexabyt.com",
      appName: process.env.APP_NAME || "HexaByt",
      CHATWOOT_URL: process.env.CHATWOOT_URL,
      CHATWOOT_TOKEN: process.env.CHATWOOT_TOKEN,
    },
  },
  sound: {
    sounds: {
      scan: true,
    },
  },
  app: {
    head: {
      title: "HexaByt",
    },
  },
  nitro: {
    prerender: {
      routes: ["/"],
    },
    preset: "node-server",
  },
});
