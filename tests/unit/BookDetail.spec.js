import BookDetail from "@/components/household/pages/BookDetail.vue";
import book from "@/store/modules/book.js";
import { createLocalVue, mount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import Vuetify from "vuetify";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BookDetail.spec.js", () => {
  // this.$httpのモック
  let url = "";
  let mockHttp = {
    get: _url => {
      return new Promise(resolve => {
        url = _url;
        let data = {
          title: "test title",
          description: "test description",
          tag: { name: "test tag", color: "test tag color" },
          money: 1000,
          date: "2021-02-15",
          created_at: "2021-02-16",
          updated_at: "2021-02-16"
        };
        let response = { status: "200", data: data };
        resolve(response);
      });
    },
    delete: _url => {
      return new Promise(resolve => {
        url = _url;
        let response = { status: "204" };
        resolve(response);
      });
    },
    defaults: {
      baseURL: ""
    }
  };

  // this.$router.pushのモック
  let mockRouterPush = jest.fn();
  let spyInitBookDetail;
  let vuetify;
  let store;
  let wrapper;
  beforeEach(() => {
    spyInitBookDetail = jest
      .spyOn(BookDetail.methods, "initBookDetail")
      .mockReturnValueOnce("mock!!");
    vuetify = new Vuetify();
    store = new Vuex.Store({ modules: { book } });
    wrapper = mount(BookDetail, {
      vuetify,
      store,
      localVue,
      mocks: {
        $http: mockHttp,
        $router: {
          push: mockRouterPush
        },
        $route: { params: { uuid: "book uuid" } }
      }
    });
  });
  it("ライフサイクルメソッド(mounted)が実行されるか確認", async () => {
    // 評価
    expect(spyInitBookDetail).toHaveBeenCalled();
  });
  it("帳簿詳細を画面に表示する処理の確認", async () => {
    // dataプロパティにテスト用のデータを挿入
    let book_detail = {
      title: "test title",
      description: "test description",
      tag: { name: "test tag", color: "test tag color" },
      money: 1000,
      date: "2021-02-15",
      created_at: "2021-02-16",
      updated_at: "2021-02-16"
    };
    wrapper.vm.book_detail = book_detail;
    await wrapper.vm.$nextTick();

    // 各種オブジェクトを取得
    let title_card_title = wrapper.findAll(".v-card__title").at(0);
    let description_card_text = wrapper.findAll(".v-card__text").at(0);
    let tag_card_text = wrapper.findAll(".v-card__text").at(1);
    let money_card_text = wrapper.findAll(".v-card__text").at(2);
    let date_card_text = wrapper.findAll(".v-card__text").at(3);
    let created_at_card_text = wrapper.findAll(".v-card__text").at(4);
    let updated_at_card_text = wrapper.findAll(".v-card__text").at(5);

    // 評価
    expect(title_card_title.text()).toBe(book_detail.title);
    expect(description_card_text.text()).toBe(book_detail.description);
    expect(tag_card_text.text()).toBe(book_detail.tag.name);
    expect(money_card_text.text()).toBe(book_detail.money + " 円");
    expect(date_card_text.text()).toBe(book_detail.date);
    expect(created_at_card_text.text()).toBe(book_detail.created_at);
    expect(updated_at_card_text.text()).toBe(book_detail.updated_at);
  });
  it("帳簿詳細取得処理の確認", async () => {
    // methodsプロパティの実行
    wrapper.vm.callApiGetBookDetail();
    await flushPromises();

    // 評価
    expect(url).toBe("/household/books/book uuid/");
  });
  it("帳簿削除処理用のダイアログボックスを開けるか確認", async () => {
    // 各種オブジェクトを取得
    let delete_button = wrapper.find("button[name='delete']");

    // イベントを発火
    delete_button.trigger("click");
    await flushPromises();

    // 評価
    expect(wrapper.vm.delete_dialog).toBeTruthy;
  });
  it("帳簿削除処理用のダイアログボックスを閉じれるか確認", async () => {
    // ダイアログボックスを表示する
    wrapper.vm.delete_dialog = true;
    await flushPromises();

    // 各種オブジェクトを取得
    let cancel_button = wrapper.find("button[name='cancel']");

    // イベントを発火
    cancel_button.trigger("click");
    await flushPromises();

    // 評価
    expect(wrapper.vm.delete_dialog).toBeFalsy;
  });
  it("帳簿削除処理用の確認", async () => {
    // ダイアログボックスを表示する
    wrapper.vm.delete_dialog = true;
    await flushPromises();

    // 各種オブジェクトを取得
    let submit_button = wrapper.find("button[name='submit']");

    // イベントを発火
    submit_button.trigger("click");
    await flushPromises();

    // 評価
    expect(url).toBe("/household/books/book uuid/");
    expect(mockRouterPush).toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalledWith({
      name: "book"
    });
  });
  it("帳簿編集ページへ移動する処理の確認", async () => {
    // 各種オブジェクトを取得
    let edit_button = wrapper.find("button[name='edit']");

    // イベントを発火
    edit_button.trigger("click");
    await flushPromises();

    expect(mockRouterPush).toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalledWith({
      name: "book_edit",
      params: {
        uuid: "book uuid"
      }
    });
  });
});
