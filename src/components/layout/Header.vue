<template>
  <v-app-bar src="logo.png" app clipped-left dense flat dark>
    <v-app-bar-nav-icon @click="sendDrawer()"></v-app-bar-nav-icon>
    <v-toolbar-title>
      <v-icon left class="mb-1">
        mdi-book-open-page-variant-outline
      </v-icon>
      famabon
    </v-toolbar-title>
    <v-spacer />
    <v-chip v-if="account_username" class="ma-2" dark label>
      <v-icon left>
        mdi-account-circle-outline
      </v-icon>
      {{ account_username }}
    </v-chip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-help-circle-outline</v-icon>
        </v-btn>
      </template>
      <span>ヘルプ</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" @click="toGitHubPage()">
          <v-icon>mdi-github</v-icon>
        </v-btn>
      </template>
      <span>本アプリケーションのレポジトリ</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
import Cookies from "js-cookie";

export default {
  data: () => ({
    account_username: ""
  }),
  methods: {
    initHeader() {
      this.account_username = Cookies.get("account_username");
    },
    toGitHubPage() {
      let url = "https://github.com/jagasorutomatai/famabon-frontend";
      window.open(url, "_blank");
    },
    sendDrawer() {
      this.$emit("sendDrawer", this.child_num);
    }
  },
  watch: {
    $route() {
      this.initHeader();
    }
  },
  mounted() {
    this.initHeader();
  }
};
</script>

<style></style>
