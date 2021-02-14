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
