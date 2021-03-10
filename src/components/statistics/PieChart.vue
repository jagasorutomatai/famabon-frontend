<script>
import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Doughnut,
  name: "PieChart",
  mixins: [reactiveProp],
  props: ["options"],
  methods: {
    initPieChart() {
      this.renderChart(this.datas, this.options);
    }
  },
  mounted() {
    this.initPieChart();
  }
};
</script>
