<template>
  <div class="da">
    <div class="tou">
      <div class="di">
      <div class="tou-hui" @click="TuiA"><van-icon name="arrow-left" /></div>
      <div class="tou-text">热门文章</div>
    </div></div>
    <div class="gao">
      <iframe :src="url" class="iframe" frameborder="0" scrolling="5px"></iframe>
    </div>
    <div class="er"></div>
    <div class="bai"></div>
    <!-- <nav v-html="weng?.body"></nav> -->
    <div></div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      id: this.$route.params.id,
      weng: this.$route.params.name,
      url: this.$route.params.url,
      text: ""
    };
  },

  methods: {
    TuiA() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.da {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 75;
  background-color: #fff;
  .tou {
    width: 100%;
    height: 6vh;
    font-size: 20px;
    line-height: 6vh;
    position: absolute;
    top: 0;
    z-index: 72;
    background-color: #fff;
    .di {
      display: flex;

    }
    .tou-hui {
      margin-left: 15px;
      line-height: 6vh;
    }
    .tou-text {
      margin: 0 auto;
      font-size: 25px;
    font-weight: 600;
    }
  }
  .gao {
    width: 100%;
    height: 100%;
  }

  .iframe {
    position: absolute;
    z-index: 70;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
  }
  .er {
    position: absolute;
    z-index: 71;
    background-color: rgb(246,246,246);
    width: 6rem;;
    height: 53.5px;
    right: 0px;
    bottom: 0px;
  }

  .bai {
    position: absolute;
    top: 0px;
    z-index: 70;
    right: 0px;
    width: 20px;
    height: 100%;
    background-color: rgb(255, 255, 255);
  }
}
::v-deep .pull-right {
  width: 0px;
  height: 0px;
  background-color: #fff !important;
} 
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
</style>