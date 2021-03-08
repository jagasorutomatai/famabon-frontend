<template>
  <v-navigation-drawer app clipped>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle>
          家計簿管理アプリケーション<br />
          家計簿を記入する↓
        </v-list-item-subtitle>
        <v-list-item-action>
          <v-btn
            block
            color="info"
            depressed
            link
            :to="{ name: 'book_create' }"
          >
            <v-icon dark left>
              mdi-plus
            </v-icon>
            作成
          </v-btn>
        </v-list-item-action>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-group v-model="active" prepend-icon="mdi-book-open" no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>家計簿</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item link dense :to="{ name: 'book' }">
          <v-list-item-content>
            <v-list-item-title>
              <v-icon class="mr-3" left small>mdi-account</v-icon>帳簿検索
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link dense :to="{ name: 'setting' }">
          <v-list-item-content>
            <v-list-item-title>
              <v-icon class="mr-3" left small>mdi-tag</v-icon>タグの設定
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-list-item
        link
        :to="{
          name: 'statistics',
          query: now()
        }"
      >
        <v-list-item-icon>
          <v-icon>mdi-chart-bar</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>統計</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-group prepend-icon="mdi-account" no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>アカウント</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
          link
          dense
          :to="{ name: 'account_detail', params: { uuid: uuid } }"
        >
          <v-list-item-content>
            <v-list-item-title>
              <v-icon class="mr-3" left small>mdi-account</v-icon>
              設定
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout()" link dense>
          <v-list-item-content>
            <v-list-item-title>
              <v-icon class="mr-3" left small>mdi-logout</v-icon>
              ログアウト
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Cookies from "js-cookie";
import moment from "moment";
import "moment/locale/ja";

moment.locale("ja");
export default {
  data: () => ({
    active: true,
    selectedItem: 0,
    right: null
  }),
  methods: {
    now() {
      let date_after = moment()
        .startOf("month")
        .format("YYYY-MM-DD");
      let date_before = moment()
        .endOf("month")
        .format("YYYY-MM-DD");
      let date = moment().format("YYYY年MM月");
      return {
        date: date,
        date_after: date_after,
        date_before: date_before
      };
    },
    logout() {
      Cookies.remove("access");
      Cookies.remove("refresh");
      Cookies.remove("account_username");
      Cookies.remove("account_uuid");
      this.$store.dispatch("auth/reset");
      this.$store.dispatch("book/reset");
      this.$store.dispatch("account/reset");
      this.$store.dispatch("tag/reset");
      this.$router.push({ name: "login" });
    }
  },
  computed: {
    uuid() {
      return Cookies.get("account_uuid");
    }
  }
};
</script>

<style></style>
