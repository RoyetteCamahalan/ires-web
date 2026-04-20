import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

import { parseTime } from './utils/date';

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
      '@primevue/nuxt-module',
    ],
    primevue: {
    options: {
      theme: {
        preset: definePreset(Aura, {
          semantic: {
            primary: {
              50: '#EEF0FA',
              100: '#D9DCF4',
              200: '#B3BAE8',
              300: '#8D97DD',
              400: '#6775D1',
              500: '#5A67BA',
              600: '#4E59A4',
              700: '#424C8E',
              800: '#363E77',
              900: '#2A3161',
              950: '#1E244A',
            },
          },
        }),
      },
      pt: {
        select: {
          optionLabel: {
            class: '!text-sm',
          },
        },
        datepicker: {
          root: ({ instance, props }) => {
            const inputFunction = instance.onInput;
            instance.onInput = (event: any) => {
              if (props.timeOnly) {
                parseTime(event.target.value, (e) => {
                  event.target.value = instance.formatTime(e);
                  inputFunction.apply(this, [event]);
                });
              } else {
                inputFunction.apply(this, [event]);
              }
            };
          },
          inputIcon: ({ props }) => (props.timeOnly ? 'pi pi-clock' : 'pi pi-calendar') + ' ',
        },
      },
    },
  },
    runtimeConfig: {
        public: {
          apiBaseURL: process.env.API_BASE_URL || 'https://api.example.com/',
          landingURL: process.env.LANDING_URL || 'https://hexabyt.com',
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
