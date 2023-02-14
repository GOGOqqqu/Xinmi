<template>
  <div class="topItem" @click.self="linkShopMain(shopId)">
    <div class="topItem_img">
      <img :src="img" />
      <div class="logo">
        <img src="@/assets/shopping/rank_1.png" v-if="index == 0" />
        <img src="@/assets/shopping/rank_2.png" v-if="index == 1" />
        <img src="@/assets/shopping/rank_3.png" v-if="index == 2" />
        <img src="@/assets/shopping/rank_4.png" v-if="index > 2" />
        <div class="num">{{ index + 1 }}</div>
      </div>
    </div>
    <div class="topItem_main">
      <div class="topItem_main_title van-ellipsis">{{ title }}</div>
      <div class="price" v-if="isSell">{{ `￥${parseFloat(price)}` }}</div>
      <div class="sell_Price price" v-else>
        {{ `￥${parseFloat(sellPrice)}`
        }}<span class="black">{{ `￥${parseFloat(price)}` }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// import homeBookList from "@/components/homePage/homeBook/homeBookList.vue";

import { mapState } from "vuex";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: "topItem",
  props: {
    // swipe: { type: Array, requited: true },
    img: String, //商品图片
    title: String, //商品名字
    price: String, //原价
    sellPrice: String, //特价
    shopId: String, //商品id
    index: Number,
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

    isSell() {
      //商品是否折扣
      if (this.price == this.sellPrice) {
        return true;
      } else {
        return false;
      }
    },

    imgSrc() {
      return `https://img01.yimishiji.com/v1/img/${this.img}.webp`;
    },

    thisGoodsNum: {
      //组件不支持value值 只能使用v-model 这时候可以设置一个空的set 防止报警告
      get() {
        return this.num;
      },
      set() {},
    },
  },

  methods: {
    ...mapMutations("shopMain", ["setShopMessage", "setShowShopMain"]),
    ...mapMutations("shopping", [
      "selectGoods",
      "deleteGoods",
      "Goods_Increase_And_Decrease",
    ]),
  },

  components: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.topItem {
  //商品单元行
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  .topItem_img {
    height: 100%;
    aspect-ratio: 1/1; //保持宽高等比
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    img {
      height: 80%;
      width: 80%;
      display: block;
    }

    .logo {
      position: absolute;
      left: 2%;
      top: 1%;
      width: 25%;
      height: 25%;

      .num {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        color: #fff;
        position: absolute;
        top: 10%;
        left: 25%;
      }

      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }

  .topItem_main {
    width: 64%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;

    .topItem_main_title {
      font-size: 1vh;
      font-weight: 400;
      width: 100%;
    }

    .price {
      font-size: 1.6vh;
      color: #72b567;
      font-weight: bold;
      margin-top: 2vh;
      width: 100%;

      &.sell_Price {
        color: #fa5555;
        display: flex;
        align-items: center;

        .black {
          color: #666;
          font-size: 0.8vh;
          font-weight: 200;
          text-decoration: line-through;
        }
      }
    }
  }
}
</style>
