<template>
  <div class="home">
    <v-row class="pa-3">
      <v-col cols="12" sm="4">
        <p class="mt-3">直近1ヶ月の支出</p>
        <Total />
      </v-col>
      <v-col cols="12" sm="8">
        <p class="mt-3">最近作成した帳簿</p>
        <BookListTable :book_list="bookList" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BookListTable from "@/components/household/BookListTable.vue";
import Total from "@/components/statistics/Total.vue";

export default {
  components: {
    BookListTable,
    Total
  },
  computed: {
    bookList() {
      return this.$store.getters["book/getBookList"];
    }
  },
  methods: {
    initHome() {
      this.callApiGetBookList();
    },

    /* 帳簿全件取得するAPI呼び出し */
    callApiGetBookList() {
      let url = process.env.VUE_APP_API_BOOKS;
      return this.$http.get(url).then(response => {
        this.$store.dispatch("book/dispatchBookList", {
          book_list: response["data"]
        });
      });
    }
  },
  mounted() {
    this.initHome();
  }
};
</script>
