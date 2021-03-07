<template>
  <div>
    <v-row justify="center">
      <v-col cols="9" sm="9" class="mt-5">
        <v-card outlined class="pa-3">
          <v-card-title>
            <span class="subtitle-1">ユーザー名</span>
          </v-card-title>
          <v-card-text>
            {{ account.username }}
          </v-card-text>
          <v-card-title>
            <span class="subtitle-1">メールアドレス</span>
          </v-card-title>
          <v-card-text>
            {{ account.email }}
          </v-card-text>
          <v-card-title>
            <span class="subtitle-1">パスワード</span>
          </v-card-title>
          <v-card-text>
            **************
          </v-card-text>
          <v-card-actions class="pa-3">
            <v-btn
              @click="toAccountEditPage()"
              class="mr-1"
              color="primary"
              depressed
              >パスワード変更</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axiosMixin from "@/mixins/axiosMixin";

export default {
  computed: {
    account() {
      return this.$store.getters["account/getAccount"];
    }
  },
  methods: {
    initAccountDetail() {
      this.$http.get("/account/auth/users/me/").then(response => {
        this.$store.dispatch("account/dispatchAccount", {
          account: response.data
        });
      });
    },
    toAccountEditPage() {
      this.$router.push({ name: "account_edit" });
    }
  },
  mounted() {
    this.initAccountDetail();
  },
  mixins: [axiosMixin]
};
</script>

<style></style>
