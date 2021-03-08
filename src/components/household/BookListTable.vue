<template>
  <v-data-table
    :headers="headers"
    :items="book_list"
    :items-per-page="10"
    class="elevation-1"
    @click:row="openBookDetail"
  >
    <template v-slot:[`item.tag`]="{ item }">
      <v-chip
        v-if="item.tag"
        class="ma-2"
        :color="item.tag.color"
        text-color="white"
        small
      >
        <v-avatar left>
          <v-icon small>mdi-tag</v-icon>
        </v-avatar>
        {{ item.tag.name }}
      </v-chip>
    </template>
    <template v-slot:no-data>
      帳簿の情報が存在しないです
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    headers: [
      { text: "日付", value: "date" },
      { text: "項目名", value: "title" },
      { text: "タグ", value: "tag" },
      { text: "金額(円)", value: "money" }
    ]
  }),
  methods: {
    openBookDetail(item) {
      this.$router.push({ name: "book_detail", params: { uuid: item.uuid } });
    }
  },
  props: ["book_list"]
};
</script>

<style></style>
