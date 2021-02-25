<template>
  <div>
    <v-form>
      <v-row justify="center">
        <v-col cols="8" sm="8" class="mt-5">
          <v-card outlined class="pa-3">
            <v-card-title>帳簿編集</v-card-title>
            <v-card-actions>
              <v-text-field
                v-model="form.title"
                label="タイトル"
                placeholder="Placeholder"
                outlined
                dense
                :error="this.error_messages['title'] ? true : false"
                :error-messages="this.error_messages['title']"
              ></v-text-field>
            </v-card-actions>
            <v-card-actions>
              <v-textarea
                v-model="form.description"
                outlined
                label="説明"
                :error="this.error_messages['description'] ? true : false"
                :error-messages="this.error_messages['description']"
              ></v-textarea>
            </v-card-actions>
            <v-card-actions>
              <v-text-field
                v-model="form.money"
                label="金額"
                placeholder="Placeholder"
                outlined
                dense
                :error="this.error_messages['money'] ? true : false"
                :error-messages="this.error_messages['money']"
              ></v-text-field>
            </v-card-actions>
            <v-card-actions>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="form.date_after"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    label="日付"
                    dense
                    outlined
                    v-model="form.date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="form.date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    キャンセル
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(form.date)"
                  >
                    決定
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-card-actions>
            <v-card-actions>
              <v-select
                v-model="form.tag_uuid"
                dense
                :items="tag_list"
                item-text="name"
                item-value="uuid"
                label="タグ"
                outlined
                :error="this.error_messages['tag_uuid'] ? true : false"
                :error-messages="this.error_messages['tag_uuid']"
              ></v-select>
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
    </v-form>
  </div>
</template>

<script>
import { FamabonApi } from "@/api/api.js";
import Cookies from "js-cookie";

const api = new FamabonApi();

export default {
  data: () => ({
    menu: false,
    form: {
      uuid: "",
      title: "",
      description: "",
      money: undefined,
      tag_uuid: undefined,
      account_uuid: Cookies.get("account_uuid"),
      date: new Date().toISOString().substr(0, 10)
    },
    error_messages: {}
  }),
  methods: {
    async initBookEdit() {
      api.setRequestHeader(Cookies.get("access"));

      // 更新用の帳簿データを取得
      let uuid = this.$route.params["uuid"];
      await api.getBookDetail({ uuid: uuid }).then(response => {
        this.$store.dispatch("book/dispatchBookDetail", {
          book_detail: response["data"]
        });
        this.book_detail = this.$store.getters["book/getBookDetail"];
      });

      let book_detail = this.$store.getters["book/getBookDetail"];
      this.form = {
        uuid: book_detail.uuid,
        title: book_detail.title,
        description: book_detail.description,
        money: book_detail.money,
        tag_uuid: book_detail.tag.uuid,
        account_uuid: book_detail.account,
        date: book_detail.date
      };

      // セレクタ用のタグデータを取得
      api.getTagList().then(response => {
        this.$store.dispatch("tag/dispatchTagList", {
          tag_list: response["data"]
        });
      });
    },
    update() {
      console.log(this.form);
      api
        .updateBook(this.form)
        .then(response => {
          if (response.status == "200") {
            this.error_messages = {};
            this.$router.push({ name: "book" });
          }
        })
        .catch(error => {
          this.error_messages = error.response.data;
        });
    },
    cancel() {
      this.error_messages = {};
      let uuid = this.$route.params["uuid"];
      this.$router.push({ name: "book_detail", params: { uuid: uuid } });
    }
  },
  computed: {
    tag_list() {
      return this.$store.getters["tag/getTagList"];
    }
  },
  mounted() {
    this.initBookEdit();
  }
};
</script>

<style></style>
