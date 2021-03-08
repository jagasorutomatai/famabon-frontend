import SideMenu from "@/components/layout/SideMenu.vue";
import router_index from "@/router/index.js";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import Cookies from "js-cookie";
import moment from "moment";
import "moment/locale/ja";
import VueRouter from "vue-router";
import Vuetify from "vuetify";

moment.locale("ja");

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("SideMenu.test.js", () => {
  let wrapper;
  let router;
  let vuetify;
  beforeEach(() => {
    vuetify = new Vuetify();
    let options = router_index.options;
    router = new VueRouter({ options });
    wrapper = shallowMount(SideMenu, {
      router,
      vuetify,
      Cookies,
      localVue
    });
    Cookies.set("account_uuid", "aaa-bbb-ccc-ddd");
  });

  it("サイドメニューのリンクの確認", async () => {
    // ボタンおよびリンクを取得
    let book_create_button = wrapper.findAll("v-btn-stub").at(0); // 帳簿作成ページへのリンク(ボタン)
    let book_link = wrapper.findAll("v-list-item-stub").at(1); // 帳簿検索ページへのリンク
    let book_setting_link = wrapper.findAll("v-list-item-stub").at(2); // タグの設定ページへのリンク
    let statistics_link = wrapper.findAll("v-list-item-stub").at(3); // 統計ページへのリンク
    let account_detail_link = wrapper.findAll("v-list-item-stub").at(4); // アカウント詳細ページへのリンク

    // 評価
    expect(book_create_button.props().to.name).toBe("book_create");
    expect(book_link.props().to.name).toBe("book");
    expect(book_setting_link.props().to.name).toBe("setting");
    expect(statistics_link.props().to.name).toBe("statistics");
    expect(account_detail_link.props().to.name).toBe("account_detail");
  });
  it("サイドメニューのリンクのURLクエリパラメータの確認", async () => {
    // リンクを取得
    let statistics_link = wrapper.findAll("v-list-item-stub").at(3); // 統計ページへのリンク
    let account_detail_link = wrapper.findAll("v-list-item-stub").at(4); // アカウント詳細ページへのリンク

    // 評価
    let date_after = moment()
      .startOf("month")
      .format("YYYY-MM-DD");
    let date_before = moment()
      .endOf("month")
      .format("YYYY-MM-DD");
    let date = moment().format("YYYY年MM月");
    expect(statistics_link.props().to.query).toEqual({
      date: date,
      date_after: date_after,
      date_before: date_before
    });
    expect(account_detail_link.props().to.params).toEqual({
      uuid: "aaa-bbb-ccc-ddd"
    });
  });
});
