export default {
  ssr: false,

  pageTransition: {
    name: 'smoothy',
    mode: 'out-in',
  },

  layoutTransition: {
    name: 'smoothy',
    mode: 'out-in',
  },

  loading: {
    color: '#3B82F6'
  },

  head: {
    title: 'admin.home24uz',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: ['element-ui/lib/theme-chalk/index.css', '~/assets/css/main.css'],

  plugins: ['~/plugins/element-ui', '~/plugins/axios', '~/plugins/apexchart', '~/plugins/teleport', '~/plugins/vuedraggable'],

  components: true,

  buildModules: ['@nuxtjs/tailwindcss'],

  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    baseURL: '/',
  },

  build: {
    transpile: [/^element-ui/],
  },
}
