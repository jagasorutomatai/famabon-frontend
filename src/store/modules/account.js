const state = () => ({
  account: {}
});

const getters = {
  getAccount: state => {
    return state.account;
  }
};

const actions = {
  dispatchAccount({ commit }, payload) {
    commit("changeAccount", payload);
  },
  reset({ commit }) {
    commit("reset");
  }
};

const mutations = {
  changeAccount(state, payload) {
    state.account = payload.account;
  },
  reset(state) {
    state.account = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
