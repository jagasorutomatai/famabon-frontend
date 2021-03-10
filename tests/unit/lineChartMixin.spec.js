import lineChartMixin from "@/mixins/lineChartMixin.js";
import statistics from "@/store/modules/statistics.js";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);
const Component = {
  render() {},
  mixins: [lineChartMixin]
};

describe("BookSearch.spec.js", () => {
  // this.$httpのモック
  let url = "";
  let mockHttp = {
    get: _url => {
      return new Promise(resolve => {
        url = _url;
        let response = { status: "200", data: "response data" };
        resolve(response);
      });
    },
    defaults: {
      baseURL: ""
    }
  };

  let spyInitLineChart;
  let vuetify;
  let store;
  let wrapper;
  beforeEach(() => {
    spyInitLineChart = jest
      .spyOn(lineChartMixin.methods, "initLineChart")
      .mockReturnValueOnce("mock!!");
    vuetify = new Vuetify();
    store = new Vuex.Store({ modules: { statistics } });
    wrapper = shallowMount(Component, {
      vuetify,
      store,
      localVue,
      mocks: {
        $http: mockHttp,
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
    expect(spyInitLineChart).toHaveBeenCalled();
  });
  it("初期化処理の確認", async () => {
    // methodsプロパティの実行
    await wrapper.vm.initLineChart();

    // 評価
    expect(store.getters["statistics/getTotalByDate"]).toBe("response data");
  });
  it("統計データ(日別の合計)を取得する処理の確認", async () => {
    // methodsプロパティの実行
    await wrapper.vm.callApiGetTotalByDate();

    // 評価
    expect(url).toBe("/household/books/totalByDate/");
    expect(store.getters["statistics/getTotalByDate"]).toBe("response data");
  });
  it("フィルターした統計データ(日別の合計)を取得する処理の確認", async () => {
    // methodsプロパティの実行
    let body = {
      date_after: "2021-02-15",
      date_before: "2021-03-15"
    };
    await wrapper.vm.callApiGetFilterTotalByDate(body);

    // 評価
    expect(url).toBe(
      "/household/books/totalByDate/?date_after=2021-02-15&date_before=2021-03-15"
    );
    expect(store.getters["statistics/getTotalByDate"]).toBe("response data");
  });
});
