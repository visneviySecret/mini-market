import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      products: [],
    };
  },
  getters: {
    allCart(state) {
      return state.products;
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
    incrementCounter(state, productId) {
      state.products = state.products.map((item) => {
        return item.product.id === productId
          ? { ...item, count: (item.count += 1) }
          : { ...item };
      });
    },
    decrementCounter(state, productId) {
      state.products = state.products.map((item) => {
        return item.product.id === productId && item.count > 0
          ? { ...item, count: (item.count -= 1) }
          : { ...item };
      });
    },
  },
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store);
});
