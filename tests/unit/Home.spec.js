import Home from "@/views/Home.vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuetify from "vuetify";

const localVue = createLocalVue();

localVue.use(VueRouter);
localVue.use(Vuetify);

describe("Home.test.js", () => {
  let wrapper;
  let router;
  let vuetify;
  beforeEach(() => {
    router = new VueRouter();
    vuetify = new Vuetify();
    wrapper = shallowMount(Home, {
      router,
      vuetify,
      localVue
    });
  });

  it("ログインしているとき", async () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
