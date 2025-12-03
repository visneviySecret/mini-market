export default {
  namespaced: false,
  state() {
    return {
      id: null,
      email: null,
      addresses: [],
    };
  },
  getters: {
    user(state) {
      return {
        id: state.id,
        email: state.email,
        addresses: state.addresses,
      };
    },
    userAddresses(state) {
      return state.addresses;
    },
  },
  actions: {
    setUser({ commit }, userData) {
      commit("setUser", userData);
    },
    updateEmail({ commit }, email) {
      commit("updateEmail", email);
    },
    addAddress({ commit }, address) {
      commit("addAddress", address);
    },
    updateAddress({ commit }, { id, address }) {
      commit("updateAddress", { id, address });
    },
    removeAddress({ commit }, addressId) {
      commit("removeAddress", addressId);
    },
    clearUser({ commit }) {
      commit("clearUser");
    },
  },
  mutations: {
    setUser(state, userData) {
      state.id = userData.id;
      state.email = userData.email;
      if (userData.addresses) {
        state.addresses = userData.addresses;
      }
    },
    updateEmail(state, email) {
      state.email = email;
    },
    addAddress(state, address) {
      const newAddress = {
        user_id: state.id,
        city: address.city,
        street: address.street,
        index: address.index,
        phone: address.phone,
      };
      state.addresses.push(newAddress);
    },
    updateAddress(state, { id, address }) {
      const index = state.addresses.findIndex((addr) => addr.id === id);
      if (index !== -1) {
        state.addresses[index] = {
          ...state.addresses[index],
          ...address,
        };
      }
    },
    removeAddress(state, addressId) {
      state.addresses = state.addresses.filter((addr) => addr.id !== addressId);
    },
    clearUser(state) {
      state.id = null;
      state.email = null;
      state.addresses = [];
    },
  },
};
