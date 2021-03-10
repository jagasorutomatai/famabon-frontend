import axiosMixin from "@/mixins/axiosMixin";

export default {
  data: () => ({
    bar_chart_data: { labels: [], datasets: [] },
    bar_chart_options: {}
  }),
  methods: {
    async initBarChart() {
      let body = {
        date_after: this.$route.query.date_after,
        date_before: this.$route.query.date_before
      };
      if (
        typeof body.date_after != "undefined" &&
        typeof body.date_before != "undefined"
      ) {
        await this.callApiGetFilterTotalByTag(body);
      } else {
        await this.callApiGetTotalByTag();
      }
      let labels = this.$store.getters["statistics/getTotalByTagLabels"];
      let data = this.$store.getters["statistics/getTotalByTagData"];
      let colors = this.$store.getters["statistics/getTotalByTagColors"];
      this.bar_chart_data = {
        labels: labels,
        datasets: [
          {
            label: "収入",
            data: data,
            backgroundColor: colors,
            borderWidth: 1
          }
        ]
      };
      this.bar_chart_options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                callback: function(value) {
                  return `${value}円`;
                }
              }
            }
          ]
        },
        responsive: true,
        maintainAspectRatio: false
      };
    },
    // 統計データ(タグ別の合計)を取得するAPI呼び出し
    callApiGetTotalByTag() {
      let url = process.env.VUE_APP_API_BOOKS_TOTALBYTAG;
      return this.$http.get(url).then(response => {
        this.$store.dispatch("statistics/dispatchTotalByTag", {
          total_by_tag: response.data
        });
      });
    },
    // フィルターした統計データ(タグ別の合計)を取得するAPI呼び出し
    callApiGetFilterTotalByTag(body) {
      let url = process.env.VUE_APP_API_BOOKS_TOTALBYTAG;
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
      this.initBarChart();
    }
  },
  mounted() {
    this.initBarChart();
  },
  mixins: [axiosMixin]
};
