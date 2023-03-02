// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
        tailwindcss: {},
        autoprefixer: {},
        },
    },
    modules: [
      '@pinia/nuxt',
      '@vueuse/sound/nuxt'
    ],
    runtimeConfig: {
        public: {
          apiBaseURL: process.env.API_BASE_URL || 'https://api.example.com/',
        },
    },
    sound: {
      sounds: {
        scan: true
      }
    }
})
