<script>
import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Doughnut,
  name: "PieChart",
  mixins: [reactiveProp],
  props: ["options"],
  mounted() {
    this.renderChart(this.datas, this.options);
  }
};
</script>
