<template>
  <div class="shoppingGuessYouLike">
    <div class="shoppingGuessYouLike_item top">
      <div class="top_header" @click="linkTopPage">
        <div class="top_header_title">
          七天热卖榜单
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </div>
        <div class="top_header_icon">
          <img src="@/assets/shopping/hot.png" />
        </div>
      </div>

      <div class="top_main_swiper">
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="(i, index) in topSellingGoods" :key="i.goods_id"
            ><div class="swiper_item">
              <topItem
                :img="`https://img01.yimishiji.com/v1/img/${i.image_default_id}.webp`"
                :title="i.name"
                :price="i.price"
                :sellPrice="i.discount_price"
                :shopId="i.goods_id"
                :index="index"
              /></div
          ></swiper-slide>
        </swiper>
      </div>
    </div>
    <div
      class="shoppingGuessYouLike_item"
      v-for="item in GuessYouLike_goods"
      :key="item.goods_id"
    >
      <div class="shoppingGuessYouLike_item_img">
        <div class="img">
          <img
            :src="`https://img01.yimishiji.com/v1/img/${item.image_default_id}.webp`"
          />
        </div>
      </div>
      <div class="shoppingGuessYouLike_item_main">
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
import topItem from "@/components/shopping/topItem.vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper"; //引入awesome轮播图
import "swiper/css/swiper.css";
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: "shoppingGuessYouLike",
  props: {
    // swipe: { type: Array, requited: true },
    data: Object,
  },

  data() {
    return {
      swiperOption: {
        direction: "vertical", //轮播方向
        slidesPerView: 3, //显示的item数量
        spaceBetween: 8, //每个item之间的缝隙
        loop: true, //是否循环
        slidesPerGroup: 3, //每次轮播多少个item
        autoplay: {
          //自动轮播
          delay: 2000, //延时
          disableOnInteraction: false, //是否禁止互动
        },
        pagination: {
          //配置
          el: ".swiper-pagination",
          clickable: true, //是否可被点击
        },
      },
    };
  },

  created() {},

  watch: {},

  mounted() {
    //数据挂载完毕后
  },

  computed: {
    ...mapState("shopping", ["GuessYouLike_goods", "topSellingGoods"]), //向vuex的playPage模块中的state取值
    ...mapGetters("playPage", ["songDuration", "songNowTime"]),
  },

  methods: {
    ...mapMutations("shopMain", ["setShopMessage", "setShowShopMain"]),
    ...mapMutations("shopping", ["hideShoppingPage", "setTransitionName"]),
    ...mapMutations(["HideAppNavBar"]),

    linkTopPage() {
      console.log("跳转到排行榜页");
      this.setTransitionName("slide-left");
      this.HideAppNavBar(); //隐藏底部导航栏
      this.hideShoppingPage(); //隐藏购物篮页
      this.$router.push("/shoppingPage/topPage");
    },
  },

  components: {
    Swiper,
    SwiperSlide,
    topItem,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.shoppingGuessYouLike {
  width: 100%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 2vh 2vw 0vh;

  .shoppingGuessYouLike_item {
    width: 47vw;
    background-color: #fff;
    margin-bottom: 1.6vh;
    border-radius: 8px;
    overflow: hidden;

    &.top {
      background-image: linear-gradient(344deg, #ffc487 0%, #ffe7d1 99%);
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;

      .top_header {
        height: 6vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 2vw;
        .top_header_title {
          font-size: 1.4vh;
          font-weight: bold;
          color: #ea7000;
          display: flex;
          align-items: center;
          svg {
            height: 1.6vh;
            width: 1.6vh;
            margin-left: 0.8vw;
          }
        }

        .top_header_icon {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            height: 60%;
            display: block;
          }
        }
      }

      .top_main_swiper {
        width: 100%;
        height: 24vh;
        // background: #fa5555;

        overflow: hidden;

        .swiper-container {
          width: 100%;
          height: 100%;

          .swiper_item {
            width: 100%;
            height: 100%;
            padding: 0 1.2vw;
          }
        }
      }
    }
    .shoppingGuessYouLike_item_img {
      width: 100%;
      aspect-ratio: 1/1; //保持宽高等比
      display: flex;
      align-items: center;
      justify-content: center;
      .img {
        width: 90%;
        height: 90%;
        display: block;
        border-radius: 10%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        img {
          height: 100%;
        }
      }
    }

    .shoppingGuessYouLike_item_main {
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
