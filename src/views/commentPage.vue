<template>
  <div class="commentPage">
    <div class="commentPage_header">
      <div class="commentPage_header_icon" @click="goBack">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-chevron-left"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </div>
      <div class="commentPage_header_title">商品评价</div>
    </div>
    <div class="commentPage_main"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "commentPage",
  data() {
    return {};
  },
  computed: {
    ...mapState("playPage", ["duration", "playTime", "playState"]), //向vuex的playPage模块中的state取值
  },

  // created() {
  //   this.sendBookMain(); //请求书本主数据
  // },

  activated() {
    //路由激活时触发
    console.log("激活组件钩子");
  },

  created() {
    //创建时
  },

  // beforeRouteLeave(to, from, next) {
  //   console.log("to", to);
  //   console.log("from", from);

  //   if (to.name != "HomePage") {
  //     next();
  //   } else {
  //     this.$store.commit("setNavIndex", 1); //调用store的commit方法 直接调用mutations对state的数据进行修改 将app的nav显示
  //     next();
  //   }
  // },
  methods: {
    ...mapMutations("playPage", ["PLAY", "set_list", "set_sylloge"]),
    ...mapMutations("shopMain", ["ShowShoppingPage"]),

    ...mapMutations(["ShowAppNavBar"]),

    goBack() {
      // console.log("点击了返回按钮");
      this.ShowShoppingPage(); //显示出商品详情页
      this.ShowAppNavBar(); //显示app底部导航栏
      this.$router.go(-1);
    },

    // linkPlay() {
    //   this.$router.push("/playPage");
    //   this.$store.commit("setNavIndex", -1); //调用store的commit方法 直接调用mutations对state的数据进行修改 将app的nav隐藏
    // },
  },

  mounted() {},

  components: {},
};
</script>

<style lang="scss" scoped>
.commentPage {
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  // background-color: aqua;

  .commentPage_header {
    width: 100%;
    height: 8vh;
    border-bottom: 0.5px solid rgba($color: #000000, $alpha: 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding-top: 1vh;

    .commentPage_header_title {
      font-size: 2.2vh;
      font-weight: 500;
    }

    .commentPage_header_icon {
      height: 100%;
      width: 10vw;
      position: absolute;
      top: 0;
      left: 3%;
      display: flex;
      color: #333;
      align-items: center;
      padding-top: 1vh;

      svg {
        width: 60%;
        height: 60%;
      }
    }
  }

  .commentPage_main {
    width: 100%;
    height: 92vh;
    overflow: auto;
    background-color: chartreuse;
  }
}
</style>
