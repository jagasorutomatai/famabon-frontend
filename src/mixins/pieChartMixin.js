import axiosMixin from "@/mixins/axiosMixin";

export default {
  data: () => ({
    pie_chart_data: { labels: [], datasets: [] },
    pie_chart_options: {}
  }),
  methods: {
    async initPieChart() {
      let body = {
        date_after: this.$route.query.date_after,
        date_before: this.$route.query.date_before
      };
      if (
        typeof date_after != "undefined" &&
        typeof date_before != "undefined"
      ) {
        await this.callApiGetFilterTotalByTag(body);
      } else {
        await this.callApiGetTotalByTag();
      }

      let labels = this.$store.getters["statistics/getTotalByTagLabels"];
      let data = this.$store.getters["statistics/getTotalByTagData"];
      let colors = this.$store.getters["statistics/getTotalByTagColors"];
      this.pie_chart_data = {
        labels: labels,
        datasets: [
          {
            label: "収入",
            data: data,
            borderColor: "rgba(255, 146, 51, 1)",
            backgroundColor: colors
          }
        ]
      };
      this.pie_chart_options = {
        responsive: true,
        maintainAspectRatio: false
      };
    },
    // 統計データ(タグ別の合計)を取得するAPI呼び出し
    callApiGetTotalByTag() {
      return this.$http.get("/household/books/totalByTag/").then(response => {
        this.$store.dispatch("statistics/dispatchTotalByTag", {
          total_by_tag: response.data
        });
      });
    },
    // フィルターした統計データ(タグ別の合計)を取得するAPI呼び出し
    callApiGetFilterTotalByTag(body) {
      let url = "/household/books/totalByTag/";
      let date_after = "date_after=" + body.date_after;
      let date_before = "date_before=" + body.date_before;
      url = url + "?" + date_after + "&" + date_before;
      return this.$http.get(url).then(response => {
        this.$store.dispatch("statistics/dispatchTotalByTag", {
          total_by_tag: response.data
        });
      });
    }
  },
  watch: {
    $route() {
      this.initPieChart();
    }
  },
  mounted() {
    this.initPieChart();
  },
  mixins: [axiosMixin]
};
