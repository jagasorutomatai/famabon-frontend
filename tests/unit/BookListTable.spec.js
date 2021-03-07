import BookListTable from "@/components/household/BookListTable.vue";
import { createLocalVue, mount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import Vuetify from "vuetify";

const localVue = createLocalVue();

describe("BookListTable.spec.js", () => {
  // this.$router.pushのモック
  let mockRouterPush = jest.fn();

  let vuetify;
  let wrapper;
  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(BookListTable, {
      vuetify,

      localVue,
      mocks: {
        $router: {
          push: mockRouterPush
        }
      }
    });
  });
  it("propsプロパティで帳簿リストを取得した場合テーブルが表示される確認", async () => {
    // propsプロパティにテスト用のデータを挿入
    let book_list = [
      {
        uuid: "book uuid1",
        title: "book title1",
        description: "book description1",
        money: "100",
        date: "2021-03-01",
        account: "account uuid1",
        tag: {
          uuid: "tag uuid1",
          name: "tag1",
          color: "purple",
          account: "account uuid1"
        },
        created_at: "2021-03-01T21:00:43.317079+09:00",
        updated_at: "2021-03-04T16:33:34.005415+09:00"
      },
      {
        uuid: "book uuid2",
        title: "book title2",
        description: "book description2",
        money: "200",
        date: "2021-03-02",
        account: "account uuid1",
        tag: {
          uuid: "tag uuid2",
          name: "tag2",
          color: "orange",
          account: "account uuid1"
        },
        created_at: "2021-03-01T21:00:43.317079+09:00",
        updated_at: "2021-03-04T16:33:34.005415+09:00"
      }
    ];
    wrapper.setProps({
      book_list: book_list
    });
    await wrapper.vm.$nextTick();

    // 各種オブジェクトを取得
    let date1_td = wrapper.find("tbody > tr:nth-child(1) > td:nth-child(1)");
    let title1_td = wrapper.find("tbody > tr:nth-child(1) > td:nth-child(2)");
    let tag1_td = wrapper.find("tbody > tr:nth-child(1) > td:nth-child(3)");
    let money1_td = wrapper.find("tbody > tr:nth-child(1) > td:nth-child(4)");
    let date2_td = wrapper.find("tbody > tr:nth-child(2) > td:nth-child(1)");
    let title2_td = wrapper.find("tbody > tr:nth-child(2) > td:nth-child(2)");
    let tag2_td = wrapper.find("tbody > tr:nth-child(2) > td:nth-child(3)");
    let money2_td = wrapper.find("tbody > tr:nth-child(2) > td:nth-child(4)");

    // 評価
    expect(date1_td.text()).toBe(book_list[0].date);
    expect(title1_td.text()).toBe(book_list[0].title);
    expect(tag1_td.text()).toBe(book_list[0].tag.name);
    expect(money1_td.text()).toBe(book_list[0].money);
    expect(date2_td.text()).toBe(book_list[1].date);
    expect(title2_td.text()).toBe(book_list[1].title);
    expect(tag2_td.text()).toBe(book_list[1].tag.name);
    expect(money2_td.text()).toBe(book_list[1].money);
  });
  it("帳簿詳細ページに移動する処理を確認", async () => {
    // propsプロパティにテスト用のデータを挿入
    let book_list = [
      {
        uuid: "book uuid1",
        title: "book title1",
        description: "book description1",
        money: "100",
        date: "2021-03-01",
        account: "account uuid1",
        tag: {
          uuid: "tag uuid1",
          name: "tag1",
          color: "purple",
          account: "account uuid1"
        },
        created_at: "2021-03-01T21:00:43.317079+09:00",
        updated_at: "2021-03-04T16:33:34.005415+09:00"
      }
    ];
    wrapper.setProps({
      book_list: book_list
    });
    await wrapper.vm.$nextTick();

    // 各種オブジェクトを取得
    let tr = wrapper.find("tbody > tr:nth-child(1)");

    // イベントを発火
    tr.trigger("click");
    await flushPromises();

    // 評価
    expect(mockRouterPush).toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalledWith({
      name: "book_detail",
      params: {
        uuid: "book uuid1"
      }
    });
  });
});
