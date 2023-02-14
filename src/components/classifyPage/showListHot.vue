<template>
  <div class="showListHot">
    <div
      class="headerImg"
      v-if="isLoad && this.hot.cms_rows[0].elements[0].value"
    >
      <img :src="imgSrc" />
    </div>
    <div class="showListMain" v-if="isLoad">
      <van-tabs
        v-model="active"
        background="#fefefe"
        color="transparent"
        animated
        swipeable
        title-active-color="#000"
        title-inactive-color="#666"
      >
        <van-tab
          v-for="item in list"
          :key="item.attrs.title"
          :title="item.attrs.title"
        >
          <div class="list_classifyPage">
            <shopItem
              v-for="i in item.products"
              :key="i.goods_id"
              :img="i.image_default_id"
              :title="i.name"
              :Main="i.describe"
              :size="i.unit"
              :price="i.price"
              :sellPrice="i.discount_price"
              :shopId="i.goods_id"
            />
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import shopItem from "@/components/shopItem.vue";

import { mapState } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "showListHot",
  props: {
    // swipe: { type: Array, requited: true },
    hot: Object,
  },

  data() {
    return {
      isLoad: false,
      active: 0,
    };
  },

  created() {},

  watch: {
    hot() {
      //监听父组件是否请求完成
      console.log("this.hot", this.hot.cms_rows[0].elements);
      this.isLoad = true;
    },
  },

  mounted() {
    //数据挂载完毕后
  },

  computed: {
    ...mapState("playPage", ["duration", "playTime", "playState"]), //向vuex的playPage模块中的state取值
    ...mapGetters("playPage", ["songDuration", "songNowTime"]),

    imgSrc() {
      return `https://img01.yimishiji.com/v1/img/${this.hot.cms_rows[0].elements[0].value}.webp`; //
      //hot.cms_rows中 如果存在两项 是存在顶部广告图的情况 此时[0]为顶部图片信息 [1]为商品信息
      //hot.cms_rows中 只存在一项时 不存在顶部广告图 此时[0]为商品信息
    },

    list() {
      return this.hot.cms_rows.length == 1
        ? this.hot.cms_rows[0].elements
        : this.hot.cms_rows[1].elements;
    },
  },

  methods: {},

  components: {
    shopItem,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss">
.showListHot {
  width: 100%;
  height: 100%;

  // background-color: aqua;
  padding: 0 2vw;

  .headerImg {
    background-color: transparent;
    width: 100%;
    height: 20vh;

    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }

  .showListMain {
    .van-tabs__wrap {
      // width: 75%;
      height: 4vh;

      .van-tab {
        border-radius: 1vh;
        font-size: 1vh;
      }

      .van-tab--active {
        background-color: #e8f0f6;
      }
    }
  }

  .list_classifyPage {
    width: 100%;
  }
}
</style>
