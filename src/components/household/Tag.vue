<template>
  <div>
    <v-tabs v-model="tab">
      <v-tab>全件(タブ名)</v-tab>
      <v-tab>今月(タブ名)</v-tab>
      <v-tab>検索結果(タブ名)</v-tab>
    </v-tabs>
    <v-divider></v-divider>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-data-table
          :headers="headers"
          :items="bookListAll"
          :items-per-page="10"
          class="elevation-1"
        ></v-data-table>
      </v-tab-item>
      <v-tab-item>
        <v-data-table
          :headers="headers"
          :items="bookListThisMonth"
          :items-per-page="10"
          class="elevation-1"
        ></v-data-table>
      </v-tab-item>
      <v-tab-item>
        <v-data-table
          :headers="headers"
          :items="bookListSearched"
          :items-per-page="10"
          class="elevation-1"
        ></v-data-table>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  data: () => ({
    headers: [
      { text: "日付", value: "date" },
      { text: "項目名", value: "title" },
      { text: "タグ", value: "tag" },
      { text: "金額(円)", value: "money" }
    ],
    tab: null
  }),
  methods: {
    search() {
      console.log(this.form.title);
      this.$store.dispatch("book/restApiGetFilterBookList", this.form);
      this.tab = 2;
    }
  },
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
  created() {
    this.$store.dispatch("book/restApiGetBookListAll");
    this.$store.dispatch("book/restApiGetBookListThisMonth");
  }
};
</script>

<style></style>
