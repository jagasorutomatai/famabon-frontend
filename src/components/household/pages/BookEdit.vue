<template>
  <div>
    <v-form>
      <v-row justify="center">
        <v-col cols="9" sm="9" class="mt-5">
          帳簿編集<br /><v-divider />
        </v-col>
        <v-col cols="9" sm="9" class="mt-5">
          <v-text-field
            v-model="form.title"
            label="タイトル"
            placeholder="Placeholder"
            outlined
            dense
          ></v-text-field>
          <v-textarea
            v-model="form.description"
            outlined
            label="説明"
            rows="7"
          ></v-textarea>

          <v-text-field
            v-model="form.money"
            label="金額"
            placeholder="Placeholder"
            outlined
            dense
          ></v-text-field>

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
              <v-btn text color="primary" @click="$refs.menu.save(form.date)">
                決定
              </v-btn>
            </v-date-picker>
          </v-menu>

          <v-select
            v-model="form.tag_uid"
            dense
            :items="tag_list"
            item-text="name"
            item-value="id"
            label="タグ"
            outlined
          ></v-select>
        </v-col>
        <v-col class="text-right" cols="10" sm="5">
          <v-btn
            @click="update()"
            class="mr-1"
            color="info"
            width="95px"
            depressed
          >
            更新
          </v-btn>
        </v-col>
        <v-col class="text-left" cols="10" sm="5">
          <v-btn
            @click="cancel()"
            class="ml-1"
            color="secondary"
            width="95px"
            depressed
          >
            キャンセル
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  data: () => ({
    menu: false,
    form: {
      id: "",
      title: "",
      description: "",
      money: 0,
      tag_uid: "",
      account_id: 1,
      date: ""
    }
  }),
  methods: {
    update() {
      this.$store
        .dispatch("book/updateBook", this.form)
        .then(response => {
          if (response.status == "200") {
            this.$router.push({ name: "book" });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    cancel() {
      let id = this.$route.params["id"];
      this.$router.push({ name: "book_detail", params: { id: id } });
    }
  },
  computed: {
    tag_list() {
      return this.$store.getters["tag/getTagList"];
    }
  },
  async mounted() {
    let id = this.$route.params["id"];
    await this.$store.dispatch("book/restApiGetBookDetail", { id: id });
    let book_detail = this.$store.getters["book/getBookDetail"];
    this.form = {
      id: book_detail.id,
      title: book_detail.title,
      description: book_detail.description,
      money: book_detail.money,
      tag_uid: book_detail.tag.id,
      account_id: book_detail.account,
      date: book_detail.date
    };
  }
};
</script>

<style></style>
