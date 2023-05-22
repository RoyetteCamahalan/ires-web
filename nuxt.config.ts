// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    css: [
      '~/assets/css/main.css',
  ],
    postcss: {
        plugins: {
        tailwindcss: {},
        autoprefixer: {},
        },
    },
    modules: [
      '@pinia/nuxt',
      '@pinia-plugin-persistedstate/nuxt',
      '@vueuse/sound/nuxt',
      'nuxt-icon',
    ],
    runtimeConfig: {
        public: {
          apiBaseURL: process.env.API_BASE_URL || 'https://api.example.com/',
          appName: process.env.APP_NAME || 'HexaByt',
        },
    },
    sound: {
      sounds: {
        scan: true
      }
    },
    app:{
      head:{
        title: 'HexaByt',
      }
    }
})
