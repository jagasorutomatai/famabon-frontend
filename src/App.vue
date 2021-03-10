<template>
  <v-app v-if="is_logged_in">
    <SideMenu />
    <Header />
    <v-main>
      <v-container class="pa-0" fluid style="height: 100%;">
        <router-view />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
  <v-app v-else>
    <Header />
    <v-main>
      <v-container class="pa-0" fluid style="height: 100%;">
        <router-view />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import SideMenu from "./components/layout/SideMenu";

export default {
  name: "App",

  components: {
    Footer,
    Header,
    SideMenu
  },

  computed: {
    is_logged_in() {
      return this.$store.getters["auth/getIsLoggedIn"];
    }
  }
};
</script>
