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
  put() {}

  /**
   * DELETE Request
   */
  delete() {}
}

export { FamabonApi };
