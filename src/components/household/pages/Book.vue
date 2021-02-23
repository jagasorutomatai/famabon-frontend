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
        <BookListTable :book_list="bookListAll" />
      </v-tab-item>
      <v-tab-item>
        <BookListTable :book_list="bookListThisMonth" />
      </v-tab-item>
      <v-tab-item>
        <BookListTable :book_list="bookListSearched" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import Search from "../Searche.vue";
import BookListTable from "../BookListTable.vue";

export default {
  components: {
    BookListTable,
    Search
  },
  data: () => ({
    tab: null
  }),
  computed: {
    bookListAll() {
      return this.$store.getters["book/getBookListAll"];
    },
    bookListThisMonth() {
      return this.$store.getters["book/getBookListThisMonth"];
    },
    bookListSearched() {
      return this.$store.getters["book/getBookListSearched"];
    }
  },
  watch: {
    bookListSearched() {
      this.tab = 2;
    }
  }
};
</script>

<style></style>
