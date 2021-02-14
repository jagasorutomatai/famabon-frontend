import store from "@/store/index";
import Vue from "vue";
import VueRouter from "vue-router";
import Book from "../views/Book.vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/household/book",
    name: "Book",
    component: Book
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

/**
 * ログインしているか確認する
 */
router.beforeEach(async (to, from, next) => {
  if (to["path"] != "/login") {
    await store.dispatch("auth/verifyToken");
    let is_logged_in = store.getters["auth/getIsLoggedIn"];
    if (is_logged_in) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
