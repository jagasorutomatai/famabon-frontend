export default {
  data: () => ({
    line_chart_data: { labels: [], datasets: [] },
    line_chart_options: {}
  }),
  methods: {
    async initLineChart() {
      let date_after = this.$route.query.date_after;
      let date_before = this.$route.query.date_before;
      if (
        typeof date_after != "undefined" &&
        typeof date_before != "undefined"
      ) {
        await this.$store.dispatch("statistics/restApiGetTotalByDate", {
          date_after: this.$route.query.date_after,
          date_before: this.$route.query.date_before
        });
      } else {
        await this.$store.dispatch("statistics/restApiGetTotalByDate");
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
    }
  },
  watch: {
    $route() {
      this.initLineChart();
    }
  },
  mounted() {
    this.initLineChart();
  }
};
