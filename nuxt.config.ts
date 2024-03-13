// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

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
    apiUrl: '',
    public: {
      apiBase: '',
      homeId: '',
      cdnBase: '',
    }
  }
})
