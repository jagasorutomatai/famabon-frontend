<template>
  <v-row justify="center">
    <v-col cols="9" sm="9" class="mt-5">
      家計簿を検索<br /><v-divider />
    </v-col>
    <v-col cols="10" sm="4">
      <v-text-field
        name="title"
        v-model="form.title"
        dense
        label="項目名"
        outlined
      ></v-text-field>
      <v-select
        name="tag"
        v-model="form.tag"
        dense
        :items="tag_list"
        label="タグ"
        outlined
      ></v-select>
    </v-col>
    <v-col cols="10" sm="5">
      <v-menu
        ref="menu1"
        v-model="menu1"
        :close-on-content-click="false"
        :return-value.sync="form.date_after"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            name="date_after"
            label="検索開始年月"
            dense
            outlined
            v-model="form.date_after"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="form.date_after" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu1 = false">
            キャンセル
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu1.save(form.date_after)"
          >
            決定
          </v-btn>
        </v-date-picker>
      </v-menu>
      <v-menu
        ref="menu2"
        v-model="menu2"
        :close-on-content-click="false"
        :return-value.sync="form.date_before"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            name="date_before"
            label="検索終了年月"
            dense
            outlined
            v-model="form.date_before"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="form.date_before" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu2 = false">
            キャンセル
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu2.save(form.date_before)"
          >
            決定
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
    <v-col class="text-right" cols="10" sm="4">
      <v-btn
        name="submit"
        @click="callApiGetFilterBook()"
        class="mr-1"
        color="info"
        width="95px"
      >
        検索
      </v-btn>
    </v-col>
    <v-col class="text-left" cols="10" sm="5">
      <v-btn
        name="reset"
        @click="reset()"
        class="ml-1"
        color="secondary"
        width="95px"
      >
        リセット
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import axiosMixin from "@/mixins/axiosMixin";

export default {
  data: () => ({
    menu1: false,
    menu2: false,
    form: {
      title: "",
      tag: "",
      date_before: "",
      date_after: ""
    }
  }),
  computed: {
    tag_list() {
      let tag_list = [];
      for (let tag of this.$store.getters["tag/getTagList"]) {
        tag_list.push(tag.name);
      }
      return tag_list;
    }
  },
  methods: {
    initBookSearch() {
      this.callApiGetTagList();
    },
    reset() {
      this.$store.commit("book/changeSearchedBookList", {
        book_list_searched: []
      });
      this.form = { title: "", tag: "", date_before: "", date_after: "" };
    },
    // タグ全件取得するAPI呼び出し
    callApiGetTagList() {
      return this.$http.get("/household/tags/").then(response => {
        this.$store.dispatch("tag/dispatchTagList", {
          tag_list: response["data"]
        });
      });
    },
    // 帳簿をフィルターして取得するAPI呼び出し
    callApiGetFilterBook() {
      let title = "title=" + this.form.title;
      let date_after = "date_after=" + this.form.date_after;
      let date_before = "date_before=" + this.form.date_before;
      let tag = "tag=" + this.form.tag;
      let url =
        "/household/books/?" +
        title +
        "&" +
        date_after +
        "&" +
        date_before +
        "&" +
        tag;
      this.$http.get(url).then(response => {
        this.$store.dispatch("book/dispatchSearchedBookList", {
          searched_book_list: response["data"]
        });
      });
    }
  },
  mounted() {
    this.initBookSearch();
  },
  mixins: [axiosMixin]
};
</script>
