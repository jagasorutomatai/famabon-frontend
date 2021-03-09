<template>
  <div>
    <v-row justify="center">
      <v-col cols="5" sm="5" class="mt-5">
        <v-card outlined class="pa-3">
          <v-card-title>パスワード変更</v-card-title>
          <v-card-actions>
            <v-text-field
              name="new_password"
              :append-icon="is_show_password ? 'mdi-eye' : 'mdi-eye-off'"
              dense
              label="新しいパスワード"
              outlined
              :type="is_show_password ? 'text' : 'password'"
              @click:append="is_show_password = !is_show_password"
              v-model="form.new_password"
              :error="this.error_messages['new_password'] ? true : false"
              :error-messages="this.error_messages['new_password']"
            ></v-text-field>
          </v-card-actions>
          <v-card-actions>
            <v-text-field
              name="re_new_password"
              :append-icon="is_show_password ? 'mdi-eye' : 'mdi-eye-off'"
              dense
              label="新しいパスワード(確認用)"
              outlined
              :type="is_show_password ? 'text' : 'password'"
              @click:append="is_show_password = !is_show_password"
              v-model="form.re_new_password"
              :error="this.error_messages['re_new_password'] ? true : false"
              :error-messages="this.error_messages['re_new_password']"
            ></v-text-field>
          </v-card-actions>
          <v-card-actions>
            <v-text-field
              name="current_password"
              :append-icon="is_show_password ? 'mdi-eye' : 'mdi-eye-off'"
              dense
              label="現在のパスワード"
              outlined
              :type="is_show_password ? 'text' : 'password'"
              @click:append="is_show_password = !is_show_password"
              v-model="form.current_password"
              :error="this.error_messages['current_password'] ? true : false"
              :error-messages="this.error_messages['current_password']"
            ></v-text-field>
          </v-card-actions>
          <v-card-actions>
            <v-btn
              name="submit"
              @click="update()"
              class="mr-1"
              color="info"
              width="95px"
              depressed
            >
              更新
            </v-btn>

            <v-btn
              @click="cancel()"
              class="ml-1"
              color="secondary"
              width="95px"
              depressed
            >
              キャンセル
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axiosMixin from "@/mixins/axiosMixin";
import Cookies from "js-cookie";

export default {
  data: () => ({
    is_show_password: false,
    form: {
      new_password: "",
      re_new_password: "",
      current_password: ""
    },
    error_messages: {}
  }),
  methods: {
    update() {
      let url = process.env.VUE_APP_API_USERS_SET_PASSWORD;
      this.$http
        .post(url, this.form)
        .then(response => {
          if (response.status == "204") {
            this.error_messages = {};
            this.form = {
              new_password: "",
              re_new_password: "",
              current_password: ""
            };
            this.$router.push({
              name: "account_detail",
              params: { uuid: Cookies.get("account_uuid") }
            });
          }
        })
        .catch(error => {
          this.error_messages = error.response.data;
        });
    },
    cancel() {}
  },
  mixins: [axiosMixin]
};
</script>

<style></style>
