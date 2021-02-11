<template>
  <v-navigation-drawer app clipped>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          famabon
        </v-list-item-title>
        <v-list-item-subtitle>
          家計簿管理アプリケーション
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "家計簿", icon: "mdi-view-dashboard" },
        { title: "統計", icon: "mdi-image" },
        { title: "マイページ", icon: "mdi-image" },
        { title: "設定", icon: "mdi-image" },
        { title: "ヘルプ", icon: "mdi-help-box" }
      ],
      right: null
    };
  }
};
</script>

<style></style>
