import { FamabonApi } from "@/api/api.js";
import Cookies from "js-cookie";
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
  restApiGetTotal({ commit }, payload = null) {
    let famabonApi = new FamabonApi();
    let url = "/household/books/total/";

    // URLクエリパラメータが存在する場合の処理
    if (payload != null) {
      let date_after = "date_after=" + payload.date_after;
      let date_before = "date_before=" + payload.date_before;
      url = url + "?" + date_after + "&" + date_before;
    }

    famabonApi.setRequestHeader(Cookies.get("access"));
    return famabonApi
      .get(url)
      .then(response => {
        commit("changeTotal", { total: response.data.total });
      })
      .catch(error => {
        console.log(error);
      });
  },

  /**
   * 帳簿の日別の合計一覧を取得する処理
   */
  restApiGetTotalByDate({ commit }, payload = null) {
    let famabonApi = new FamabonApi();
    let url = "/household/books/totalByDate/";

    // URLクエリパラメータが存在する場合の処理
    if (payload != null) {
      let date_after = "date_after=" + payload.date_after;
      let date_before = "date_before=" + payload.date_before;
      url = url + "?" + date_after + "&" + date_before;
    }

    famabonApi.setRequestHeader(Cookies.get("access"));
    return famabonApi
      .get(url)
      .then(response => {
        commit("changeTotalByDate", { total_by_date: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  },

  /**
   * タグ別の合計一覧を取得する処理
   */
  restApiGetTotalByTag({ commit }, payload = null) {
    let famabonApi = new FamabonApi();
    let url = "/household/books/totalByTag/";

    // URLクエリパラメータが存在する場合の処理
    if (payload != null) {
      let date_after = "date_after=" + payload.date_after;
      let date_before = "date_before=" + payload.date_before;
      url = url + "?" + date_after + "&" + date_before;
    }

    famabonApi.setRequestHeader(Cookies.get("access"));
    return famabonApi
      .get(url)
      .then(response => {
        commit("chageTotalByTag", { total_by_tag: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  },

  /**
   * 全帳簿の日付一覧を取得する処理
   */
  restApiGetPeriod({ commit }) {
    let famabonApi = new FamabonApi();
    let url = "/household/books/period/";
    famabonApi.setRequestHeader(Cookies.get("access"));
    return famabonApi
      .get(url)
      .then(response => {
        commit("chagePeriod", { period: response.data });
      })
      .catch(error => {
        console.log(error);
      });
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
