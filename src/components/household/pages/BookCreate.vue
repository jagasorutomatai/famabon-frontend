<template>
  <div>
    <v-form>
      <v-row justify="center">
        <v-col cols="8" sm="8" class="mt-5">
          <v-card outlined class="pa-3">
            <v-card-title>帳簿作成</v-card-title>
            <v-card-actions>
              <v-text-field
                name="title"
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
                name="description"
                v-model="form.description"
                outlined
                label="説明"
                :error="this.error_messages['description'] ? true : false"
                :error-messages="this.error_messages['description']"
              ></v-textarea>
            </v-card-actions>
            <v-card-actions>
              <v-text-field
                name="money"
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
                    name="date"
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
                name="tag"
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
                name="submit"
                @click="callApiPostBook()"
                class="mr-1"
                color="info"
                width="95px"
                depressed
              >
                作成
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
import Cookies from "js-cookie";
import axiosMixin from "@/mixins/axiosMixin";

export default {
  data: () => ({
    menu: false,
    form: {
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
    // 初期化処理
    initBookCreate() {
      this.callApiGetTagList();
    },
    // 帳簿作成キャンセル処理
    cancel() {
      this.error_messages = {};
      this.form = {
        title: "",
        money: undefined,
        tag_uuid: undefined,
        account_uuid: Cookies.get("account_uuid"),
        date: new Date().toISOString().substr(0, 10)
      };
      this.$router.go(-1);
    },
    // タグ全件取得するAPI呼び出し
    callApiGetTagList() {
      let url = process.env.VUE_APP_API_TAGS;
      return this.$http.get(url).then(response => {
        this.$store.dispatch("tag/dispatchTagList", {
          tag_list: response["data"]
        });
      });
    },
    // 帳簿を作成するAPI呼び出し
    callApiPostBook() {
      let url = process.env.VUE_APP_API_BOOKS;
      return this.$http
        .post(url, this.form)
        .then(response => {
          if (response.status == "201") {
            this.error_messages = {};
            this.$router.push({ name: "book" });
          }
        })
        .catch(error => {
          this.error_messages = error.response.data;
        });
    }
  },
  computed: {
    tag_list() {
      return this.$store.getters["tag/getTagList"];
    }
  },
  mounted() {
    this.initBookCreate();
  },
  mixins: [axiosMixin]
};
</script>

<style></style>
