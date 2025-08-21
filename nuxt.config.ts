// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Portfolio - Jorge Monteiro',
      meta: [
        { name: 'description', content: 'Le Portfolio du Développeur Web Junior Jorge Monteiro.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Koulen&family=Poppins:wght@400;600&display=swap'
        }
      ]
    },
    
  },
  css: ['@/assets/css/main.css', '@fortawesome/fontawesome-free/css/all.min.css'],
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxt/image'
  ],
  runtimeConfig: {
    public: {
      apiBase: '/api'
    },
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASS: process.env.MAIL_PASS,
  }
})