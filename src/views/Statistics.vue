<template>
  <div>
    <v-system-bar window class="mt-5 white">
      <v-btn
        name="dialog"
        small
        @click="openDialog()"
        class="mr-3"
        depressed
        color="primary"
        outlined
        >期間指定</v-btn
      >
      <v-chip small label class="mr-3" color="primary">
        {{ display_date }}
      </v-chip>
    </v-system-bar>
    <!-- 期間指定用フォームのダイアログボックス -->
    <v-dialog v-model="dialog" @click:outside="cancel()" max-width="500px">
      <v-card outlined>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="12" class="mt-5">
              期間指定<br /><v-divider />
            </v-col>
            <v-col v-for="item in period" :key="item.date" cols="12" sm="4">
              <v-btn
                name="submit"
                @click="changePeriod(item)"
                v-text="item.date"
                block
                color="primary"
                depressed
                dark
              ></v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn name="cancel" @click="cancel()" depressed>キャンセル</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row class="pa-3">
      <v-col cols="12" sm="4">
        <Total />
      </v-col>
      <v-col cols="12" sm="8">
        <v-row>
          <v-col cols="12" sm="12">
            <v-card outlined min-height="310px" class="pa-3">
              <v-card-subtitle>総計</v-card-subtitle>
              <LineChart
                :chart-data="line_chart_data"
                :options="line_chart_options"
                style="height: 100%;"
              ></LineChart>
            </v-card>
          </v-col>
          <v-col cols="12" sm="12">
            <v-card outlined min-height="310px" class="pa-3">
              <v-card-subtitle>総計</v-card-subtitle>
              <PieChart
                :chart-data="pie_chart_data"
                :options="pie_chart_options"
                style="height: 100%;"
              />
            </v-card>
          </v-col>
          <v-col cols="12" sm="12">
            <v-card outlined min-height="310px" class="pa-3">
              <v-card-subtitle>総計</v-card-subtitle>
              <BarChart
                :chart-data="bar_chart_data"
                :options="bar_chart_options"
                style="height: 100%;"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LineChart from "../components/statistics/LineChart.vue";
import PieChart from "../components/statistics/PieChart.vue";
import BarChart from "../components/statistics/BarChart.vue";
import Total from "../components/statistics/Total.vue";
import lineChartMixin from "../mixins/lineChartMixin";
import pieChartMixin from "../mixins/pieChartMixin";
import barChartMixin from "../mixins/barChartMixin";
import axiosMixin from "@/mixins/axiosMixin";

export default {
  components: {
    LineChart,
    PieChart,
    BarChart,
    Total
  },
  data: () => ({
    dialog: false,
    display_date: "〇〇年〇〇月"
  }),
  computed: {
    period() {
      return this.$store.getters["statistics/getPeriodByModal"];
    }
  },
  methods: {
    initStatistics() {
      this.display_date = this.$route.query.date;
      this.callApiGetPeriod();
    },
    changePeriod(item) {
      this.$router.push({
        name: "statistics",
        query: item
      });
      this.dialog = false;
    },
    openDialog() {
      this.dialog = true;
    },
    cancel() {
      this.dialog = false;
    },
    // 帳簿の期間を取得するAPI呼び出し
    callApiGetPeriod() {
      this.$http.get().then(response => {
        this.$store.dispatch("statistics/dispatchPeriod", {
          period: response.data
        });
      });
    }
  },
  watch: {
    $route() {
      this.display_date = this.$route.query.date;
    }
  },
  mounted() {
    this.initStatistics();
  },
  mixins: [lineChartMixin, pieChartMixin, barChartMixin, axiosMixin]
};
</script>
