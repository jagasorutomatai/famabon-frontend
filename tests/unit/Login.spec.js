import auth from "@/store/modules/auth.js";
import Login from "@/views/Login.vue";
import { createLocalVue, mount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import Cookies from "js-cookie";
import Vuetify from "vuetify";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BookSearch.spec.js", () => {
  // this.$httpのモック
  let get_url = "";
  let post_url = "";
  let mockHttp = {
    get: _url => {
      return new Promise(resolve => {
        get_url = _url;
        let response = { status: "200", data: "response data" };
        resolve(response);
      });
    },
    // eslint-disable-next-line no-unused-vars
    post: (_url, _data) => {
      return new Promise(resolve => {
        post_url = _url;
        let data = {
          access: "access token",
          refresh: "refresh token"
        };
        let response = { status: "200", data: data };
        resolve(response);
      });
    },
    defaults: {
      baseURL: ""
    }
  };

  // this.$router.pushのモック
  let mockRouterPush = jest.fn();
  let vuetify;
  let store;
  let wrapper;
  beforeEach(() => {
    vuetify = new Vuetify();
    store = new Vuex.Store({ modules: { auth } });
    wrapper = mount(Login, {
      vuetify,
      store,
      Cookies,
      localVue,
      mocks: {
        $http: mockHttp,
        $router: {
          push: mockRouterPush
        }
      }
    });
  });
  afterEach(() => {
    Cookies.remove("access");
    Cookies.remove("refresh");
  });
  it("ログイン処理の確認", async () => {
    // 各種オブジェクトを取得
    let username_input = wrapper.find("input[name='username']");
    let password_input = wrapper.find("input[name='password']");
    let submit_button = wrapper.find("button[name='submit']");

    // 入力フォームにデータを挿入
    username_input.setValue("test username");
    password_input.setValue("test password");

    // 作成ボタンのイベントを発火
    submit_button.trigger("click");
    await flushPromises();

    // 評価
    expect(post_url).toBe("/account/auth/jwt/create/");
    expect(get_url).toBe("/account/auth/users/me/");
    expect(Cookies.get("access")).toBe("access token");
    expect(Cookies.get("refresh")).toBe("refresh token");
    expect(mockRouterPush).toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalledWith({
      path: "/"
    });
  });
  it("アカウント作成ページへ移動する処理の確認", async () => {
    // 各種オブジェクトを取得
    let create_button = wrapper.find("button[name='create']");

    // 作成ボタンのイベントを発火
    create_button.trigger("click");
    await flushPromises();

    // 評価
    expect(mockRouterPush).toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalledWith({
      name: "account_create"
    });
  });
});
