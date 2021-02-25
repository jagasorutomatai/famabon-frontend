<template>
  <v-row align="center" justify="center" style="height: 100%;">
    <v-col lg="3" md="6" sm="10">
      <div>
        <v-form>
          <v-alert v-if="is_error" type="error">{{ error_message }}</v-alert>
          <v-card class="pa-4 text-center" outlined>
            <v-card-text class="mb-3"><h3>ログイン</h3></v-card-text>
            <v-text-field
              dense
              label="ユーザー名"
              outlined
              v-model="form.username"
            ></v-text-field>
            <v-text-field
              :append-icon="is_show_password ? 'mdi-eye' : 'mdi-eye-off'"
              dense
              label="パスワード"
              outlined
              :type="is_show_password ? 'text' : 'password'"
              @click:append="is_show_password = !is_show_password"
              v-model="form.password"
            ></v-text-field>
            <v-btn block class="mb-2" color="info" @click="login()" depressed>
              ログイン
            </v-btn>
            <v-divider class="my-4" />
            <p>アカウントをお持ちでない方</p>
            <v-btn @click="toAccountCreatePage()" block depressed>
              アカウント新規作成
            </v-btn>
          </v-card>
        </v-form>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { FamabonApi } from "@/api/api.js";
import Cookies from "js-cookie";

const api = new FamabonApi();
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
      api
        .createJWT(this.form)
        .then(response => {
          if (response.status == "200") {
            Cookies.set("access", response["data"]["access"]);
            Cookies.set("refresh", response["data"]["refresh"]);
            api.setRequestHeader(Cookies.get("access"));
            api.getCurrentAccount().then(response => {
              Cookies.set("account_username", response["data"]["username"]);
              Cookies.set("account_uuid", response["data"]["uuid"]);
            });
            this.$store.dispatch("auth/login");
            this.is_error = false;
            this.$router.push({ path: "/" });
          }
        })
        .catch(error => {
          if (error.response.status == "400") {
            this.is_error = true;
          }
        });
    },
    toAccountCreatePage() {
      this.$router.push({ name: "account_create" });
    }
  }
};
</script>

<style></style>
