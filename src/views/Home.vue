<template>
  <div class="home">
    home
    <v-btn @click="test()">test</v-btn>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  methods: {
    test() {
      let access = Cookies.get("access");
      let result = this.parseJwt(access);
      console.log(result);
      Cookies.set("account_uuid", result.account_uuid);
      console.log(result);
    },
    parseJwt(token) {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function(c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    }
  }
};
</script>
