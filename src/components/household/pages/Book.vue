<template>
  <div>
    <BookSearch />
    <v-tabs v-model="tab">
      <v-tab>全件</v-tab>
      <v-tab>今月</v-tab>
      <v-tab>検索結果</v-tab>
    </v-tabs>
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
import BookSearch from "../BookSearch.vue";
import BookListTable from "../BookListTable.vue";
import moment from "moment";
import "moment/locale/ja";
import axiosMixin from "@/mixins/axiosMixin";

moment.locale("ja");

export default {
  components: {
    BookListTable,
    BookSearch
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
  methods: {
    initBook() {
      this.callApiGetBookList();
      this.callApiGetFilterBookList();
    },
    /* 帳簿全件取得するAPI呼び出し */
    callApiGetBookList() {
      let url = process.env.VUE_APP_API_BOOKS;
      return this.$http.get(url).then(response => {
        this.$store.dispatch("book/dispatchBookList", {
          book_list: response["data"]
        });
      });
    },
    /* 今月分の帳簿取得するAPI呼び出し */
    callApiGetFilterBookList() {
      let date_after = moment()
        .startOf("month")
        .format("YYYY-MM-DD");
      let date_before = moment()
        .endOf("month")
        .format("YYYY-MM-DD");
      let url =
        process.env.VUE_APP_API_BOOKS +
        "?" +
        "date_after=" +
        date_after +
        "&" +
        "date_before=" +
        date_before;
      return this.$http.get(url).then(response => {
        this.$store.dispatch("book/dispatchCurrentBookList", {
          current_book_list: response["data"]
        });
      });
    }
  },
  mounted() {
    this.initBook();
  },
  mixins: [axiosMixin]
};
</script>

<style></style>
