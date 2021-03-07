import Cookies from "js-cookie";

export default {
  mounted() {
    this.$http.defaults.baseURL = "http://127.0.0.1:8001/api/v1/";

    if (Cookies.get("access")) {
      let authorization = "jwt " + Cookies.get("access");
      this.$http.defaults.headers.common["Authorization"] = authorization;
    }
  }
};
