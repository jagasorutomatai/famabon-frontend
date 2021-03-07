<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  name: "LineChart",
  mixins: [reactiveProp],
  props: ["options"],
  methods: {
    initLineChart() {
      this.renderChart(this.datas, this.options);
    }
  },
  mounted() {
    this.initLineChart();
  }
};
</script>
