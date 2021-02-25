<template>
  <div>
    <Search />
    <v-tabs v-model="tab">
      <v-tab>全件</v-tab>
      <v-tab>今月</v-tab>
      <v-tab>検索結果</v-tab>
    </v-tabs>
    <v-divider></v-divider>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <BookListTable :book_list="bookList" />
      </v-tab-item>
      <v-tab-item>
        <BookListTable :book_list="CurrentBookList" />
      </v-tab-item>
      <v-tab-item>
        <BookListTable :book_list="SearchedbookList" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import Search from "../Searche.vue";
import BookListTable from "../BookListTable.vue";
import { FamabonApi } from "@/api/api.js";
import Cookies from "js-cookie";
import moment from "moment";
import "moment/locale/ja";

const api = new FamabonApi();
moment.locale("ja");

export default {
  components: {
    BookListTable,
    Search
  },
  data: () => ({
    tab: null
  }),
  computed: {
    bookList() {
      return this.$store.getters["book/getBookList"];
    },
    CurrentBookList() {
      return this.$store.getters["book/getCurrentBookList"];
    },
    SearchedbookList() {
      return this.$store.getters["book/getSearchedBookList"];
    }
  },
  watch: {
    SearchedbookList() {
      this.tab = 2;
    }
  },
  mounted() {
    // jwtをRequestヘッダーに設定する
    api.setRequestHeader(Cookies.get("access"));

    // 今月の月初と月末を取得する
    let date_after = moment()
      .startOf("month")
      .format("YYYY-MM-DD");
    let date_before = moment()
      .endOf("month")
      .format("YYYY-MM-DD");

    api.getBookList().then(response => {
      this.$store.dispatch("book/dispatchBookList", {
        book_list: response["data"]
      });
    });
    api
      .getFilterBookList({
        title: "",
        date_after: date_after,
        date_before: date_before,
        tag: ""
      })
      .then(response => {
        this.$store.dispatch("book/dispatchCurrentBookList", {
          current_book_list: response["data"]
        });
      });
  }
};
</script>

<style></style>
