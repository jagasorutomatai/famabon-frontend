<template>
  <div>
    <v-form>
      <v-row justify="center">
        <v-col cols="9" sm="9" class="mt-5">
          帳簿作成<br /><v-divider />
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
        <v-col class="text-right" cols="10" sm="4">
          <v-btn
            @click="create()"
            class="mr-1"
            color="info"
            width="95px"
            depressed
          >
            作成
          </v-btn>
        </v-col>
        <v-col class="text-left" cols="10" sm="5">
          <v-btn
            @click="reset()"
            class="ml-1"
            color="secondary"
            width="95px"
            depressed
          >
            リセット
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
      title: "",
      description: "",
      money: 0,
      tag_uid: "",
      account_id: 1,
      date: ""
    }
  }),
  methods: {
    create() {
      this.$store
        .dispatch("book/createBook", this.form)
        .then(response => {
          if (response.status == "201") {
            this.$router.push({ name: "book" });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    reset() {
      this.form = {
        title: "",
        money: 0,
        tag_uid: "",
        account_id: 1,
        date: ""
      };
    }
  },
  computed: {
    tag_list() {
      return this.$store.getters["tag/getTagList"];
    }
  }
};
</script>

<style></style>
