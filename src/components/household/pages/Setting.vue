<template>
  <div>
    <v-row justify="center">
      <v-col cols="9" sm="9" class="mt-5">
        タグの設定<br /><v-divider />
      </v-col>
      <v-col cols="9" sm="9">
        <v-btn color="primary" depressed @click="openEditTagDialog('POST')">
          タグの追加
        </v-btn>
      </v-col>
      <v-col cols="9" sm="9">
        <v-data-table :headers="headers" :items="tagList" hide-default-footer>
          <template v-slot:[`item.color`]="{ item }">
            <v-chip :color="item.color" text-color="white" small>
              <v-avatar left>
                <v-icon small>mdi-tag</v-icon>
              </v-avatar>
              {{ item.name }}
            </v-chip>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="openEditTagDialog('PUT', item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="openDeleteTagDialog(item)">
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary">
              Reset
            </v-btn>
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
              v-model="form.name"
              class="px-6"
              dense
              label="タグの名前"
              outlined
            ></v-text-field>
            <v-select
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
                v-if="method == 'POST'"
                @click="createTag()"
                color="primary"
                depressed
              >
                OK
              </v-btn>
              <v-btn
                v-if="method == 'PUT'"
                @click="updateTag()"
                color="primary"
                depressed
              >
                OK
              </v-btn>
              <v-btn depressed @click="cancel()">キャンセル</v-btn>
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
              <v-btn @click="deleteTag()" color="primary" depressed>OK</v-btn>
              <v-btn depressed @click="cancel()">キャンセル</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    headers: [
      { text: "タグの名前", value: "name" },
      { text: "タグの色", value: "color" },
      { text: "編集/削除", value: "actions" }
    ],
    color_list: [
      "grey",
      "red",
      "pink",
      "purple",
      "blue",
      "green",
      "orange",
      "brown"
    ],
    form: {
      id: "",
      name: "",
      color: "grey"
    },
    tab: null,
    dialog_edit: false,
    dialog_delete: false,
    method: null
  }),
  methods: {
    openEditTagDialog(method, item = this.form) {
      this.method = method;
      this.form.id = item.id;
      this.form.name = item.name;
      this.form.color = item.color;
      this.dialog_edit = true;
    },
    openDeleteTagDialog(item) {
      this.form.id = item.id;
      this.form.name = item.name;
      this.dialog_delete = true;
    },
    cancel() {
      this.dialog_edit = false;
      this.dialog_delete = false;
      this.form = { id: "", name: "", color: "grey" };
    },
    createTag() {
      this.$store
        .dispatch("tag/createTag", this.form)
        .then(response => {
          if (response.status == "201") {
            this.$store.dispatch("tag/restApiGetTagList");
            this.form = { name: "", color: "grey" };
            this.dialog_edit = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateTag() {
      this.$store
        .dispatch("tag/updateTag", this.form)
        .then(response => {
          if (response.status == "200") {
            this.$store.dispatch("tag/restApiGetTagList");
            this.form = { name: "", color: "grey" };
            this.dialog_edit = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteTag() {
      this.$store
        .dispatch("tag/deleteTag", this.form)
        .then(response => {
          if (response.status == "204") {
            this.$store.dispatch("tag/restApiGetTagList");
            this.form = { name: "", color: "grey" };
            this.dialog_delete = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    tagList() {
      return this.$store.getters["tag/getTagList"];
    }
  }
};
</script>

<style></style>
