import AccountDetail from "@/components/account/AccountDetail.vue";
import account from "@/store/modules/account.js";
import { createLocalVue, mount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import Vuetify from "vuetify";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

// eslint-disable-next-line no-unused-vars
let url = "";

const mockHttp = {
  get: _url => {
    return new Promise(resolve => {
      url = _url;
      resolve("success");
    });
  },
  defaults: {
    baseURL: ""
  }
};

describe("AccountDetail.test.js", () => {
  let spyInitAccountDetail;
  let mockRouterPush;
  let wrapper;
  let vuetify;
  let store;
  beforeEach(async () => {
    spyInitAccountDetail = jest
      .spyOn(AccountDetail.methods, "initAccountDetail")
      .mockReturnValueOnce("mock!!");
    mockRouterPush = jest.fn();
    vuetify = new Vuetify();
    store = new Vuex.Store({ modules: { account } });
    wrapper = mount(AccountDetail, {
      vuetify,
      store,
      localVue,
      mocks: {
        $http: mockHttp,
        $router: {
          push: mockRouterPush
        }
      }
    });
  });

  it("ライフサイクルメソッド(mounted)が実行されるか確認", async () => {
    expect(spyInitAccountDetail).toHaveBeenCalled();
  });
  it("Vuexのデータをコンポーネントで取得できているか確認", async () => {
    let payload = {
      account: {
        username: "testusername",
        email: "testemail@sample.com",
        uuid: "aaa-bbb-ccc-ddd"
      }
    };
    await store.dispatch("account/dispatchAccount", payload);
    expect(wrapper.vm.account).toBe(payload.account);
  });
  it("パスワード変更画面へ移動するメソッドが実行されるか確認", async () => {
    // 各種オブジェクトを取得
    let button = wrapper.find("button");

    // 作成ボタンのイベントを発火
    button.trigger("click");
    await flushPromises();

    // 評価
    expect(mockRouterPush).toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalledWith({
      name: "account_edit"
    });
  });
});
