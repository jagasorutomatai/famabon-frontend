import BarChart from "@/components/statistics/BarChart.vue";
import { createLocalVue, mount } from "@vue/test-utils";
import Vuetify from "vuetify";

const localVue = createLocalVue();

describe("BookDetail.spec.js", () => {
  let spyInitBarChart;
  let vuetify;
  // eslint-disable-next-line no-unused-vars
  let wrapper;
  beforeEach(() => {
    spyInitBarChart = jest
      .spyOn(BarChart.methods, "initBarChart")
      .mockReturnValueOnce("mock!!");
    vuetify = new Vuetify();
    wrapper = mount(BarChart, {
      vuetify,
      localVue
    });
  });
  it("ライフサイクルメソッド(mounted)が実行されるか確認", async () => {
    // 評価
    expect(spyInitBarChart).toHaveBeenCalled();
  });
});
