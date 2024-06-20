// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,
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
      //'@productdevbook/chatwoot',
    ],
    runtimeConfig: {
        public: {
          apiBaseURL: process.env.API_BASE_URL || 'https://api.example.com/',
          appName: process.env.APP_NAME || 'HexaByt',
          CHATWOOT_URL: process.env.CHATWOOT_URL,
          CHATWOOT_TOKEN: process.env.CHATWOOT_TOKEN,
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
    },
    nitro: {
      prerender: {
        routes: ['/']
      },
      preset: 'node-server'
    },
    // chatwoot: {
    //   init: {
    //     websiteToken: 'UdjpiuCkqCHURfn2498Hc5HK'
    //   },
    //   settings: {
    //     locale: 'en',
    //     position: 'right',
    //     launcherTitle: 'Chat With Us',
    //     // ... and more settings
    //   },
    //   // If this is loaded you can make it true, https://github.com/nuxt-modules/partytown
    //   partytown: false,
    // }
})
