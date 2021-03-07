import AccountEdit from "@/components/account/AccountEdit.vue";
import { createLocalVue, mount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import Cookies from "js-cookie";
import Vuetify from "vuetify";

const localVue = createLocalVue();

describe("AccountEdit.test.js パスワード変更成功", () => {
  // this.$httpのモック
  let url = "";
  let data = "";
  let mockHttp = {
    post: (_url, _data) => {
      return new Promise(resolve => {
        let response = { status: "204" };
        url = _url;
        data = _data;
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
  let wrapper;
  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(AccountEdit, {
      vuetify,
      Cookies,
      localVue,
      mocks: {
        $http: mockHttp,
        $router: {
          push: mockRouterPush
        }
      }
    });
    Cookies.set("account_uuid", "aaa-bbb-ccc-ddd");
  });

  it("APIが成功→フォームのデータ削除→アカウント詳細ページに移動の流れが正常に動作するか確認", async () => {
    // 各種オブジェクトを取得
    let new_password_input = wrapper.find("input[name='new_password']");
    let re_new_password_input = wrapper.find("input[name='re_new_password']");
    let current_password_input = wrapper.find("input[name='current_password']");
    let submit_button = wrapper.find("button[name='submit']");

    // 入力フォームにデータを挿入
    new_password_input.setValue("newtestpassword");
    re_new_password_input.setValue("newtestpassword");
    current_password_input.setValue("testpassword");

    // 作成ボタンのイベントを発火
    submit_button.trigger("click");
    await flushPromises();

    // 評価
    expect(url).toBe("/account/auth/users/set_password/");
    expect(data.new_password).toBe("newtestpassword");
    expect(data.re_new_password).toBe("newtestpassword");
    expect(data.current_password).toBe("testpassword");
    expect(wrapper.vm.form.new_password).toBe("");
    expect(wrapper.vm.form.re_new_password).toBe("");
    expect(wrapper.vm.form.current_password).toBe("");
    expect(mockRouterPush).toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalledWith({
      name: "account_detail",
      params: {
        uuid: "aaa-bbb-ccc-ddd"
      }
    });
  });
});

describe("AccountEdit.test.js パスワード変更失敗", () => {
  // this.$httpのモック
  let mockHttp = {
    post: () => {
      return new Promise((resolve, reject) => {
        let error = { response: { data: "failed" } };
        reject(error);
      });
    },
    defaults: {
      baseURL: ""
    }
  };

  let vuetify;
  let wrapper;
  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(AccountEdit, {
      vuetify,
      localVue,
      mocks: {
        $http: mockHttp
      }
    });
  });

  it("APIが失敗→エラーメッセージ取得の流れが正常に動作するか確認", async () => {
    // 各種オブジェクトを取得
    let submit_button = wrapper.find("button[name='submit']");

    // 作成ボタンのイベントを発火
    submit_button.trigger("click");
    await flushPromises();

    // 評価
    expect(wrapper.vm.error_messages).toBe("failed");
  });
});
