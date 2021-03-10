import moment from "moment";
import "moment/locale/ja";

moment.locale("ja");

const state = () => ({
  total: 0,
  total_by_date: [],
  total_by_tag: [],
  period: []
});

const getters = {
  getTotal: state => {
    return state.total;
  },

  getTotalByDate: state => {
    return state.total_by_date;
  },

  getTotalByDateData: state => {
    let data = [];
    for (let row of state.total_by_date) {
      data.push(row.total);
    }
    return data;
  },

  getTotalByDateLabels: state => {
    let labels = [];
    for (let row of state.total_by_date) {
      labels.push(row.date);
    }
    return labels;
  },

  getTotalByTag: state => {
    return state.total_by_tag;
  },

  getTotalByTagData: state => {
    let data = [];
    for (let row of state.total_by_tag) {
      data.push(row.total);
    }
    return data;
  },

  getTotalByTagLabels: state => {
    let labels = [];
    for (let row of state.total_by_tag) {
      labels.push(row.tag__name);
    }
    return labels;
  },

  getTotalByTagColors: state => {
    let colors = [];
    for (let row of state.total_by_tag) {
      colors.push(row.tag__color);
    }
    return colors;
  },

  getPeriod: state => {
    return state.period;
  },

  getPeriodByModal: state => {
    let period = [];
    for (let row of state.period) {
      let date = moment(row.date);
      period.push(date.format("YYYY-MM"));
    }
    period = Array.from(new Set(period));
    let period_by_modal = [];
    for (let row of period) {
      let date = moment(row);
      period_by_modal.push({
        date: date.format("YYYY年MM月"),
        date_after: date.startOf("month").format("YYYY-MM-DD"),
        date_before: date.endOf("month").format("YYYY-MM-DD")
      });
    }
    return period_by_modal;
  }
};

const actions = {
  /**
   * 帳簿の合計を取得する処理
   */
  dispatchTotal({ commit }, payload) {
    commit("changeTotal", payload);
  },

  dispatchTotalByDate({ commit }, payload) {
    commit("changeTotalByDate", payload);
  },

  dispatchTotalByTag({ commit }, payload) {
    commit("chageTotalByTag", payload);
  },

  dispatchPeriod({ commit }, payload) {
    commit("chagePeriod", payload);
  }
};

const mutations = {
  changeTotal(state, payload) {
    state.total = payload.total;
  },
  changeTotalByDate(state, payload) {
    state.total_by_date = payload.total_by_date;
  },
  chageTotalByTag(state, payload) {
    state.total_by_tag = payload.total_by_tag;
  },
  chagePeriod(state, payload) {
    state.period = payload.period;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
