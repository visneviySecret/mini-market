import { createOrder, deleteOrder, updateOrder } from "~/api/order";
import { saveCartToLocalStorage } from "~/utils/cartLocalStorage";

const initialStore = [];

export default {
  namespaced: false,
  state() {
    return {
      products: initialStore,
      orderId: null,
      orderDebounceTimer: null,
      emptyCartTimer: null,
      cartStatus: "loading",
    };
  },
  getters: {
    allCart(state) {
      return state.products;
    },
    cartStats(state) {
      let count = 0;
      let cost = 0;
      state.products.forEach((item) => {
        count += item.count;
        cost += item.product.price * item.count;
      });

      return {
        count,
        cost,
      };
    },
    cartStatus(state) {
      return state.cartStatus;
    },
    isCartEmpty(state) {
      return state.products.length === 0;
    },
  },
  actions: {
    addProductToCart({ commit, dispatch }, product) {
      commit("addProductToCart", product);
      dispatch("syncOrderWithServer");
      dispatch("cancelOrderDeletion");
    },
    removeProductFromCart({ commit, dispatch }, productId) {
      commit("removeProductFromCart", productId);
      dispatch("syncOrderWithServer");
    },
    async syncOrderWithServer({ state, commit, dispatch, rootGetters }) {
      if (state.orderDebounceTimer) {
        clearTimeout(state.orderDebounceTimer);
      }

      state.orderDebounceTimer = setTimeout(async () => {
        try {
          const user = rootGetters.user;

          if (!user || !user.id) {
            saveCartToLocalStorage(state.products);
            return;
          }

          const items = state.products.map((item) => ({
            product_id: item.product.id,
            count: item.count,
            price: item.product.price,
          }));

          if (state.orderId) {
            await updateOrder(state.orderId, { items });
          } else {
            const order = await createOrder({ items });
            commit("setOrderId", order.id);
          }

          if (state.products.length === 0 && state.orderId) {
            dispatch("scheduleOrderDeletion");
          } else {
            dispatch("cancelOrderDeletion");
          }
        } catch (error) {
          console.error("Ошибка синхронизации заказа:", error);
        }
      }, 1000);
    },
    scheduleOrderDeletion({ state, commit }) {
      if (state.emptyCartTimer) {
        clearTimeout(state.emptyCartTimer);
      }

      state.emptyCartTimer = setTimeout(async () => {
        if (state.orderId && state.products.length === 0) {
          try {
            await deleteOrder(state.orderId);
            commit("setOrderId", null);
          } catch (error) {
            console.error("Ошибка удаления заказа:", error);
          }
        }
      }, 10000);
    },
    cancelOrderDeletion({ state }) {
      if (state.emptyCartTimer) {
        clearTimeout(state.emptyCartTimer);
        state.emptyCartTimer = null;
      }
    },
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
      commit("removeProductFromCart", productId);
    },
  },
  mutations: {
    addProductToCart(state, product) {
      const existingProduct = state.products.find(
        (item) => item.product.id === product.id
      );
      if (existingProduct) {
        existingProduct.count += 1;
      } else {
        state.products.push({ product, count: 1 });
      }
    },
    removeProductFromCart(state, productId) {
      const existingProduct = state.products.find(
        (item) => item.product.id === productId
      );
      if (existingProduct && existingProduct.count > 1) {
        existingProduct.count -= 1;
      } else {
        state.products = state.products.filter(
          (item) => item.product.id !== productId
        );
      }
    },
    updateCart(state, payload) {
      state.products = payload;
    },
    removeProductById(state, productId) {
      state.products = state.products.filter(
        (item) => item.product.id !== productId
      );
    },
    async clearCart(state) {
      state.products = [];
      await deleteOrder();
    },
    incrementCounter(state, productId) {
      state.products.forEach((item) => {
        if (item.product.id === productId) item.count += 1;
      });
    },
    decrementCounter(state, productId) {
      state.products.forEach((item) => {
        if (item.product.id === productId && item.count > 0) item.count -= 1;
      });
    },
    setOrderId(state, orderId) {
      state.orderId = orderId;
    },
    setCartStatus(state, status) {
      state.cartStatus = status;
    },
  },
};
