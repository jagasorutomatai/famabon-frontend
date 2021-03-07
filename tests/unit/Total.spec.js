import Total from "@/components/statistics/Total.vue";
import statistics from "@/store/modules/statistics.js";
import { createLocalVue, mount } from "@vue/test-utils";
import Cookies from "js-cookie";
import Vuetify from "vuetify";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);
Cookies.set("account_uuid", "aaa-bbb-ccc-ddd");

describe("BookSearch.spec.js", () => {
  // this.$httpのモック
  let url = "";
  let mockHttp = {
    get: _url => {
      return new Promise(resolve => {
        url = _url;
        let data = { total: 1000 };
        if (url.indexOf("totalByTag") > -1) {
          data = "response data";
        }
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
  let spyInitTotal;
  let vuetify;
  let store;
  let wrapper;
  beforeEach(() => {
    spyInitTotal = jest
      .spyOn(Total.methods, "initTotal")
      .mockReturnValueOnce("mock!!");
    vuetify = new Vuetify();
    store = new Vuex.Store({ modules: { statistics } });
    wrapper = mount(Total, {
      vuetify,
      store,
      Cookies,
      localVue,
      mocks: {
        $http: mockHttp,
        $router: {
          push: mockRouterPush
        },
        $route: {
          query: {
            date_after: "2021-02-15",
            date_before: "2021-03-15"
          }
        }
      }
    });
  });
  it("ライフサイクルメソッド(mounted)が実行されるか確認", async () => {
    // 評価
    expect(spyInitTotal).toHaveBeenCalled();
  });
  it("初期化処理の確認", async () => {
    // methodsプロパティの実行
    await wrapper.vm.initTotal();

    // 評価
    expect(store.getters["statistics/getTotalByTag"]).toBe("response data");
    expect(store.getters["statistics/getTotal"]).toBe(1000);
  });
  it("統計データ(タグ別の合計)を取得する処理の確認", async () => {
    // methodsプロパティの実行
    await wrapper.vm.callApiGetTotalByTag();

    // 評価
    expect(url).toBe("/household/books/totalByTag/");
    expect(store.getters["statistics/getTotalByTag"]).toBe("response data");
  });
  it("統計データ(帳簿の合計)を取得する処理の確認", async () => {
    // methodsプロパティの実行
    await wrapper.vm.callApiGetTotal();

    // 評価
    expect(url).toBe("/household/books/total/");
    expect(store.getters["statistics/getTotal"]).toBe(1000);
  });
  it("フィルターした統計データ(タグ別の合計)を取得する処理の確認", async () => {
    // methodsプロパティの実行
    let body = {
      date_after: "2021-02-15",
      date_before: "2021-03-15"
    };
    await wrapper.vm.callApiGetFilterTotalByTag(body);

    // 評価
    expect(url).toBe(
      "/household/books/totalByTag/?date_after=2021-02-15&date_before=2021-03-15"
    );
    expect(store.getters["statistics/getTotalByTag"]).toBe("response data");
  });
  it("フィルターした統計データ(タグ別の合計)を取得する処理の確認", async () => {
    // methodsプロパティの実行
    let body = {
      date_after: "2021-02-15",
      date_before: "2021-03-15"
    };
    await wrapper.vm.callApiGetFilterTotal(body);

    // 評価
    expect(url).toBe(
      "/household/books/total/?date_after=2021-02-15&date_before=2021-03-15"
    );
    expect(store.getters["statistics/getTotal"]).toBe(1000);
  });
});
