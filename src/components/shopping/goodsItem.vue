<template>
  <div class="goodsItem" @click.self="linkShopMain(shopId)">
    <van-dialog
      v-model="show_dialog"
      title="删除商品"
      width="84vw"
      message="您确定删除指定商品？"
      show-cancel-button
      confirmButtonColor="#325976"
      cancelButtonColor="#333"
      @confirm="dialog_confirm"
    >
    </van-dialog>
    <div class="checkbox" @click.stop="change">
      <van-checkbox :value="checked" checked-color="#496c85"></van-checkbox>
    </div>
    <div class="goods_img">
      <img :src="img" />
    </div>
    <div class="goods_main">
      <div class="goods_name">{{ title }}</div>
      <div class="goods_size">{{ size }}</div>
      <div class="price" v-if="isSell">{{ `￥${parseFloat(price)}` }}</div>
      <div class="sell_Price price" v-else>
        {{ `￥${parseFloat(sellPrice)}`
        }}<span class="black">{{ `￥${parseFloat(price)}` }}</span>
      </div>
    </div>
    <div class="Stepper">
      <van-stepper
        v-model="thisGoodsNum"
        disable-input
        min="1"
        input-width="10vw"
        button-size="3vh"
        @overlimit="overlimit"
        @plus="increase_this_goods"
        @minus="decrease_this_goods"
      />
    </div>
  </div>
</template>

<script>
// import homeBookList from "@/components/homePage/homeBook/homeBookList.vue";

import { mapState } from "vuex";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: "goodsItem",
  props: {
    // swipe: { type: Array, requited: true },
    img: String, //商品图片
    title: String, //商品名字
    Main: String, //商品描述
    size: String, //规格
    price: Number, //原价
    sellPrice: Number, //特价
    shopId: String, //商品id
    checked: Boolean, //是否被选择
    num: Number, //数量
  },

  data() {
    return {
      show_dialog: false, //是否显示弹窗 (确定删除弹窗)
    };
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

    change() {
      //选择商品
      // console.log("aaa");
      this.selectGoods(this.shopId);
    },

    overlimit() {
      //步进器的值向0变化时触发 弹出窗口确认是否删除商品
      console.log("是否删除该商品");
      this.show_dialog = true;
    },

    dialog_confirm() {
      //弹窗确认删除事件  删除该商品
      this.deleteGoods(this.shopId);
    },

    increase_this_goods() {
      //步进器增加事件
      // console.log("执行增加");

      this.Goods_Increase_And_Decrease({
        id: this.shopId,
        num: 1,
      });
    },

    decrease_this_goods() {
      //步进器减少事件
      // console.log("执行减少");
      this.Goods_Increase_And_Decrease({
        id: this.shopId,
        num: -1,
      });
    },
  },

  components: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.goodsItem {
  //商品单元行
  width: 100%;
  height: 12vh;
  margin-bottom: 2vh;
  background-color: #fff;
  // margin: 2vh 0;
  display: flex;
  align-items: center;
  border-radius: 2vw;
  position: relative;

  ::v-deep .van-dialog {
    .van-dialog__header {
      line-height: 40px;
      font-weight: bold;
      font-size: 18px;
    }
  }

  .checkbox {
    height: 100%;
    width: 8%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .goods_img {
    height: 100%;
    aspect-ratio: 1/1; //保持宽高等比
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 80%;
      height: 80%;
      display: block;
    }
  }

  .goods_main {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-evenly;
    padding: 0.5vh 0 0.5vh 2vw;
    .goods_name {
      font-size: 1.6vh;
      color: #333;
      font-weight: 600;
    }

    .goods_size {
      font-size: 1.2vh;
      color: #666;
      font-weight: 200;
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
  }

  .Stepper {
    position: absolute;
    right: 3%;
    bottom: 10%;
  }
}
</style>
