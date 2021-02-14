<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6">
        <v-toolbar flat>
          <v-toolbar-title>今月の収入</v-toolbar-title>
          <v-spacer></v-spacer>
          240000 円
        </v-toolbar>
      </v-col>
      <v-col cols="12" sm="6">
        <v-toolbar flat>
          <v-toolbar-title>今月の支出</v-toolbar-title>
          <v-spacer></v-spacer>
          124000 円
        </v-toolbar>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="9" sm="9" class="mt-3">
        家計簿検索<br /><v-divider />
      </v-col>
      <v-col cols="10" sm="4">
        <v-text-field
          v-model="form.title"
          dense
          label="項目名"
          outlined
        ></v-text-field>
        <v-select dense :items="items" label="タグ" outlined></v-select>
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
        <v-btn @click="search()" class="mr-1" color="info" width="95px">
          検索
        </v-btn>
      </v-col>
      <v-col class="text-left" cols="10" sm="5">
        <v-btn class="ml-1" color="secondary" width="95px">
          リセット
        </v-btn>
      </v-col>
    </v-row>
    <v-tabs v-model="tab">
      <v-tab>全件</v-tab>
      <v-tab>今月</v-tab>
      <v-tab>検索結果</v-tab>
    </v-tabs>
    <v-divider></v-divider>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-data-table
          :headers="headers"
          :items="bookListAll"
          :items-per-page="10"
          class="elevation-1"
        ></v-data-table>
      </v-tab-item>
      <v-tab-item>
        <v-data-table
          :headers="headers"
          :items="bookListThisMonth"
          :items-per-page="10"
          class="elevation-1"
        ></v-data-table>
      </v-tab-item>
      <v-tab-item>
        <v-data-table
          :headers="headers"
          :items="bookListSearched"
          :items-per-page="10"
          class="elevation-1"
        ></v-data-table>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  data: () => ({
    headers: [
      { text: "日付", value: "date" },
      { text: "項目名", value: "title" },
      { text: "タグ", value: "tag" },
      { text: "金額(円)", value: "money" }
    ],
    items: ["治療費", "家賃", "光熱費", "携帯料金"],
    menu1: false,
    menu2: false,
    tab: null,
    form: {
      title: "",
      date_before: "",
      date_after: ""
    }
  }),
  computed: {
    bookListAll() {
      return this.$store.getters["book/getBookListAll"];
    },
    bookListThisMonth() {
      return this.$store.getters["book/getBookListThisMonth"];
    },
    bookListSearched() {
      return this.$store.getters["book/getBookListSearched"];
    }
  },
  methods: {
    search() {
      console.log(this.form.title);
      this.$store.dispatch("book/restApiGetFilterBookList", this.form);
      this.tab = 2;
    }
  },
  created() {
    this.$store.dispatch("book/restApiGetBookListAll");
    this.$store.dispatch("book/restApiGetBookListThisMonth");
  }
};
</script>
