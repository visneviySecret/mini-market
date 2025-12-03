export default defineNuxtConfig({
  css: ["~/assets/styles/main.scss"],
  app: {
    head: {
      title: "Ваша корзина",
      meta: [{ name: "description", content: "Управляй своей корзиной" }],
    },
  },
  modules: [],
});
