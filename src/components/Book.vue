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
        <v-data-table
          :headers="headers"
          :items="bookListAll"
          :items-per-page="10"
          class="elevation-1"
        >
          <template v-slot:[`item.date`]="{ item }">
            {{ item.date.slice(0, 10) }}
          </template>
          <template v-slot:[`item.tag`]="{ item }">
            <v-chip
              v-if="item.tag[0]"
              class="ma-2"
              :color="item.tag[0].color"
              text-color="white"
              small
            >
              <v-avatar left>
                <v-icon small>mdi-tag</v-icon>
              </v-avatar>
              {{ item.tag[0].name }}
            </v-chip>
          </template>
        </v-data-table>
      </v-tab-item>
      <v-tab-item>
        <v-data-table
          :headers="headers"
          :items="bookListThisMonth"
          :items-per-page="10"
          class="elevation-1"
        >
          <template v-slot:[`item.date`]="{ item }">
            {{ item.date.slice(0, 10) }}
          </template>
          <template v-slot:[`item.tag`]="{ item }">
            <v-chip
              v-if="item.tag[0]"
              class="ma-2"
              :color="item.tag[0].color"
              text-color="white"
              small
            >
              <v-avatar left>
                <v-icon small>mdi-tag</v-icon>
              </v-avatar>
              {{ item.tag[0].name }}
            </v-chip>
          </template>
        </v-data-table>
      </v-tab-item>
      <v-tab-item>
        <v-data-table
          :headers="headers"
          :items="bookListSearched"
          :items-per-page="10"
          class="elevation-1"
        >
          <template v-slot:[`item.date`]="{ item }">
            {{ item.date.slice(0, 10) }}
          </template>
          <template v-slot:[`item.tag`]="{ item }">
            <v-chip
              v-if="item.tag[0]"
              class="ma-2"
              :color="item.tag[0].color"
              text-color="white"
              small
            >
              <v-avatar left>
                <v-icon small>mdi-tag</v-icon>
              </v-avatar>
              {{ item.tag[0].name }}
            </v-chip>
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import Search from "../components/Searche.vue";

export default {
  components: {
    Search
  },
  data: () => ({
    headers: [
      { text: "日付", value: "date" },
      { text: "項目名", value: "title" },
      { text: "タグ", value: "tag" },
      { text: "金額(円)", value: "money" }
    ],
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
