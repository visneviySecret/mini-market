export default defineNuxtConfig({
  css: ["~/assets/styles/main.scss"],
  app: {
    head: {
      title: "Ваша корзина",
      meta: [{ name: "description", content: "Управляй своей корзиной" }],
      script: [
        {
          src: "https://auth.robokassa.ru/Merchant/bundle/robokassa_iframe.js",
          async: true,
          defer: true,
        },
      ],
    },
  },
  modules: [],
});
