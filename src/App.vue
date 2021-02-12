<template>
  <v-app>
    <SideMenu v-if="is_logged_in" />
    <Header />
    <v-main>
      <v-container class="pa-0" fluid style="height: 100%;">
        <router-view v-if="is_logged_in" />
        <Login v-else />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from "./components/Footer";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import Login from "./views/Login";

export default {
  name: "App",

  components: {
    Footer,
    Login,
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
