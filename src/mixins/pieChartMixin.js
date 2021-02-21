export default {
  data: () => ({
    pie_chart_data: { labels: [], datasets: [] },
    pie_chart_options: {}
  }),
  methods: {
    async initPieChart() {
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
    }
  },
  watch: {
    $route() {
      this.initPieChart();
    }
  },
  mounted() {
    this.initPieChart();
  }
};