import book from "@/store/modules/book.js";
import Home from "@/views/Home.vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

localVue.use(VueRouter);
localVue.use(Vuetify);

describe("Home.test.js", () => {
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
  let wrapper;
  let router;
  let vuetify;
  let store;
  beforeEach(() => {
    router = new VueRouter();
    vuetify = new Vuetify();
    store = new Vuex.Store({ modules: { book } });
    wrapper = shallowMount(Home, {
      store,
      router,
      vuetify,
      localVue,
      mocks: {
        $http: mockHttp
      }
    });
  });

  it("ログインしているとき", async () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
