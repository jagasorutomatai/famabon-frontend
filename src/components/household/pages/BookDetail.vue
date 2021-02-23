<template>
  <div>
    <v-row justify="center">
      <v-col cols="9" sm="9" class="mt-5">
        <v-card outlined>
          <v-card-title>
            <span class="subtitle-1">{{ book_detail.title }}</span>
          </v-card-title>
          <v-card-text>
            {{ book_detail.description }}
          </v-card-text>
          <v-card-title>
            <span class="subtitle-1">タグ</span>
          </v-card-title>
          <v-card-text>
            <v-chip
              class="ma-2"
              :color="book_detail.tag.color"
              text-color="white"
              small
            >
              <v-avatar left>
                <v-icon small>mdi-tag</v-icon>
              </v-avatar>
              {{ book_detail.tag.name }}
            </v-chip>
          </v-card-text>
          <v-card-title>
            <span class="subtitle-1">金額</span>
          </v-card-title>
          <v-card-text>
            <span>{{ book_detail.money }} 円</span>
          </v-card-text>
          <v-card-title>
            <span class="subtitle-1">日付</span>
          </v-card-title>
          <v-card-text>
            <span>{{ book_detail.date }}</span>
          </v-card-text>
          <v-card-title>
            <span class="subtitle-1">登録日</span>
          </v-card-title>
          <v-card-text>
            <span>{{ book_detail.created_at }}</span>
          </v-card-text>
          <v-card-title>
            <span class="subtitle-1">更新日</span>
          </v-card-title>
          <v-card-text>
            <span>{{ book_detail.updated_at }}</span>
          </v-card-text>
          <v-card-actions class="pa-3">
            <v-btn
              @click="toEditBookPage()"
              class="mr-1"
              color="primary"
              depressed
              >編集</v-btn
            >
            <v-btn color="red" dark depressed @click="delete_dialog = true">
              削除
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="delete_dialog" width="500">
      <v-card>
        <v-card-title>以下の帳簿を削除してもよろしいでしょうか？</v-card-title>
        <v-card-text>
          <ul>
            <li>{{ this.book_detail.title }}</li>
          </ul>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="deleteBook()" color="primary" depressed>OK</v-btn>
          <v-btn depressed @click="cancel()">キャンセル</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    book_detail: {
      title: "",
      description: "",
      tag: { name: "", color: "" },
      money: 0,
      date: "",
      created_at: "",
      updated_at: ""
    },
    delete_dialog: false
  }),
  methods: {
    async initBookDetail() {
      let id = this.$route.params["id"];
      await this.$store.dispatch("book/restApiGetBookDetail", { id: id });
      this.book_detail = this.$store.getters["book/getBookDetail"];
    },
    toEditBookPage() {
      let id = this.$route.params["id"];
      this.$router.push({ name: "book_edit", params: { id: id } });
    },
    async deleteBook() {
      let id = this.$route.params["id"];
      await this.$store
        .dispatch("book/deleteBook", { id: id })
        .then(response => {
          if (response.status == "204") {
            this.$router.push({ name: "book" });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    cancel() {
      this.delete_dialog = false;
    }
  },
  watch: {
    $route() {
      this.initBookDetail();
    }
  },
  mounted() {
    this.initBookDetail();
  }
};
</script>

<style></style>
