<template>
  <div>
    <router-view class="mt-5" />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("book/restApiGetBookListAll");
    this.$store.dispatch("book/restApiGetBookListThisMonth");
    this.$store.dispatch("tag/restApiGetTagList");
  }
};
</script>
