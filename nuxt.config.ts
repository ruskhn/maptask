export default defineNuxtConfig({
  app: {
    head: {
      title: "MapTaskRusGuru",
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  devServer: {
    host: "0.0.0.0",
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "vue-yandex-maps/nuxt",
    "@pinia/nuxt",
    "@hebilicious/vue-query-nuxt",
  ],
  colorMode: {
    classSuffix: "",
  },
  runtimeConfig: {
    yandexMapsApiKey: import.meta.env.YANDEX_MAPS_API_KEY,
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  ssr: false,
  yandexMaps: {
    apikey: import.meta.env.YANDEX_MAPS_API_KEY,
    lang: "en_US",
  },
});
