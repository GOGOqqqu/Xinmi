<template>
  <div class="dd">
    <button @click="TuiA">{{ this.$route.params.name }}</button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    TuiA() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped></style>
