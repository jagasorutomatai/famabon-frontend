import { FamabonApi } from "@/api/api.js";
import Cookies from "js-cookie";

const api = new FamabonApi();

export default {
  data: () => ({
    bar_chart_data: { labels: [], datasets: [] },
    bar_chart_options: {}
  }),
  methods: {
    async initBarChart() {
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
      } else {
        await api.getTotalByTag().then(response => {
          this.$store.dispatch("statistics/dispatchTotalByTag", {
            total_by_tag: response.data
          });
        });
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
