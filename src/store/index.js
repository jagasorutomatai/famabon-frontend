import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import book from "./modules/book";
import tag from "./modules/tag";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    book,
    tag
  },
  // デバッギングツールを本番環境以外で有効にする
  strict: process.env.NODE_ENV !== "production"
});
