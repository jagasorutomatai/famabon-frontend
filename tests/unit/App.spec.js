import App from "@/App.vue";
import auth from "@/store/modules/auth.js";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
localVue.use(Vuetify);

describe("App.test.js", () => {
  let wrapper;
  let store;
  let router;
  let vuetify;
  beforeEach(() => {
    router = new VueRouter();
    vuetify = new Vuetify();
    store = new Vuex.Store({ modules: { auth } });
    wrapper = shallowMount(App, {
      store,
      router,
      vuetify,
      localVue
    });
  });

  it("ログインしているとき", async () => {
    await store.dispatch("auth/login");
    expect(wrapper.vm.is_logged_in).toBeTruthy;
    expect(wrapper.html()).toContain("<sidemenu-stub></sidemenu-stub>");
  });
  it("ログインないとき", async () => {
    expect(wrapper.vm.is_logged_in).toBeFalsy;
    expect(wrapper.html()).not.toContain("<sidemenu-stub></sidemenu-stub>");
  });
});
