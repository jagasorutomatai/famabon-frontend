<template>
  <v-row align="center" justify="center" style="height: 100%;">
    <v-col lg="3" md="6" sm="10">
      <div>
        <v-form>
          <v-card class="pa-4 text-center" outlined>
            <v-card-text class="mb-3"><h3>アカウント新規作成</h3></v-card-text>
            <v-text-field
              name="username"
              dense
              label="ユーザー名"
              outlined
              v-model="form.username"
              :error="this.error_messages['username'] ? true : false"
              :error-messages="this.error_messages['username']"
            ></v-text-field>
            <v-text-field
              name="email"
              dense
              label="メールアドレス"
              outlined
              v-model="form.email"
              :error="this.error_messages['email'] ? true : false"
              :error-messages="this.error_messages['email']"
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
              :error="this.error_messages['password'] ? true : false"
              :error-messages="this.error_messages['password']"
            ></v-text-field>
            <v-text-field
              name="re_password"
              :append-icon="is_show_password ? 'mdi-eye' : 'mdi-eye-off'"
              dense
              label="パスワード(確認用)"
              outlined
              :type="is_show_password ? 'text' : 'password'"
              @click:append="is_show_password = !is_show_password"
              v-model="form.re_password"
              :error="this.error_messages['re_password'] ? true : false"
              :error-messages="this.error_messages['re_password']"
            ></v-text-field>
            <v-btn
              name="submit"
              block
              class="mb-2"
              color="info"
              @click="createAccount()"
              depressed
            >
              アカウント作成
            </v-btn>
          </v-card>
        </v-form>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import axiosMixin from "@/mixins/axiosMixin";

export default {
  data: () => ({
    is_show_password: false,
    form: {
      username: "",
      email: "",
      password: "",
      re_password: ""
    },
    error_messages: {}
  }),
  methods: {
    createAccount() {
      return this.$http
        .post("/account/auth/users/", this.form)
        .then(response => {
          if (response.status == "201") {
            this.$router.push({ name: "login" });
          }
        })
        .catch(error => {
          this.error_messages = error.response.data;
        });
    }
  },
  mixins: [axiosMixin]
};
</script>

<style></style>
