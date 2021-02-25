import moment from "moment";
import "moment/locale/ja";

moment.locale("ja");

const state = () => ({
  book_list: [],
  current_book_list: [],
  searched_book_list: [],
  book_detail: []
});

const getters = {
  getBookList: state => {
    return state.book_list;
  },
  getCurrentBookList: state => {
    return state.current_book_list;
  },
  getSearchedBookList: state => {
    return state.searched_book_list;
  },
  getBookDetail: state => {
    return state.book_detail;
  }
};

const actions = {
  dispatchBookList({ commit }, payload) {
    commit("changeBookList", payload);
  },
  dispatchBookDetail({ commit }, payload) {
    commit("changeBookDetail", payload);
  },
  dispatchCurrentBookList({ commit }, payload) {
    commit("changeCurrentBookList", payload);
  },
  dispatchSearchedBookList({ commit }, payload) {
    commit("changeSearchedBookList", payload);
  },
  reset({ commit }) {
    commit("reset");
  }
};

const mutations = {
  changeBookList(state, payload) {
    state.book_list = payload.book_list;
  },
  changeCurrentBookList(state, payload) {
    state.current_book_list = payload.current_book_list;
  },
  changeSearchedBookList(state, payload) {
    state.searched_book_list = payload.searched_book_list;
  },
  changeBookDetail(state, payload) {
    state.book_detail = payload.book_detail;
  },
  reset(state) {
    state.book_list = [];
    state.current_book_list = [];
    state.searched_book_list = [];
    state.book_detail = [];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
