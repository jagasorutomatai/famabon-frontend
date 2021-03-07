<script>
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Bar,
  name: "Barchart",
  mixins: [reactiveProp],
  props: ["options"],
  methods: {
    initBarChart() {
      this.renderChart(this.data, this.options);
    }
  },
  mounted() {
    this.initBarChart();
  }
};
</script>
