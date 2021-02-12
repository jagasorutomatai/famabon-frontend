import { FamabonApi } from "@/api/api.js";
import Cookies from "js-cookie";

const state = () => ({
  is_logged_in: false
});

const getters = {
  getIsLoggedIn: state => {
    return state.is_logged_in;
  }
};

const actions = {
  /**
   * ログイン処理
   * @param {object}[payload] -認証情報
   */
  login({ commit }, payload) {
    let famabonApi = new FamabonApi();
    let url = "/account/auth/jwt/create/";
    return famabonApi
      .post(url, payload)
      .then(response => {
        Cookies.set("access", response["data"]["access"]);
        Cookies.set("refresh", response["data"]["refresh"]);
        commit("changeIsLoggedIn", { is_logged_in: true });
      })
      .catch(error => {
        console.log(error);
      });
  },

  /**
   * ログアウト処理
   */
  logout({ commit }) {
    Cookies.remove("access");
    Cookies.remove("refresh");
    commit("changeIsLoggedIn", { is_logged_in: false });
  },

  /**
   * JWTが有効期限内か確認する処理
   */
  verifyToken({ commit, dispatch }) {
    let famabonApi = new FamabonApi();
    let url = "/account/auth/jwt/verify/";
    let body = { token: Cookies.get("access") };
    return famabonApi
      .post(url, body)
      .then(response => {
        if (response["status"] == "200") {
          commit("changeIsLoggedIn", { is_logged_in: true });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch("logout");
      });
  }
};

const mutations = {
  changeIsLoggedIn(state, payload) {
    state.is_logged_in = payload.is_logged_in;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
