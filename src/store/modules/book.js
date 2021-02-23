import { FamabonApi } from "@/api/api.js";
import Cookies from "js-cookie";
import moment from "moment";
import "moment/locale/ja";

moment.locale("ja");

const state = () => ({
  book_list_all: [],
  book_list_this_month: [],
  book_list_searched: [],
  book_detail: []
});

const getters = {
  getBookListAll: state => {
    return state.book_list_all;
  },
  getBookListThisMonth: state => {
    return state.book_list_this_month;
  },
  getBookListSearched: state => {
    return state.book_list_searched;
  },
  getBookDetail: state => {
    return state.book_detail;
  }
};

const actions = {
  /**
   * 帳簿を作成する処理
   */
  // eslint-disable-next-line no-unused-vars
  createBook({ commit }, payload) {
    let famabonApi = new FamabonApi();
    let url = "/household/books/";
    famabonApi.setRequestHeader(Cookies.get("access"));
    return famabonApi.post(url, payload);
  },

  /**
   *
   * 帳簿を更新する処理
   */
  // eslint-disable-next-line no-unused-vars
  updateBook({ commit }, payload) {
    let famabonApi = new FamabonApi();
    let url = "/household/books/" + payload.id + "/";
    delete payload["id"];
    famabonApi.setRequestHeader(Cookies.get("access"));
    return famabonApi.put(url, payload);
  },

  /**
   *
   * 帳簿を削除する処理
   */
  // eslint-disable-next-line no-unused-vars
  deleteBook({ commit }, payload) {
    let famabonApi = new FamabonApi();
    let url = "/household/books/" + payload.id + "/";
    famabonApi.setRequestHeader(Cookies.get("access"));
    return famabonApi.delete(url);
  },

  /**
   * 帳簿リストを取得する処理
   */
  restApiGetBookListAll({ commit }) {
    let famabonApi = new FamabonApi();
    let url = "/household/books/";
    famabonApi.setRequestHeader(Cookies.get("access"));
    return famabonApi
      .get(url)
      .then(response => {
        commit("changeBookListAll", { book_list_all: response["data"] });
      })
      .catch(error => {
        console.log(error);
      });
  },

  /**
   * 帳簿を取得する処理(個別)
   */
  restApiGetBookDetail({ commit }, payload) {
    let famabonApi = new FamabonApi();
    let url = "/household/books/" + payload.id + "/";
    famabonApi.setRequestHeader(Cookies.get("access"));
    return famabonApi
      .get(url)
      .then(response => {
        commit("changeBookDetail", { book_detail: response["data"] });
      })
      .catch(error => {
        console.log(error);
      });
  },

  /**
   * 今月分の帳簿を取得する処理
   */
  restApiGetBookListThisMonth({ commit }) {
    let famabonApi = new FamabonApi();

    let date_after = moment()
      .startOf("month")
      .format("YYYY-MM-DD");
    let date_before = moment()
      .endOf("month")
      .format("YYYY-MM-DD");

    let url =
      "/household/books/?date_after=" +
      date_after +
      "&date_before=" +
      date_before;

    famabonApi.setRequestHeader(Cookies.get("access"));
    return famabonApi
      .get(url)
      .then(response => {
        commit("changeBookListThisMonth", {
          book_list_this_month: response["data"]
        });
      })
      .catch(error => {
        console.log(error);
      });
  },

  /**
   * フィルターした帳簿リストを取得する処理
   */
  restApiGetFilterBookList({ commit }, payload) {
    console.log(payload);
    let famabonApi = new FamabonApi();
    let title = "title=" + payload.title;
    let date_after = "date_after=" + payload.date_after;
    let date_before = "date_before=" + payload.date_before;
    let tag = "tag=" + payload.tag;
    let url =
      "/household/books/?" +
      title +
      "&" +
      date_after +
      "&" +
      date_before +
      "&" +
      tag;
    famabonApi.setRequestHeader(Cookies.get("access"));
    return famabonApi
      .get(url)
      .then(response => {
        commit("changeBookListSearched", {
          book_list_searched: response["data"]
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
};

const mutations = {
  changeBookListAll(state, payload) {
    state.book_list_all = payload.book_list_all;
  },
  changeBookListThisMonth(state, payload) {
    state.book_list_this_month = payload.book_list_this_month;
  },
  changeBookListSearched(state, payload) {
    state.book_list_searched = payload.book_list_searched;
  },
  changeBookDetail(state, payload) {
    state.book_detail = payload.book_detail;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
