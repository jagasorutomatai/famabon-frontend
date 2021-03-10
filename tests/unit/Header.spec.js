import Header from "@/components/layout/Header.vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import Cookies from "js-cookie";
import VueRouter from "vue-router";
import Vuetify from "vuetify";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("Header.spec.js", () => {
  let wrapper;
  let router = new VueRouter();
  let vuetify;
  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = shallowMount(Header, {
      router,
      vuetify,
      Cookies,
      localVue
    });
    Cookies.set("account_username", "testuser");
  });

  it("アカウントのユーザー名が存在しないとき", async () => {
    expect(wrapper.find("v-chip-stub").exists()).toBeFalsy;
  });
  it("アカウントのユーザー名が存在するとき", async () => {
    await wrapper.vm.initHeader();
    expect(wrapper.vm.account_username).toBe("testuser");
    expect(wrapper.find("v-chip-stub").html()).toContain("testuser");
  });
});
