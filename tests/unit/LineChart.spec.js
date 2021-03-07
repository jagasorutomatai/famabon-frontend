import LineChart from "@/components/statistics/LineChart.vue";
import { createLocalVue, mount } from "@vue/test-utils";
import Vuetify from "vuetify";

const localVue = createLocalVue();

describe("BookDetail.spec.js", () => {
  let spyInitLineChart;
  let vuetify;
  // eslint-disable-next-line no-unused-vars
  let wrapper;
  beforeEach(() => {
    spyInitLineChart = jest
      .spyOn(LineChart.methods, "initLineChart")
      .mockReturnValueOnce("mock!!");
    vuetify = new Vuetify();
    wrapper = mount(LineChart, {
      vuetify,
      localVue
    });
  });
  it("ライフサイクルメソッド(mounted)が実行されるか確認", async () => {
    // 評価
    expect(spyInitLineChart).toHaveBeenCalled();
  });
});
