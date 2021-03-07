import Footer from "@/components/layout/Footer.vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuetify from "vuetify";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuetify);

describe("Footer.spec.js", () => {
  let wrapper;
  let vuetify;
  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = shallowMount(Footer, {
      vuetify,
      localVue
    });
  });

  it("コピーライトが表示されるか", async () => {
    expect(wrapper.html()).toContain("© 2021 famabon-frontend");
  });
});
