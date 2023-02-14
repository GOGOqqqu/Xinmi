<template>
  <div class="shopItem" @click="linkShopMain(shopId)">
    <div class="shopItem_main">
      <div class="shopItemImg">
        <img :src="imgSrc" />
      </div>
      <div class="shopItemMain">
        <div class="title van-ellipsis">{{ title }}</div>
        <div class="Main van-ellipsis">{{ Main }}</div>
        <div class="size">{{ size }}</div>
        <div class="price" v-if="isSell">{{ `￥${parseFloat(price)}` }}</div>
        <div class="sell_Price price" v-else>
          {{ `￥${parseFloat(sellPrice)}`
          }}<span class="black">{{ `￥${parseFloat(price)}` }}</span>
        </div>
        <div class="addButton" @click.stop="addGoodsButton(shopId)">+</div>
      </div>
    </div>
    <div class="shopItem_entry"></div>
  </div>
</template>

<script>
// import homeBookList from "@/components/homePage/homeBook/homeBookList.vue";

import { mapState } from "vuex";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: "shopItem",
  props: {
    // swipe: { type: Array, requited: true },
    img: String, //商品图片
    title: String, //商品名字
    Main: String, //商品描述
    size: String, //规格
    price: String, //原价
    sellPrice: String, //特价
    shopId: String, //商品id
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
  },

  methods: {
    ...mapMutations("shopMain", ["setShopMessage", "setShowShopMain"]),
    ...mapMutations("shopping", ["addGoods"]),

    linkShopMain(id) {
      if (id != this.shopMessage.goods_id) {
        //如果点击了非同一个商品 进行加载
        //跳转商品详情页
        this.setShopMessage({}); //请求前清空原有数据

        this.$axios({
          method: "get",
          url: `api/v3/products/${id}?longitude=113.270796&version=90&latitude=23.135312011187`,
        })
          .then(({ data }) => {
            console.log("data", data.results[0]);
            this.setShopMessage(data.results[0]);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      this.setShowShopMain(true); //让商品详情页显示出来
    },

    addGoodsButton(id) {
      this.$axios({
        method: "get",
        url: `api/v3/products/${id}?longitude=113.270796&version=90&latitude=23.135312011187`,
      })
        .then(({ data }) => {
          let goods = data.results[0];
          this.addGoods({
            name: goods.name,
            size: goods.unit,
            price: parseFloat(goods.price),
            sell_price: parseFloat(goods.discount_price),
            num: 1,
            checked: true,
            img: `https://img01.yimishiji.com/v1/img/${goods.image_default_id}.webp`,
            goods_id: goods.goods_id,
          }); //调用添加商品事件
          this.$toast.success("已添加购物篮");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  components: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.shopItem {
  //商品单元行
  width: 100%;
  // margin: 2vh 0;

  //不给高度 由内容撑开
  .shopItem_main {
    //无词条的主体部分

    width: 100%;
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5vh 0;
    box-sizing: content-box;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    .shopItemImg {
      height: 10vh;
      width: 10vh;
      border-radius: 20%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }

    .shopItemMain {
      height: 100%;
      width: calc(100% - 10vh);
      padding-left: 2vw;
      position: relative;
      line-height: 2vh;

      .title {
        font-size: 1.6vh;
        font-weight: 600;
        color: #333;
      }

      .Main {
        font-size: 1.5vh;
        font-weight: 400;
        color: #666;
      }

      .size {
        font-size: 1vh;
        font-weight: 200;
        color: #999;
      }

      .price {
        font-size: 1.6vh;
        color: #72b567;
        font-weight: bold;
        margin-top: 2vh;

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

      .addButton {
        width: 3vh;
        height: 3vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #e3f3ff;
        color: #5b7e97;
        border-radius: 50%;

        position: absolute;
        bottom: 0%;
        right: 0%;
      }
    }
  }
}
</style>
