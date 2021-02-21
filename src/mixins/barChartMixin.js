export default {
  data: () => ({
    bar_chart_data: { labels: [], datasets: [] },
    bar_chart_options: {}
  }),
  methods: {
    async initBarChart() {
      let date_after = this.$route.query.date_after;
      let date_before = this.$route.query.date_before;
      if (
        typeof date_after != "undefined" &&
        typeof date_before != "undefined"
      ) {
        await this.$store.dispatch("statistics/restApiGetTotalByTag", {
          date_after: this.$route.query.date_after,
          date_before: this.$route.query.date_before
        });
      } else {
        await this.$store.dispatch("statistics/restApiGetTotalByTag");
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
    }
  },
  watch: {
    $route() {
      this.initBarChart();
    }
  },
  mounted() {
    this.initBarChart();
  }
};
