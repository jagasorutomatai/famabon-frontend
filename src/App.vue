<template>
  <v-app>
    <SideMenu />
    <Header />
    <v-main
      ><v-container fluid><router-view></router-view> </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from "./components/Footer";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";

export default {
  name: "App",

  components: {
    Footer,
    Header,
    SideMenu
  },

  data: () => ({
    //
  })
};
</script>
