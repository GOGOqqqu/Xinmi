<template>
  <div class="shopPageCommentCard" @click="linkCommentPage">
    <div class="comment_text van-multi-ellipsis--l2">{{ data.comment }}</div>
    <div class="comment_footer">
      <div class="user_member">
        <img src="@/assets/shopMain/user.png" />
      </div>
      <div class="user_name">{{ data.author }}</div>
      <div class="evaluate">
        <div class="icon">
          <img src="@/assets/shopMain/like.png" />
        </div>
        <div class="text">很赞</div>
      </div>
    </div>
    <div class="shopPageCommentCard_bottom_icon">
      <img src="@/assets/shopMain/icon.png" />
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
  name: "shopPageCommentCard",
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
    ...mapMutations(["HideAppNavBar"]),
    linkCommentPage() {
      //跳转到评论区页面

      console.log("跳转到评论区页面");
      this.$router.push("/commentPage");
      this.HideAppNavBar();
    },
  },

  components: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.shopPageCommentCard {
  width: 100%;
  height: 100%;
  // background-color: aqua;
  position: relative;

  .comment_text {
    width: 100%;
    padding: 5% 4vw 0;
    line-height: 3vh;
    font-size: 1.6vh;
    letter-spacing: 1px;
    font-weight: 400;
  }

  .comment_footer {
    padding-left: 5%;
    height: 40%;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0%;
    left: 0;

    .user_member {
      height: 50%;
      aspect-ratio: 1/1; //保持宽高等比
      border-radius: 999px;
      overflow: hidden;
      margin-right: 3vw;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }

    .user_name {
      color: #333;
      font-size: 1.6vh;
      margin-right: 3vw;
    }

    .evaluate {
      display: flex;
      align-items: center;
      height: 100%;
      .icon {
        height: 50%;
        aspect-ratio: 1/1; //保持宽高等比
        border-radius: 999px;
        overflow: hidden;
        margin-right: 2vw;

        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }

      .text {
        font-size: 1.6vh;
        color: #72ba2b;
        font-weight: 200;
      }
    }
  }

  .shopPageCommentCard_bottom_icon {
    height: 50%;
    aspect-ratio: 1/1; //保持宽高等比
    position: absolute;
    right: -2%;
    bottom: -2%;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
</style>
