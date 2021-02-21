import store from "@/store/index";
import Vue from "vue";
import VueRouter from "vue-router";
import Book from "../components/Book.vue";
import Setting from "../components/Setting.vue";
import Home from "../views/Home.vue";
import Household from "../views/Household.vue";
import Login from "../views/Login.vue";
import Statistics from "../views/Statistics.vue";

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
    path: "/household",
    component: Household,
    children: [
      {
        path: "book",
        name: "book",
        component: Book
      },
      {
        path: "setting",
        name: "setting",
        component: Setting
      }
    ]
  },
  {
    path: "/statistics",
    component: Statistics,
    name: "statistics"
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
