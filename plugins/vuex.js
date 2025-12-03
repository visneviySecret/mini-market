import { createStore } from "vuex";
import cartModule from "~/stores/cart";
import userModule from "~/stores/user";

const store = createStore({
  modules: {
    cart: cartModule,
    user: userModule,
  },
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store);
});
