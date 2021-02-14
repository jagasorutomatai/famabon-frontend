import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import book from "./modules/book";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    book
  },
  // デバッギングツールを本番環境以外で有効にする
  strict: process.env.NODE_ENV !== "production"
});
