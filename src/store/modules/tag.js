import { FamabonApi } from "@/api/api.js";
import Cookies from "js-cookie";

const state = () => ({
  tag_list: []
});

const getters = {
  getTagList: state => {
    return state.tag_list;
  },

  /**
   * サイドメニュー用のタグを返す
   */
  getTagListForSideMenu: state => {
    let tag_list = [];
    tag_list.push({
      id: "",
      title: "タグの新規作成",
      icon: "mdi-plus",
      color: "blue",
      to: "book",
      value: ""
    });
    for (let tag of state.tag_list) {
      tag_list.push({
        id: tag.id,
        title: tag.name,
        icon: "mdi-tag",
        color: "blue",
        to: "book",
        value: tag.name
      });
    }
    return tag_list;
  },

  /**
   * セレクタ用のタグを返す
   */
  getTagListForSelector: state => {
    let tag_list = [];
    for (let tag of state.tag_list) {
      tag_list.push(tag.name);
    }
    return tag_list;
  },

  /**
   * 統計用のタグを返す
   */
  getTagListForStatistics: state => {
    let tag_list = [];
    for (let tag of state.tag_list) {
      tag_list.push({
        id: tag.id,
        name: tag.name,
        color: tag.color,
        total: 4300
      });
    }
    return tag_list;
  }
};

const actions = {
  /**
   * タグリストを取得する処理
   */
  restApiGetTagList({ commit }) {
    let famabonApi = new FamabonApi();
    let url = "/household/tags/";
    famabonApi.setRequestHeader(Cookies.get("access"));
    return famabonApi
      .get(url)
      .then(response => {
        commit("changeTagList", { tag_list: response["data"] });
      })
      .catch(error => {
        console.log(error);
      });
  },

  /**
   * タグを作成する処理
   */
  // eslint-disable-next-line no-unused-vars
  createTag({ commit }, payload) {
    let famabonApi = new FamabonApi();
    let url = "/household/tags/";
    famabonApi.setRequestHeader(Cookies.get("access"));
    return famabonApi.post(url, payload);
  },

  /**
   * タグを更新する処理
   */
  // eslint-disable-next-line no-unused-vars
  updateTag({ commit }, payload) {
    let famabonApi = new FamabonApi();
    let url = "/household/tags/" + payload.id + "/";
    famabonApi.setRequestHeader(Cookies.get("access"));
    return famabonApi.put(url, { name: payload.name, color: payload.color });
  },

  /**
   * タグを削除する処理
   */
  // eslint-disable-next-line no-unused-vars
  deleteTag({ commit }, payload) {
    let famabonApi = new FamabonApi();
    let url = "/household/tags/" + payload.id + "/";
    famabonApi.setRequestHeader(Cookies.get("access"));
    return famabonApi.delete(url);
  }
};

const mutations = {
  changeTagList(state, payload) {
    state.tag_list = payload.tag_list;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
