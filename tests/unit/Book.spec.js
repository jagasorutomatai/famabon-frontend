import Book from "@/components/household/pages/Book.vue";
import book from "@/store/modules/book.js";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import Cookies from "js-cookie";
import Vuetify from "vuetify";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AccountEdit.test.js パスワード変更成功", () => {
  // this.$httpのモック
  let mockHttp = {
    get: () => {
      return new Promise(resolve => {
        let response = { status: "200", data: "response data" };
        resolve(response);
      });
    },
    defaults: {
      baseURL: ""
    }
  };

  let spyInitBook;
  let vuetify;
  let store;
  let wrapper;
  beforeEach(() => {
    spyInitBook = jest
      .spyOn(Book.methods, "initBook")
      .mockReturnValueOnce("mock!!");
    vuetify = new Vuetify();
    store = new Vuex.Store({ modules: { book } });
    wrapper = shallowMount(Book, {
      store,
      vuetify,
      Cookies,
      localVue,
      mocks: {
        $http: mockHttp
      }
    });
  });

  it("ライフサイクルメソッド(mounted)が実行されるか確認", async () => {
    // 評価
    expect(spyInitBook).toHaveBeenCalled();
  });
  it("検索結果の帳簿リストが変更された場合watchプロパティが実行されるか確認", async () => {
    //  変更前のタブ
    let before_tab = wrapper.vm.tab;

    // Vuexにデータ投入
    await store.dispatch("book/dispatchSearchedBookList", {
      searched_book_list: "searched book list"
    });

    //  評価
    expect(wrapper.vm.tab).not.toBe(before_tab);
    expect(wrapper.vm.tab).toBe(2);
  });
  it("APIが成功→Vuexにデータ投入までの流れが正常に動作するか確認", async () => {
    // methodsプロパティの実行
    await wrapper.vm.callApiGetBookList();
    await wrapper.vm.callApiGetFilterBookList();

    // 評価
    expect(store.getters["book/getBookList"]).toBe("response data");
    expect(store.getters["book/getCurrentBookList"]).toBe("response data");
  });
});
