<template>
  <div class="shopPageGuessYouLike">
    <div
      class="shopPageGuessYouLike_item"
      v-for="item in shopMessage.similar_products"
      :key="item.goods_id"
    >
      <div class="shopPageGuessYouLike_item_img">
        <img
          :src="`https://img01.yimishiji.com/v1/img/${item.image_default_id}.webp`"
        />
      </div>
      <div class="shopPageGuessYouLike_item_main">
        <div class="shop_name van-ellipsis">{{ item.name }}</div>
        <div class="shop_text van-ellipsis">{{ item.describe }}</div>
        <div class="shop_size">{{ item.unit }}</div>
        <div class="price" v-if="item.discount_price == item.price">
          {{ `￥${parseFloat(item.price)}` }}
        </div>
        <div class="sell_Price price" v-else>
          {{ `￥${parseFloat(item.discount_price)}`
          }}<span class="black">{{ `￥${parseFloat(item.price)}` }}</span>
        </div>
        <div class="button">+</div>
      </div>
    </div>
  </div>
</template>
.
<script>
// import homeBookList from "@/components/homePage/homeBook/homeBookList.vue";

import { mapState } from "vuex";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: "shopPageGuessYouLike",
  props: {
    // swipe: { type: Array, requited: true },
    data: Object,
  },

  data() {
    return {};
  },

  created() {},

  watch: {},

  mounted() {
    //数据挂载完毕后
  },

  computed: {
    ...mapState("shopMain", ["shopMessage"]), //向vuex的playPage模块中的state取值
    ...mapGetters("playPage", ["songDuration", "songNowTime"]),
  },

  methods: {
    ...mapMutations("shopMain", ["setShopMessage", "setShowShopMain"]),
  },

  components: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.shopPageGuessYouLike {
  width: 100%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0vh 2vw 4vh;

  .shopPageGuessYouLike_item {
    width: 47vw;
    background-color: #fff;
    margin-bottom: 1.6vh;
    border-radius: 8px;
    overflow: hidden;
    .shopPageGuessYouLike_item_img {
      width: 100%;
      aspect-ratio: 1/1; //保持宽高等比
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 90%;
        height: 90%;
        display: block;
        border-radius: 10%;
        overflow: hidden;
      }
    }

    .shopPageGuessYouLike_item_main {
      width: 100%;
      padding: 1vh 2vw;
      line-height: 2.4vh;
      position: relative;
      .shop_name {
        font-size: 1.6vh;
        font-weight: 600;
        color: #333;
      }

      .shop_text {
        font-size: 1.4vh;
        font-weight: 400;
        color: #666;
      }

      .shop_size {
        font-size: 1vh;
        color: #999;
        font-weight: 300;
      }

      .price {
        font-size: 2.4vh;
        color: #72b567;
        font-weight: bold;
        padding: 1vh 0;

        &.sell_Price {
          color: #fa5555;
          display: flex;
          align-items: center;

          .black {
            color: #666;
            font-size: 1.8vh;
            font-weight: 200;
            text-decoration: line-through;
          }
        }
      }

      .button {
        width: 18%;
        aspect-ratio: 1/1;
        border-radius: 999px;
        position: absolute;
        right: 5%;
        bottom: 10%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #557992;
        background-color: #e3f3ff;
        font-size: 7vw;
      }
    }
  }
}
</style>
