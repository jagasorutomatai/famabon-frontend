import BookSearch from "@/components/household/BookSearch.vue";
import book from "@/store/modules/book.js";
import tag from "@/store/modules/tag.js";
import { createLocalVue, mount } from "@vue/test-utils";
import flushPromises from "flush-promises";
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
        let data = undefined;
        url = _url;
        if (_url == "/household/tags/") {
          data = [{ name: "test tag" }];
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
  let spyInitBookSearch;
  let vuetify;
  let store;
  let wrapper;
  beforeEach(() => {
    spyInitBookSearch = jest
      .spyOn(BookSearch.methods, "initBookSearch")
      .mockReturnValueOnce("mock!!");
    vuetify = new Vuetify();
    store = new Vuex.Store({ modules: { book, tag } });
    wrapper = mount(BookSearch, {
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
  it("ライフサイクルメソッド(mounted)が実行されるか確認", async () => {
    // 評価
    expect(spyInitBookSearch).toHaveBeenCalled();
  });
  it("タグリスト取得処理の確認", async () => {
    // methodsプロパティの実行
    await wrapper.vm.callApiGetTagList();

    // 評価
    expect(url).toBe("/household/tags/");
    expect(store.getters["tag/getTagList"]).toEqual([{ name: "test tag" }]);
    expect(wrapper.vm.tag_list).toEqual(["test tag"]);
  });
  it("帳簿検索処理の確認", async () => {
    // 各種オブジェクトを取得
    let title_input = wrapper.find("input[name='title']");
    let tag_input = wrapper.find("div[class='v-select__selections'] > input");
    let date_after_input = wrapper.find("input[name='date_after']");
    let date_before_input = wrapper.find("input[name='date_before']");
    let submit_button = wrapper.find("button[name='submit']");

    // 入力フォームにデータを挿入
    title_input.setValue("test title");
    tag_input.setValue("test tag");
    date_after_input.setValue("2021-02-15");
    date_before_input.setValue("2021-03-15");

    // 検索ボタンのイベントを発火
    submit_button.trigger("click");
    await flushPromises();

    // 評価
    expect(url).toBe(
      "/household/books/?title=test title&date_after=2021-02-15&date_before=2021-03-15&tag=test tag"
    );
  });
  it("検索フォームのリセット処理の確認", async () => {
    // 各種オブジェクトを取得
    let title_input = wrapper.find("input[name='title']");
    let tag_input = wrapper.find("div[class='v-select__selections'] > input");
    let date_after_input = wrapper.find("input[name='date_after']");
    let date_before_input = wrapper.find("input[name='date_before']");
    let reset_button = wrapper.find("button[name='reset']");

    // 入力フォームにデータを挿入
    title_input.setValue("test title");
    tag_input.setValue("test tag");
    date_after_input.setValue("2021-02-15");
    date_before_input.setValue("2021-03-15");

    // リセットボタンのイベントを発火
    reset_button.trigger("click");
    await flushPromises();

    // 評価
    expect(wrapper.vm.form).toEqual({
      title: "",
      tag: "",
      date_before: "",
      date_after: ""
    });
  });
});
