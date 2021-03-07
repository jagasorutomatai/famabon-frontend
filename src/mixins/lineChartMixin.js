import axiosMixin from "@/mixins/axiosMixin";

export default {
  data: () => ({
    line_chart_data: { labels: [], datasets: [] },
    line_chart_options: {}
  }),
  methods: {
    async initLineChart() {
      let body = {
        date_after: this.$route.query.date_after,
        date_before: this.$route.query.date_before
      };
      if (
        typeof date_after != "undefined" &&
        typeof date_before != "undefined"
      ) {
        await this.callApiGetFilterTotalByDate(body);
      } else {
        await this.callApiGetTotalByDate();
      }
      let labels = this.$store.getters["statistics/getTotalByDateLabels"];
      let data = this.$store.getters["statistics/getTotalByDateData"];
      this.line_chart_data = {
        labels: labels,
        datasets: [
          {
            label: "収入",
            data: data,
            borderColor: "rgba(255, 146, 51, 1)",
            backgroundColor: "rgba(0, 0, 0, 0.1)"
          }
        ]
      };
      this.line_chart_options = {
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
    // 統計データ(日別の合計)を取得するAPI呼び出し
    callApiGetTotalByDate() {
      this.$http.get("/household/books/totalByDate/").then(response => {
        this.$store.dispatch("statistics/dispatchTotalByDate", {
          total_by_date: response.data
        });
      });
    },
    // フィルターした統計データ(日別の合計)を取得するAPI呼び出し
    callApiGetFilterTotalByDate(body) {
      let url = "/household/books/totalByDate/";
      let date_after = "date_after=" + body.date_after;
      let date_before = "date_before=" + body.date_before;
      url = url + "?" + date_after + "&" + date_before;
      this.$http.get(url).then(response => {
        this.$store.dispatch("statistics/dispatchTotalByDate", {
          total_by_date: response.data
        });
      });
    }
  },
  watch: {
    $route() {
      this.initLineChart();
    }
  },
  mounted() {
    this.initLineChart();
  },
  mixins: [axiosMixin]
};
