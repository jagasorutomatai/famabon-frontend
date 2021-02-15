<template>
  <v-navigation-drawer app clipped>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle>
          家計簿管理アプリケーション<br />
          家計簿を記入する↓
        </v-list-item-subtitle>
        <v-list-item-action>
          <v-btn block color="info" depressed>
            <v-icon dark left>
              mdi-plus
            </v-icon>
            作成
          </v-btn>
        </v-list-item-action>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item link :to="{ name: 'book' }">
        <v-list-item-icon>
          <v-icon>mdi-book-open</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>家計簿</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.icon"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
          v-for="child in item.items"
          :key="child.title"
          link
          dense
          :to="{ name: child.to }"
        >
          <v-list-item-icon class="mr-1">
            <v-icon small :color="child.color">{{ child.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-list-item link :to="{ name: 'setting' }">
        <v-list-item-icon>
          <v-icon>mdi-book-open</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>設定</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      selectedItem: 0,
      items: [
        {
          icon: "mdi-chart-bar",
          active: true,
          items: [
            {
              title: "Breakfast & brunch",
              icon: "mdi-tag",
              color: "blue",
              to: "",
              value: ""
            },
            {
              title: "New American",
              icon: "mdi-tag",
              color: "blue",
              to: "",
              value: ""
            },
            {
              title: "Sushi",
              icon: "mdi-tag",
              color: "blue",
              to: "",
              value: ""
            }
          ],
          title: "統計",
          to: "",
          value: ""
        }
      ],
      right: null
    };
  }
};
</script>

<style></style>
