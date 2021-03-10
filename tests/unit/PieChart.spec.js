import PieChart from "@/components/statistics/PieChart.vue";
import { createLocalVue, mount } from "@vue/test-utils";
import Vuetify from "vuetify";

const localVue = createLocalVue();

describe("BookDetail.spec.js", () => {
  let spyInitPieChart;
  let vuetify;
  // eslint-disable-next-line no-unused-vars
  let wrapper;
  beforeEach(() => {
    spyInitPieChart = jest
      .spyOn(PieChart.methods, "initPieChart")
      .mockReturnValueOnce("mock!!");
    vuetify = new Vuetify();
    wrapper = mount(PieChart, {
      vuetify,
      localVue
    });
  });
  it("ライフサイクルメソッド(mounted)が実行されるか確認", async () => {
    // 評価
    expect(spyInitPieChart).toHaveBeenCalled();
  });
});
