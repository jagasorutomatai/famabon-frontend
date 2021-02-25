const axios = require("axios");

/**
 * FamabonApiクラスのインスタンスを作成する。
 * @constructor
 * @this {FamabonApi}
 */
class FamabonApi {
  constructor() {
    this.api = axios.create({
      baseURL: "http://127.0.0.1:8001/api/v1/"
    });
  }

  /**
   * Request headerの設定を行う関数
   * @param [jwt] - jwt(Json Web Token)
   */
  setRequestHeader(jwt = null) {
    if (jwt) {
      let authorization = "jwt " + jwt;
      this.api.defaults.headers.common["Authorization"] = authorization;
    }
  }

  /**
   * GET Request
   */
  get(url) {
    return this.api.get(url);
  }

  /**
   * POST Request
   * @param [body] Request Payload
   */
  post(url, body) {
    return this.api.post(url, body);
  }

  /**
   * PUT Request
   */
  put(url, body) {
    return this.api.put(url, body);
  }

  /**
   * DELETE Request
   */
  delete(url) {
    return this.api.delete(url);
  }

  /**
   * REST API method:GET URL: /account/auth/users/me/
   */
  getCurrentAccount() {
    let url = "/account/auth/users/me/";
    return this.api.get(url);
  }

  /**
   * REST API method:POST URL: /account/auth/users/
   */
  createAccount(body) {
    let url = "/account/auth/users/";
    return this.api.post(url, body);
  }

  changePassword(body) {
    let url = "/account/auth/users/set_password/";
    return this.api.post(url, body);
  }

  /**
   * REST API method:POST URL: /account/auth/jwt/create/
   */
  createJWT(body) {
    let url = "/account/auth/jwt/create/";
    return this.api.post(url, body);
  }

  /**
   * REST API method:POST URL: /account/auth/jwt/verify/
   */
  verifyToken(body) {
    let url = "/account/auth/jwt/verify/";
    return this.api.post(url, body);
  }

  /**
   * REST API method:POST URL: /account/auth/users/
   */
  createBook(body) {
    let url = "/household/books/";
    return this.api.post(url, body);
  }

  /**
   * REST API method:PUT URL: /household/books/:uuid/
   */
  updateBook(body) {
    let url = "/household/books/" + body.uuid + "/";
    return this.api.put(url, body);
  }

  /**
   * REST API method:DELETE URL: /household/books/:uuid/
   */
  deleteBook(body) {
    let url = "/household/books/" + body.uuid + "/";
    return this.api.delete(url);
  }

  /**
   * REST API method:GET URL: /household/books/
   */
  getBookList() {
    let url = "/household/books/";
    return this.api.get(url);
  }

  /**
   * REST API method:GET URL: /household/books/:uuid/
   */
  getBookDetail(body) {
    let url = "/household/books/" + body.uuid + "/";
    return this.api.get(url);
  }

  /**
   * REST API method:GET URL: /household/books/?tile=&date_after=&date_before=&tag=
   */
  getFilterBookList(body) {
    let title = "title=" + body.title;
    let date_after = "date_after=" + body.date_after;
    let date_before = "date_before=" + body.date_before;
    let tag = "tag=" + body.tag;
    let url =
      "/household/books/?" +
      title +
      "&" +
      date_after +
      "&" +
      date_before +
      "&" +
      tag;
    return this.api.get(url);
  }

  /**
   * REST API method:GET URL: /household/tags/
   */
  getTagList() {
    let url = "/household/tags/";
    return this.api.get(url);
  }

  /**
   * REST API method:POST URL: /household/tags/
   */
  createTag(body) {
    let url = "/household/tags/";
    return this.api.post(url, body);
  }

  /**
   * REST API method:PUT URL: /household/tags/:uuid/
   */
  updateTag(body) {
    let url = "/household/tags/" + body.uuid + "/";
    return this.api.put(url, body);
    // return famabonApi.put(url, { name: payload.name, color: payload.color });
  }

  /**
   * REST API method:DELETE URL: /household/tags/:uuid/
   */
  deleteTag(body) {
    let url = "/household/tags/" + body.uuid + "/";
    return this.api.delete(url);
  }

  /**
   * REST API method:GET URL: /household/books/total
   */
  getTotal() {
    let url = "/household/books/total/";
    return this.api.get(url);
  }

  /**
   * REST API method:GET URL: /household/books/total/?date_after=&date_before=
   */
  getFilterTotal(body) {
    let url = "/household/books/total/";
    let date_after = "date_after=" + body.date_after;
    let date_before = "date_before=" + body.date_before;
    url = url + "?" + date_after + "&" + date_before;
    return this.api.get(url);
  }

  /**
   * REST API method:GET URL: /household/books/totalByDate/
   */
  getTotalByDate() {
    let url = "/household/books/totalByDate/";
    return this.api.get(url);
  }

  /**
   * REST API method:GET URL: /household/books/totalByDate/?date_after=&date_before=
   */
  getFilterTotalByDate(body) {
    let url = "/household/books/totalByDate/";
    let date_after = "date_after=" + body.date_after;
    let date_before = "date_before=" + body.date_before;
    url = url + "?" + date_after + "&" + date_before;
    return this.api.get(url);
  }

  /**
   * REST API method:GET URL: /household/books/totalByTag/
   */
  getTotalByTag() {
    let url = "/household/books/totalByTag/";
    return this.api.get(url);
  }

  /**
   * REST API method:GET URL: /household/books/totalByTag/?date_after=&date_before=
   */
  getFilterTotalByTag(body) {
    let url = "/household/books/totalByTag/";
    if (body != null) {
      let date_after = "date_after=" + body.date_after;
      let date_before = "date_before=" + body.date_before;
      url = url + "?" + date_after + "&" + date_before;
    }
    return this.api.get(url);
  }

  /**
   * REST API method:GET URL: /household/books/period/
   */
  getPeriod() {
    let url = "/household/books/period/";
    return this.api.get(url);
  }
}

export { FamabonApi };
