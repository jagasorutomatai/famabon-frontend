<template>
  <v-row align="center" justify="center" style="height: 100%;">
    <v-col lg="3" md="6" sm="10">
      <div>
        <v-form>
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
            <v-btn block class="mb-2" color="info" @click="login()">
              ログイン
            </v-btn>
            <a>パスワードを忘れた方</a>
            <v-divider class="my-4" />
            <p>アカウントをお持ちでない方</p>
            <v-btn block>アカウント新規作成</v-btn>
          </v-card>
        </v-form>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    is_show_password: false,
    form: {
      username: "",
      password: ""
    }
  }),
  methods: {
    async login() {
      await this.$store.dispatch("auth/login", this.form);
      let is_logged_in = this.$store.getters["auth/getIsLoggedIn"];
      if (is_logged_in) {
        this.$router.push({ path: "/" });
      }
    }
  }
};
</script>

<style></style>
