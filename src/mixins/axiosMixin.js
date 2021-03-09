import Cookies from "js-cookie";

export default {
  methods: {
    initAxiosMixins() {
      this.setBaseUrl();
      this.setAuthorization();
    },
    setBaseUrl() {
      this.$http.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
    },
    setAuthorization() {
      if (Cookies.get("access")) {
        let authorization = "jwt " + Cookies.get("access");
        this.$http.defaults.headers.common["Authorization"] = authorization;
      }
    }
  },
  mounted() {
    this.initAxiosMixins();
  }
};
