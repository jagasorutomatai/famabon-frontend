import BookEdit from "@/components/household/pages/BookEdit.vue";
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

describe("BookEdit.test.js", () => {
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
    put: (_url, _data) => {
      return new Promise(resolve => {
        let response = { status: "200" };
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
  let spyInitBookEdit;
  let vuetify;
  let store;
  let wrapper;
  beforeEach(() => {
    spyInitBookEdit = jest
      .spyOn(BookEdit.methods, "initBookEdit")
      .mockReturnValueOnce("mock!!");
    vuetify = new Vuetify();
    store = new Vuex.Store({ modules: { book, tag } });
    wrapper = mount(BookEdit, {
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
    expect(spyInitBookEdit).toHaveBeenCalled();
  });
  it("タグリスト取得処理の確認", async () => {
    // methodsプロパティの実行
    await wrapper.vm.callApiGetTagList();

    // 評価
    expect(store.getters["tag/getTagList"]).toEqual(["response data"]);
    expect(wrapper.vm.tag_list).toEqual(["response data"]);
  });
  it("帳簿更新処理の確認", async () => {
    // dataプロパティにテスト用のデータを挿入
    let form = {
      uuid: "iii-jjj-kkk-lll",
      title: "test title",
      description: "test description",
      money: "1000",
      tag_uuid: "eee-fff-ggg-hhh",
      account_uuid: "aaa-bbb-ccc-ddd",
      date: "2020-03-15"
    };
    wrapper.vm.form = form;

    // 各種オブジェクトを取得
    let title_input = wrapper.find("input[name='title']");
    let description_textarea = wrapper.find("textarea[name='description']");
    let money_input = wrapper.find("input[name='money']");
    let date_input = wrapper.find("input[name='date']");
    let tag_input = wrapper.find("input[name='tag']");
    let submit_button = wrapper.find("button[name='submit']");

    // 作成ボタンのイベントを発火
    submit_button.trigger("click");
    await flushPromises();

    // 入力フォームにデータを挿入
    title_input.setValue("updated test title");
    description_textarea.setValue("updated test description");
    money_input.setValue("2000");
    date_input.setValue("2020-04-15");
    tag_input.setValue("eee-fff-ggg-hhh");

    // 評価
    expect(url).toBe("/household/books/" + form.uuid + "/");
    expect(data.title).toBe("updated test title");
    expect(data.description).toBe("updated test description");
    expect(data.money).toBe("2000");
    expect(data.date).toBe("2020-04-15");
    expect(data.tag_uuid).toBe("eee-fff-ggg-hhh");
    expect(wrapper.vm.error_messages).toEqual({});
    expect(mockRouterPush).toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalledWith({
      name: "book"
    });
  });
});
