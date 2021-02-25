const state = () => ({
  tag_list: []
});

const getters = {
  getTagList: state => {
    return state.tag_list;
  },

  getTagListForSelector: state => {
    let tag_list = [];
    for (let tag of state.tag_list) {
      tag_list.push(tag.name);
    }
    return tag_list;
  },

  getTagListForStatistics: state => {
    let tag_list = [];
    for (let tag of state.tag_list) {
      tag_list.push({
        uuid: tag.uuid,
        name: tag.name,
        color: tag.color,
        total: 4300
      });
    }
    return tag_list;
  }
};

const actions = {
  dispatchTagList({ commit }, payload) {
    commit("changeTagList", payload);
  },
  reset({ commit }) {
    commit("reset");
  }
};

const mutations = {
  changeTagList(state, payload) {
    state.tag_list = payload.tag_list;
  },
  reset(state) {
    state.tag_list = [];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
