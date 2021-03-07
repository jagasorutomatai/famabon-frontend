import BookCreate from "@/components/household/pages/BookCreate.vue";
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

describe("BookCreate.test.js", () => {
  // this.$httpのモック
  let url = "";
  let data = "";
  let mockHttp = {
    get: (_url, _data) => {
      return new Promise(resolve => {
        let response = { status: "200", data: ["response data"] };
        url = _url;
        data = _data;
        resolve(response);
      });
    },
    post: (_url, _data) => {
      return new Promise(resolve => {
        let response = { status: "201" };
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
  let spyInitBookCreate;
  let vuetify;
  let store;
  let wrapper;
  beforeEach(() => {
    spyInitBookCreate = jest
      .spyOn(BookCreate.methods, "initBookCreate")
      .mockReturnValueOnce("mock!!");
    vuetify = new Vuetify();
    store = new Vuex.Store({ modules: { book, tag } });
    wrapper = mount(BookCreate, {
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
    expect(spyInitBookCreate).toHaveBeenCalled();
  });
  it("タグリスト取得処理の確認", async () => {
    // methodsプロパティの実行
    await wrapper.vm.callApiGetTagList();

    // 評価
    expect(store.getters["tag/getTagList"]).toEqual(["response data"]);
    expect(wrapper.vm.tag_list).toEqual(["response data"]);
  });
  it("帳簿作成処理の確認", async () => {
    // 各種オブジェクトを取得
    let title_input = wrapper.find("input[name='title']");
    let description_textarea = wrapper.find("textarea[name='description']");
    let money_input = wrapper.find("input[name='money']");
    let date_input = wrapper.find("input[name='date']");
    let tag_input = wrapper.find("input[name='tag']");
    let submit_button = wrapper.find("button[name='submit']");

    // 入力フォームにデータを挿入
    title_input.setValue("test title");
    description_textarea.setValue("test description");
    money_input.setValue("1000");
    date_input.setValue("2020-03-15");
    tag_input.setValue("eee-fff-ggg-hhh");

    // 作成ボタンのイベントを発火
    submit_button.trigger("click");
    await flushPromises();

    // 評価
    expect(url).toBe("/household/books/");
    expect(data.title).toBe("test title");
    expect(data.description).toBe("test description");
    expect(data.money).toBe("1000");
    expect(data.date).toBe("2020-03-15");
    expect(data.account_uuid).toBe("aaa-bbb-ccc-ddd");
    expect(wrapper.vm.error_messages).toEqual({});
    expect(mockRouterPush).toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalledWith({
      name: "book"
    });
  });
});
