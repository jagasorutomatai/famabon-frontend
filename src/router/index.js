import store from "@/store/index";
import axios from "axios";
import Cookies from "js-cookie";
import Vue from "vue";
import VueRouter from "vue-router";
import AccountCreate from "../components/account/AccountCreate.vue";
import AccountDetail from "../components/account/AccountDetail.vue";
import AccountEdit from "../components/account/AccountEdit.vue";
import Book from "../components/household/pages/Book.vue";
import BookCreate from "../components/household/pages/BookCreate.vue";
import BookDetail from "../components/household/pages/BookDetail.vue";
import BookEdit from "../components/household/pages/BookEdit.vue";
import BookSetting from "../components/household/pages/BookSetting.vue";
import Account from "../views/Account.vue";
import Home from "../views/Home.vue";
import Household from "../views/Household.vue";
import Login from "../views/Login.vue";
import NotFound from "../views/NotFound.vue";
import Statistics from "../views/Statistics.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: "/account",
    name: "account",
    component: Account,
    meta: { requiresAuth: false },
    children: [
      {
        path: "create",
        name: "account_create",
        component: AccountCreate,
        meta: { requiresAuth: false }
      }
    ]
  },
  {
    path: "/account/:uuid",
    name: "account",
    component: Account,
    meta: { requiresAuth: false },
    children: [
      {
        path: "",
        name: "account_detail",
        component: AccountDetail,
        meta: { requiresAuth: true }
      },
      {
        path: "edit",
        name: "account_edit",
        component: AccountEdit,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: "/household",
    component: Household,
    meta: { requiresAuth: true },
    children: [
      {
        path: "book",
        name: "book",
        component: Book,
        meta: { requiresAuth: true }
      },
      {
        path: "book/create",
        name: "book_create",
        component: BookCreate,
        meta: { requiresAuth: true }
      },
      {
        path: "book/:uuid",
        name: "book_detail",
        component: BookDetail,
        meta: { requiresAuth: true }
      },
      {
        path: "book/:uuid/edit",
        name: "book_edit",
        component: BookEdit,
        meta: { requiresAuth: true }
      },
      {
        path: "setting",
        name: "setting",
        component: BookSetting,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: "/household/statistics",
    name: "statistics",
    component: Statistics,
    meta: { requiresAuth: true }
  },
  {
    path: "/*",
    component: NotFound,
    meta: { requiresAuth: true }
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
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Cookieが存在しない場合はログイン画面に移動
    if (!methods.checkCookie()) {
      Cookies.remove("access");
      Cookies.remove("refresh");
      Cookies.remove("account_username");
      Cookies.remove("account_uuid");
      next("/login");
    }

    // JWTが有効か確認する
    axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
    if (Cookies.get("access")) {
      let authorization = "jwt " + Cookies.get("access");
      axios.defaults.headers.common["Authorization"] = authorization;
    }
    let body = { token: Cookies.get("access") };
    let url = process.env.VUE_APP_API_JWT_VERIFY;
    axios
      .post(url, body)
      .then(response => {
        if (response["status"] == "200") {
          store.dispatch("auth/verifyToken", { is_logged_in: true });
          next();
        }
      })
      .catch(() => {
        Cookies.remove("access");
        Cookies.remove("refresh");
        Cookies.remove("account_username");
        Cookies.remove("account_uuid");
        store.dispatch("auth/reset");
        store.dispatch("book/reset");
        store.dispatch("account/reset");
        store.dispatch("tag/reset");
        next("/login");
      });
  } else {
    next();
  }
});

const methods = {
  checkCookie() {
    let is_exist_cookies = true;
    let cookies_key = ["access", "refresh", "account_username", "account_uuid"];
    for (let key of cookies_key) {
      if (typeof Cookies.get(key) === "undefined") {
        is_exist_cookies = false;
      }
    }
    return is_exist_cookies;
  }
};

export default router;
