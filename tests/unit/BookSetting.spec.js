import BookSetting from "@/components/household/pages/BookSetting.vue";
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
    get: () => {
      return new Promise(resolve => {
        let response = { status: "200", data: ["response data"] };
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
    put: (_url, _data) => {
      return new Promise(resolve => {
        let response = { status: "200" };
        url = _url;
        data = _data;
        resolve(response);
      });
    },
    delete: () => {
      return new Promise(resolve => {
        let response = { status: "204", data: ["response data"] };
        resolve(response);
      });
    },
    defaults: {
      baseURL: ""
    }
  };

  // this.$router.pushのモック
  let mockRouterPush = jest.fn();
  let spyInitBookSetting;
  let vuetify;
  let store;
  let wrapper;
  beforeEach(() => {
    spyInitBookSetting = jest
      .spyOn(BookSetting.methods, "initBookSetting")
      .mockReturnValueOnce("mock!!");
    vuetify = new Vuetify();
    store = new Vuex.Store({ modules: { tag } });
    wrapper = mount(BookSetting, {
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
    expect(spyInitBookSetting).toHaveBeenCalled();
  });
  it("作成用のダイアログボックスを有効にする処理を確認", async () => {
    // 各種オブジェクトを取得
    let create_button = wrapper.find("button[name='create']");

    // OKボタンのイベントを発火
    create_button.trigger("click");
    await flushPromises();

    // 評価
    console.log(wrapper.vm.form.name);
    expect(wrapper.vm.method).toBe("POST");
    expect(wrapper.vm.dialog_edit).toBeTruthy;
    expect(wrapper.vm.form.uuid).toBe("");
    expect(wrapper.vm.form.name).toBe("");
    expect(wrapper.vm.form.color).toBe("grey");
    expect(wrapper.vm.form.account_uuid).toBe(Cookies.get("account_uuid"));
  });
  it("編集用のダイアログボックスを有効にする処理を確認", async () => {
    // Vuexにテスト用のデータを挿入
    let form = [
      {
        uuid: "eee-fff-ggg-hhh",
        name: "tag name",
        color: "tag color",
        account: Cookies.get("account_uuid")
      }
    ];
    store.dispatch("tag/dispatchTagList", { tag_list: form });
    await wrapper.vm.$nextTick();

    // 各種オブジェクトを取得
    let edit_button = wrapper.find("button[name='edit']");

    // OKボタンのイベントを発火
    edit_button.trigger("click");
    await flushPromises();

    // 評価
    expect(wrapper.vm.method).toBe("PUT");
    expect(wrapper.vm.dialog_edit).toBeTruthy;
    expect(wrapper.vm.form.uuid).toBe(form[0].uuid);
    expect(wrapper.vm.form.name).toBe(form[0].name);
    expect(wrapper.vm.form.color).toBe(form[0].color);
    expect(wrapper.vm.form.account_uuid).toBe(form[0].account);
  });
  it("削除用のダイアログボックスを有効にする処理を確認", async () => {
    // Vuexにテスト用のデータを挿入
    let form = [
      {
        uuid: "eee-fff-ggg-hhh",
        name: "tag name",
        color: "tag color",
        account: Cookies.get("account_uuid")
      }
    ];
    store.dispatch("tag/dispatchTagList", { tag_list: form });
    await wrapper.vm.$nextTick();

    // 各種オブジェクトを取得
    let delete_button = wrapper.find("button[name='delete']");

    // OKボタンのイベントを発火
    delete_button.trigger("click");
    await flushPromises();

    // 評価
    expect(wrapper.vm.dialog_delete).toBeTruthy;
    expect(wrapper.vm.form.uuid).toBe(form[0].uuid);
    expect(wrapper.vm.form.name).toBe(form[0].name);
  });
  it("タグリスト取得処理の確認", async () => {
    // methodsプロパティの実行
    await wrapper.vm.callApiGetTagList();

    // 評価
    expect(store.getters["tag/getTagList"]).toEqual(["response data"]);
    expect(wrapper.vm.tag_list).toEqual(["response data"]);
  });
  it("タグの作成処理を確認", async () => {
    // dataオプション更新に伴うDOMの更新
    wrapper.vm.method = "POST";
    wrapper.vm.dialog_edit = true;
    await wrapper.vm.$nextTick();

    // 各種オブジェクトを取得
    let name_input = wrapper.find("input[name='name']");
    let color_input = wrapper.find("div[class='v-select__selections'] > input");
    let submit_post_button = wrapper.find("button[name='submit_post']");

    // 入力フォームにデータを挿入
    name_input.setValue("tag name");
    color_input.setValue("tag color");

    // OKボタンのイベントを発火
    submit_post_button.trigger("click");
    await flushPromises();

    // 評価
    expect(url).toBe("/household/tags/");
    expect(data.name).toBe("tag name");
    expect(data.color).toBe("tag color");
    expect(data.account_uuid).toBe("aaa-bbb-ccc-ddd");
    expect(wrapper.vm.form).toEqual({
      uuid: "",
      name: "",
      color: "grey",
      account_uuid: Cookies.get("account_uuid")
    });
    expect(wrapper.vm.dialog_edit).toBeFalsy;
    expect(wrapper.vm.error_messages).toEqual({});
  });
  it("タグの更新処理を確認", async () => {
    // dataオプション更新に伴うDOMの更新
    wrapper.vm.method = "PUT";
    wrapper.vm.dialog_edit = true;
    await wrapper.vm.$nextTick();

    // dataプロパティにテスト用のデータを挿入
    let form = {
      uuid: "eee-fff-ggg-hhh",
      name: "tag name",
      color: "tag color",
      account_uuid: Cookies.get("account_uuid")
    };
    wrapper.vm.form = form;

    // 各種オブジェクトを取得
    let name_input = wrapper.find("input[name='name']");
    let color_input = wrapper.find("div[class='v-select__selections'] > input");
    let submit_put_button = wrapper.find("button[name='submit_put']");

    // 入力フォームにデータを挿入
    name_input.setValue("updated tag name");
    color_input.setValue("updated tag color");

    // okボタンのイベントを発火
    submit_put_button.trigger("click");
    await flushPromises();

    // 評価
    expect(url).toBe("/household/tags/" + form.uuid + "/");
    expect(data.name).toBe("updated tag name");
    expect(data.color).toBe("updated tag color");
    expect(wrapper.vm.form).toEqual({
      uuid: "",
      name: "",
      color: "grey",
      account_uuid: Cookies.get("account_uuid")
    });
    expect(wrapper.vm.dialog_edit).toBeFalsy;
    expect(wrapper.vm.error_messages).toEqual({});
  });
  it("タグの削除処理を確認", async () => {
    // dataオプション更新に伴うDOMの更新
    wrapper.vm.dialog_delete = true;
    await wrapper.vm.$nextTick();

    // dataプロパティにテスト用のデータを挿入
    let form = { uuid: "eee-fff-ggg-hhh" };
    wrapper.vm.form = form;

    // 各種オブジェクトを取得
    let submit_delete_button = wrapper.find("button[name='submit_delete']");

    // okボタンのイベントを発火
    submit_delete_button.trigger("click");
    await flushPromises();

    // 評価
    expect(url).toBe("/household/tags/" + form.uuid + "/");
    expect(wrapper.vm.dialog_delete).toBeFalsy;
  });
  it("タグの作成処理を途中でキャンセルしたときの処理が成功しているか確認", async () => {
    // dataオプション更新に伴うDOMの更新
    wrapper.vm.method = "POST";
    wrapper.vm.dialog_edit = true;
    await wrapper.vm.$nextTick();

    // 各種オブジェクトを取得
    let name_input = wrapper.find("input[name='name']");
    let color_input = wrapper.find("div[class='v-select__selections'] > input");
    let cancel_button = wrapper.find("button[name='cancel']");

    // 入力フォームにデータを挿入
    name_input.setValue("tag name");
    color_input.setValue("tag color");

    // OKボタンのイベントを発火
    cancel_button.trigger("click");
    await flushPromises();

    // 評価
    expect(wrapper.vm.form).toEqual({
      uuid: "",
      name: "",
      color: "grey",
      account_uuid: Cookies.get("account_uuid")
    });
    expect(wrapper.vm.dialog_edit).toBeFalsy;
    expect(wrapper.vm.error_messages).toEqual({});
  });
});
