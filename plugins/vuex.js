import { createStore } from "vuex";
import { products } from "@/content/mockData.json";

const initialStore = [
  { product: products[1], count: 1 },
  { product: products[0], count: 2 },
  { product: products[2], count: 1 },
];
const store = createStore({
  state() {
    return {
      products: initialStore,
      options: {
        install: false,
      },
    };
  },
  getters: {
    allCart(state) {
      return state.products;
    },
    cartStats(state) {
      let count = 0;
      let cost = 0;
      const InstallOption = state.options.install;
      state.products.forEach((item) => {
        count += item.count;
        cost += item.product.cost * item.count;
      });

      return {
        count,
        cost,
        InstallOption,
      };
    },
  },
  actions: {
    removeProductById({ commit }, productId) {
      commit("removeProductById", productId);
    },
    clearCart({ commit }) {
      commit("clearCart");
    },
    incrementCounter({ commit }, productId) {
      commit("incrementCounter", productId);
    },
    decrementCounter({ commit }, productId) {
      commit("decrementCounter", productId);
    },
    toggleInstallOption({ commit }) {
      commit("toggleInstallOption");
    },
  },
  mutations: {
    updateCart(state, payload) {
      state.products = payload;
    },
    removeProductById(state, productId) {
      state.products = state.products.filter(
        (item) => item.product.id !== productId
      );
    },
    clearCart(state) {
      state.products = [];
    },
    toggleInstallOption(state) {
      state.options.install = !state.options.install;
    },
    incrementCounter(state, productId) {
      state.products.map((item) => {
        if (item.product.id === productId) item.count += 1;
      });
    },
    decrementCounter(state, productId) {
      state.products.map((item) => {
        if (item.product.id === productId && item.count > 0) item.count -= 1;
      });
    },
  },
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store);
});
