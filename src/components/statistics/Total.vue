<template>
  <v-card outlined>
    <v-card-subtitle>総支出</v-card-subtitle>
    <v-card-text class="text-right">
      <h2>{{ total }} 円</h2>
    </v-card-text>
    <v-card-subtitle>タグ別支出</v-card-subtitle>
    <v-list two-line>
      <v-list-item dense v-for="tag in total_by_tag" :key="tag.tag__name">
        <v-avatar left>
          <v-icon small :color="tag.tag__color">mdi-tag</v-icon>
        </v-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="tag.tag__name"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-action-text>
          <span class="subtitle-1">{{ tag.total }} 円</span>
        </v-list-item-action-text>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import axiosMixin from "@/mixins/axiosMixin";

export default {
  data: () => ({
    total: 0,
    total_by_tag: []
  }),
  methods: {
    async initTotal() {
      let body = {
        date_after: this.$route.query.date_after,
        date_before: this.$route.query.date_before
      };
      if (
        typeof body.date_after != "undefined" &&
        typeof body.date_before != "undefined"
      ) {
        await this.callApiGetFilterTotalByTag(body);
        await this.callApiGetFilterTotal(body);
      } else {
        await this.callApiGetTotalByTag();
        await this.callApiGetTotal();
      }
      this.total = this.$store.getters["statistics/getTotal"];
      this.total_by_tag = this.$store.getters["statistics/getTotalByTag"];
    },
    // 統計データ(タグ別の合計)を取得するAPI呼び出し
    callApiGetTotalByTag() {
      return this.$http.get("/household/books/totalByTag/").then(response => {
        this.$store.dispatch("statistics/dispatchTotalByTag", {
          total_by_tag: response.data
        });
      });
    },
    // 統計データ(帳簿の合計)を取得するAPI呼び出し
    callApiGetTotal() {
      return this.$http.get("/household/books/total/").then(response => {
        this.$store.dispatch("statistics/dispatchTotal", {
          total: response.data.total
        });
      });
    },
    // フィルターした統計データ(タグ別の合計)を取得するAPI呼び出し
    callApiGetFilterTotalByTag(body) {
      let url = "/household/books/totalByTag/";
      if (body != null) {
        let date_after = "date_after=" + body.date_after;
        let date_before = "date_before=" + body.date_before;
        url = url + "?" + date_after + "&" + date_before;
      }
      return this.$http.get(url).then(response => {
        this.$store.dispatch("statistics/dispatchTotalByTag", {
          total_by_tag: response.data
        });
      });
    },
    // フィルターした統計データ(帳簿の合計)を取得するAPI呼び出し
    callApiGetFilterTotal(body) {
      let url = "/household/books/total/";
      let date_after = "date_after=" + body.date_after;
      let date_before = "date_before=" + body.date_before;
      url = url + "?" + date_after + "&" + date_before;
      return this.$http.get(url).then(response => {
        this.$store.dispatch("statistics/dispatchTotal", {
          total: response.data.total
        });
      });
    }
  },
  watch: {
    $route() {
      this.initTotal();
    }
  },
  mounted() {
    this.initTotal();
  },
  mixins: [axiosMixin]
};
</script>
