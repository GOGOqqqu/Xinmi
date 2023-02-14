<template>
  <div class="shopPageFooter">
    <van-goods-action>
      <van-goods-action-icon
        icon="bag-o"
        text="购物篮"
        @click="onClickIcon"
        color="#385e7a"
        :info="goodsNum"
      />
      <van-goods-action-icon
        icon="contact"
        text="客服"
        @click="onClickIcon"
        color="#385e7a"
      />
      <van-goods-action-button
        type="danger"
        text="加入购物篮"
        @click="onClickButton"
        color="#325976"
      />
    </van-goods-action>
  </div>
</template>

<script>
// import homeBookList from "@/components/homePage/homeBook/homeBookList.vue";

import { mapState } from "vuex";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: "shopPageFooter",
  props: {
    // swipe: { type: Array, requited: true },
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
    ...mapState("shopping", ["goodsList"]), //向vuex的playPage模块中的state取值
    ...mapGetters("shopping", ["goodsNum"]),
    ...mapGetters("playPage", ["songDuration", "songNowTime"]),
  },

  methods: {
    ...mapMutations("shopMain", ["setShopMessage", "setShowShopMain"]),
    ...mapMutations("shopping", ["addGoods"]),

    onClickIcon() {
      console.log("点击了图标");
    },
    onClickButton() {
      //加入购物篮
      console.log("点击了按钮");
      this.addGoods({
        name: this.shopMessage.name,
        size: this.shopMessage.unit,
        price: parseFloat(this.shopMessage.price),
        sell_price: parseFloat(this.shopMessage.discount_price),
        num: 1,
        checked: true,
        img: `https://img01.yimishiji.com/v1/img/${this.shopMessage.image_default_id}.webp`,
        goods_id: this.shopMessage.goods_id,
      }); //调用添加商品事件
      this.$toast.success("已添加购物篮");
      console.log("this.goodsList", this.goodsList);
    },
  },

  components: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.shopPageFooter {
  width: 100%;
  height: 100%;

  .van-goods-action {
    padding: 0 2vw;
  }
}
</style>
