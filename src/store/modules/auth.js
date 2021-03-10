const state = () => ({
  is_logged_in: false
});

const getters = {
  getIsLoggedIn: state => {
    return state.is_logged_in;
  }
};

const actions = {
  login({ commit }) {
    commit("changeIsLoggedIn", { is_logged_in: true });
  },

  verifyToken({ commit }, payload) {
    commit("changeIsLoggedIn", payload);
  },

  reset({ commit }) {
    commit("reset");
  }
};

const mutations = {
  changeIsLoggedIn(state, payload) {
    state.is_logged_in = payload.is_logged_in;
  },
  reset(state) {
    state.is_logged_in = false;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
