// https://nuxt.com/docs/api/configuration/nuxt-config
import { cpSync } from 'node:fs';
import path from 'node:path';

export default defineNuxtConfig({
  ssr: true,
  devtools: {
    enabled: false,
    timeline: {
      enabled: true
    }
  },

  tailwindcss: {
    exposeConfig: true
  },

  nitro: {
    preset: "cloudflare-pages"
  },

  modules: [
    "nitro-cloudflare-dev",
    'unplugin-icons/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],
  css: ['~/assets/scss/main.scss'],
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'system',
  },
  app: {
    // pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [
        {
          rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
        },
        {
          rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Playfair+Display|Questrial|Open+Sans&display=swap',
        }
      ]
    }
  },
  runtimeConfig: {
    apiUrl: process.env.NUXT_API_URL,
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      homeId: process.env.NUXT_PUBLIC_HOME_ID,
      nowId: process.env.NUXT_PUBLIC_NOW_ID,
      usesId: process.env.NUXT_PUBLIC_USES_ID,
      contentId: process.env.NUXT_PUBLIC_CONTENT_ID,
      cdnBase: process.env.NUXT_PUBLIC_CDN_BASE,
    }
  },
  hooks: {
    'nitro:build:public-assets': (nitro) => {
      // copy email templates to .output/server/emails
      // const targetDir = path.join(nitro.options.output.serverDir, 'emails');
      // cpSync('./emails', targetDir, { recursive: true });
    }
  },
  plugins: []
})
