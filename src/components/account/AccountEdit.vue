<template>
  <div>
    <v-row justify="center">
      <v-col cols="5" sm="5" class="mt-5">
        <v-card outlined class="pa-3">
          <v-card-title>パスワード変更</v-card-title>
          <v-card-actions>
            <v-text-field
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
import { FamabonApi } from "@/api/api.js";
import Cookies from "js-cookie";

const api = new FamabonApi();

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
      api
        .changePassword(this.form)
        .then(response => {
          console.log(response);
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
  mounted() {
    api.setRequestHeader(Cookies.get("access"));
  }
};
</script>

<style></style>
