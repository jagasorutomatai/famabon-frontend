<template>
  <v-row align="center" justify="center" style="height: 100%;">
    <v-col lg="3" md="6" sm="10">
      <div>
        <v-form>
          <v-alert v-if="is_error" type="error">{{ error_message }}</v-alert>
          <v-card class="pa-4 text-center" outlined>
            <v-card-text class="mb-3"><h3>ログイン</h3></v-card-text>
            <v-text-field
              name="username"
              dense
              label="ユーザー名"
              outlined
              v-model="form.username"
            ></v-text-field>
            <v-text-field
              name="password"
              :append-icon="is_show_password ? 'mdi-eye' : 'mdi-eye-off'"
              dense
              label="パスワード"
              outlined
              :type="is_show_password ? 'text' : 'password'"
              @click:append="is_show_password = !is_show_password"
              v-model="form.password"
            ></v-text-field>
            <v-btn
              name="submit"
              block
              class="mb-2"
              color="info"
              @click="login()"
              depressed
            >
              ログイン
            </v-btn>
            <v-divider class="my-4" />
            <p>アカウントをお持ちでない方</p>
            <v-btn name="create" @click="toAccountCreatePage()" block depressed>
              アカウント新規作成
            </v-btn>
          </v-card>
        </v-form>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import axiosMixin from "@/mixins/axiosMixin";
import Cookies from "js-cookie";

const error_message = "ユーザー名またはパスワードを確認できません";

export default {
  data: () => ({
    is_error: false,
    error_message: error_message,
    is_show_password: false,
    form: {
      username: "",
      password: ""
    }
  }),
  methods: {
    async login() {
      if (await this.callApiCreateJWT()) {
        this.setAuthorization();
        await this.callApiGetAccountDetail();
        this.$store.dispatch("auth/login");
        this.is_error = false;
        this.$router.push({ name: "home" });
      }
    },
    toAccountCreatePage() {
      this.$router.push({ name: "account_create" });
    },
    // JWTを発行するAPI呼び出し
    callApiCreateJWT() {
      let url = process.env.VUE_APP_API_JWT_CREATE;
      return this.$http
        .post(url, this.form)
        .then(response => {
          if (response.status == "200") {
            Cookies.set("access", response["data"]["access"]);
            Cookies.set("refresh", response["data"]["refresh"]);
            return true;
          }
        })
        .catch(error => {
          if (
            error.response.status == "400" ||
            error.response.status == "401"
          ) {
            this.is_error = true;
            return false;
          }
        });
    },
    // ログインしているアカウントを取得するAPI呼び出し
    callApiGetAccountDetail() {
      let url = process.env.VUE_APP_API_USERS_ME;
      return this.$http.get(url).then(response => {
        Cookies.set("account_username", response["data"]["username"]);
        Cookies.set("account_uuid", response["data"]["uuid"]);
      });
    }
  },
  mixins: [axiosMixin]
};
</script>
