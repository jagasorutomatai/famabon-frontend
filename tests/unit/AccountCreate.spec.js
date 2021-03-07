import AccountCreate from "@/components/account/AccountCreate.vue";
import { createLocalVue, mount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import VueRouter from "vue-router";
import Vuetify from "vuetify";

const localVue = createLocalVue();
localVue.use(VueRouter);

let url = "";
let data = "";

const mockHttp = {
  post: (_url, _data) => {
    return new Promise(resolve => {
      url = _url;
      data = _data;
      resolve("success");
    });
  },
  defaults: {
    baseURL: ""
  }
};

describe("AccountCreate.test.js", () => {
  let wrapper;
  let router;
  let vuetify;
  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();
    wrapper = mount(AccountCreate, {
      router,
      vuetify,
      localVue,
      mocks: {
        $http: mockHttp
      }
    });
  });

  it("入力フォームへの入力内容がdataオプションに反映される確認", async () => {
    // 各種オブジェクトを取得
    let username_input = wrapper.find("input[name='username']");
    let email_input = wrapper.find("input[name='email']");
    let password_input = wrapper.find("input[name='password']");
    let re_password_input = wrapper.find("input[name='re_password']");
    let submit_button = wrapper.find("button[name='submit']");

    // 入力フォームにデータを挿入
    username_input.setValue("testusername");
    email_input.setValue("testemail@sample.com");
    password_input.setValue("testpassword");
    re_password_input.setValue("testpassword");

    // 作成ボタンのイベントを発火
    submit_button.trigger("click");
    await flushPromises();

    // 評価
    expect(url).toBe("/account/auth/users/");
    expect(data.username).toBe("testusername");
    expect(data.email).toBe("testemail@sample.com");
    expect(data.password).toBe("testpassword");
    expect(data.re_password).toBe("testpassword");
  });
});
