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
import { FamabonApi } from "@/api/api.js";
import Cookies from "js-cookie";

const api = new FamabonApi();

export default {
  data: () => ({
    total: 0,
    total_by_tag: []
  }),
  methods: {
    async initTotal() {
      api.setRequestHeader(Cookies.get("access"));
      let date_after = this.$route.query.date_after;
      let date_before = this.$route.query.date_before;
      if (
        typeof date_after != "undefined" &&
        typeof date_before != "undefined"
      ) {
        await api
          .getFilterTotalByTag({
            date_after: this.$route.query.date_after,
            date_before: this.$route.query.date_before
          })
          .then(response => {
            this.$store.dispatch("statistics/dispatchTotalByTag", {
              total_by_tag: response.data
            });
          });
        await api
          .getFilterTotal({
            date_after: this.$route.query.date_after,
            date_before: this.$route.query.date_before
          })
          .then(response => {
            this.$store.dispatch("statistics/dispatchTotal", {
              total: response.data.total
            });
          });
      } else {
        await api.getTotalByTag().then(response => {
          this.$store.dispatch("statistics/dispatchTotalByTag", {
            total_by_tag: response.data
          });
        });
        await api.getTotal().then(response => {
          this.$store.dispatch("statistics/dispatchTotal", {
            total: response.data.total
          });
        });
      }
      this.total = this.$store.getters["statistics/getTotal"];
      this.total_by_tag = this.$store.getters["statistics/getTotalByTag"];
    }
  },
  watch: {
    $route() {
      this.initTotal();
    }
  },
  mounted() {
    this.initTotal();
  }
};
</script>

<style></style>
