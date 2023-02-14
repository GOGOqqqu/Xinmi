<template>
  <div class="shopPageComment" v-if="shopMessage.comments?.tags_list">
    <div class="shopPageComment_header">
      <div class="shopPageComment_header_commentNum">
        <div class="text">商品评论</div>
        <div class="num">
          {{ "(" + shopMessage?.comments?.comments_num + ")" }}
        </div>
      </div>
      <div class="shopPageComment_header_CompanionNum" @click="linkCommentPage">
        <div class="num">
          {{ shopMessage?.comments?.favorable_reception_num }}
        </div>
        <div class="text">位会员推荐</div>
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
    </div>
    <div class="comment_tags">
      <div
        class="comment_tag"
        v-for="(i, index) in shopMessage.comments.tags_list"
        :key="index"
      >
        {{ i.name + `(${i.num})` }}
      </div>
    </div>

    <div class="comment_swipe">
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide
          v-for="item in shopMessage.comments.rec_comments"
          :key="item.comment_id"
        >
          <shopPageCommentCard :data="item" />
        </swiper-slide>
        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
      </swiper>
    </div>
  </div>
</template>
.
<script>
import shopPageCommentCard from "@/components/shopPage/shopPageCommentCard.vue"; //引入评论卡片组件
import { Swiper, SwiperSlide } from "vue-awesome-swiper"; //引入轮播图组件
import "swiper/css/swiper.css"; //引入轮播图组件样式
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: "shopPageComment",
  props: {
    // swipe: { type: Array, requited: true },
  },

  data() {
    return {
      swiperOption: {
        slidesPerView: "auto",
        spaceBetween: 12,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
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
    ...mapState("shopMain", ["shopMessage"]), //向vuex的playPage模块中的state取值
    ...mapGetters("playPage", ["songDuration", "songNowTime"]),
  },

  methods: {
    ...mapMutations("shopMain", [
      "setShopMessage",
      "setShowShopMain",
      "HideShoppingPage",
    ]),
    ...mapMutations(["HideAppNavBar"]),

    linkCommentPage() {
      //跳转到评论区页面
      this.$router.push("/commentPage");

      console.log("跳转到评论区页面");
      this.HideAppNavBar(); //隐藏首页底部导航栏
      this.HideShoppingPage(); //隐藏商品详情页 让评论区显示出来
    },
  },

  components: {
    Swiper,
    SwiperSlide,
    shopPageCommentCard,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
// @import "./base.scss";
.shopPageComment {
  width: 100%;
  // height: 20vh;
  // background-color: aqua;
  padding: 1vh 2vw;

  .shopPageComment_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1vw;
    height: 4vh;
    .shopPageComment_header_commentNum {
      color: #1e384b;
      font-size: 1.8vh;
      font-weight: 600;
      height: 100%;
      display: flex;
      align-items: center;

      .num {
        font-weight: 400;
        display: flex;
        align-items: center;
        font-weight: 800;
      }
    }

    .shopPageComment_header_CompanionNum {
      color: #333;
      font-size: 1.2vh;
      font-weight: 400;
      height: 100%;
      display: flex;
      align-items: center;

      .num {
        color: #1e384b;
        font-weight: 600;
        font-size: 1.8vh;
        display: flex;
        align-items: center;
        margin-right: 1vw;
        letter-spacing: 0.5px;
      }

      svg {
        height: 50%;
        color: #666;
      }
    }
  }

  .comment_tags {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .comment_tag {
      font-size: 1.2vh;
      color: #1e384b;
      padding: 2vw 4vw;
      border-radius: 4vw;
      background: #ebf2f7;
      margin: 1vh 2vw;
    }
  }

  .comment_swipe {
    //轮播图外层盒子
    width: 100%;
    height: 14vh;
    margin: 2vh 0;
    padding: 0 2vw;

    .swiper-container {
      overflow: auto;
    }

    .swiper {
      //轮播图组件模块
      width: 100%;
      height: 100%;

      .swiper-slide {
        //每份轮播图
        width: 80%;
        height: 100%;
        // background-color: brown;
        border-radius: 6px;
        overflow: hidden;

        box-shadow: 0 0 16px 0.5px rgb(102 102 102 / 10%);
      }
    }
  }
}
</style>
