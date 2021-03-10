<template>
  <div>
    <v-row justify="center">
      <v-col cols="9" sm="9" class="mt-5">
        タグの設定<br /><v-divider />
      </v-col>
      <v-col cols="9" sm="9">
        <v-btn
          name="create"
          color="primary"
          depressed
          @click="openEditTagDialog('POST')"
        >
          タグの追加
        </v-btn>
      </v-col>
      <v-col cols="9" sm="9">
        <v-data-table :headers="headers" :items="tag_list" hide-default-footer>
          <template v-slot:[`item.color`]="{ item }">
            <v-chip :color="item.color" text-color="white" small>
              <v-avatar left>
                <v-icon small>mdi-tag</v-icon>
              </v-avatar>
              {{ item.name }}
            </v-chip>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              name="edit"
              small
              class="mr-2"
              @click="openEditTagDialog('PUT', item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon name="delete" small @click="openDeleteTagDialog(item)">
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            タグが存在しないです
          </template>
        </v-data-table>
        <!-- 作成+編集用のダイアログボックス -->
        <v-dialog
          v-model="dialog_edit"
          @click:outside="cancel()"
          max-width="500px"
        >
          <v-card outlined>
            <v-card-title>タグの作成/編集</v-card-title>
            <v-card-subtitle>
              タブの新規作成と既存のタブの編集ができます
            </v-card-subtitle>
            <v-text-field
              name="name"
              v-model="form.name"
              class="px-6"
              dense
              label="タグの名前"
              outlined
              :error="this.error_messages['name'] ? true : false"
              :error-messages="this.error_messages['name']"
            ></v-text-field>
            <v-select
              name="color"
              v-model="form.color"
              class="px-6"
              dense
              :items="color_list"
              label="タグの色"
              outlined
            ></v-select>
            <v-card-text class="text-center">
              <v-chip class="ma-2" :color="form.color" text-color="white" small>
                <v-avatar left>
                  <v-icon small>mdi-tag</v-icon>
                </v-avatar>
                {{ form.name }}
              </v-chip>
            </v-card-text>
            <v-card-actions>
              <v-btn
                name="submit_post"
                v-if="method == 'POST'"
                @click="callApiPostTag()"
                color="primary"
                depressed
              >
                OK
              </v-btn>
              <v-btn
                name="submit_put"
                v-if="method == 'PUT'"
                @click="callApiPutTag()"
                color="primary"
                depressed
              >
                OK
              </v-btn>
              <v-btn name="cancel" depressed @click="cancel()">
                キャンセル
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- 削除用のダイアログボックス -->
        <v-dialog
          v-model="dialog_delete"
          @click:outside="cancel()"
          max-width="500px"
        >
          <v-card>
            <v-card-title>タグの削除</v-card-title>
            <v-card-text>
              <span class="mr-5">削除するタグ</span>
              <strong class="red--text">{{ form.name }}</strong>
            </v-card-text>
            <v-card-actions>
              <v-btn
                name="submit_delete"
                @click="callApiDeleteTag()"
                color="primary"
                depressed
              >
                OK
              </v-btn>
              <v-btn name="cancel_delete" depressed @click="cancel()">
                キャンセル
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import axiosMixin from "@/mixins/axiosMixin";

const color_list = [
  "grey",
  "red",
  "pink",
  "purple",
  "blue",
  "green",
  "orange",
  "brown"
];
const headers = [
  { text: "タグの名前", value: "name" },
  { text: "タグの色", value: "color" },
  { text: "編集/削除", value: "actions" }
];
export default {
  data: () => ({
    headers: headers,
    color_list: color_list,
    form: {
      uuid: "",
      name: "",
      color: "grey",
      account_uuid: Cookies.get("account_uuid")
    },
    dialog_edit: false,
    dialog_delete: false,
    method: null,
    error_messages: {}
  }),
  methods: {
    initBookSetting() {
      this.callApiGetTagList();
    },
    openEditTagDialog(method, item = this.form) {
      this.method = method;
      this.form.uuid = item.uuid;
      this.form.name = item.name;
      this.form.color = item.color;
      this.dialog_edit = true;
    },
    openDeleteTagDialog(item) {
      this.form.uuid = item.uuid;
      this.form.name = item.name;
      this.dialog_delete = true;
    },
    cancel() {
      this.dialog_edit = false;
      this.dialog_delete = false;
      this.error_messages = {};
      this.resetForm();
    },
    resetForm() {
      this.form = {
        uuid: "",
        name: "",
        color: "grey",
        account_uuid: Cookies.get("account_uuid")
      };
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
    // タグ作成するAPI呼び出し
    callApiPostTag() {
      let url = process.env.VUE_APP_API_TAGS;
      return this.$http
        .post(url, this.form)
        .then(response => {
          if (response.status == "201") {
            this.callApiGetTagList();
            this.resetForm();
            this.error_messages = {};
            this.dialog_edit = false;
          }
        })
        .catch(error => {
          this.error_messages = error.response.data;
        });
    },
    // タグを更新するAPI呼び出し
    callApiPutTag() {
      let url = process.env.VUE_APP_API_TAGS + this.form.uuid + "/";
      return this.$http
        .put(url, this.form)
        .then(response => {
          if (response.status == "200") {
            this.callApiGetTagList();
            this.resetForm();
            this.error_messages = {};
            this.dialog_edit = false;
          }
        })
        .catch(error => {
          this.error_messages = error.response.data;
        });
    },
    // タグを削除するAPI呼び出し
    callApiDeleteTag() {
      let url = process.env.VUE_APP_API_TAGS + this.form.uuid + "/";
      return this.$http.delete(url).then(response => {
        if (response.status == "204") {
          this.callApiGetTagList();
          this.dialog_delete = false;
        }
      });
    }
  },
  computed: {
    tag_list() {
      return this.$store.getters["tag/getTagList"];
    }
  },
  mounted() {
    this.initBookSetting();
  },
  mixins: [axiosMixin]
};
</script>
