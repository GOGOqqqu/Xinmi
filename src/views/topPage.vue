<template>
  <div class="topPage">
    <div class="topPage_header">
      <img src="@/assets/top/bg.png" />

      <div class="backUp" @click="goBack">
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
    </div>

    <div class="topPage_main_sticky">
      <div class="title">
        <img src="@/assets/top/title.png" />
      </div>
      <div class="topPage_main">
        <van-tabs
          v-model="activeName"
          v-if="navList"
          animated
          background="rgba(255,255,255,0)"
          color="#e51818"
          :swipeable="true"
          title-active-color="#fff"
          title-inactive-color="#fefefe"
          swipe-threshold="4"
        >
          <van-tab
            v-for="i in navList"
            :key="i.cat_id"
            :title="i.cat_name"
            :name="i.cat_id"
            >{{ i.cat_name }}</van-tab
          >
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
// import bookComment from "@/components/bookMain/bookComment.vue"; //引入评论组件

import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "topPage",
  data() {
    return {
      activeName: "a",
      navList: [],
    };
  },

  created() {
    this.sendNav(); //
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
    ...mapMutations(["ShowAppNavBar"]),
    ...mapMutations("shopping", ["showShoppingPage", "setTransitionName"]),

    goBack() {
      // console.log("点击了返回按钮");
      this.setTransitionName("slide-right");
      this.$router.go(-1);
      this.ShowAppNavBar(); //隐藏底部导航栏
      this.showShoppingPage(); //隐藏购物篮页
    },

    sendNav() {
      this.$axios({
        method: "get",
        url: `/api/v2/categories/subclass?platform=ANDROID&system_version=23&aaid=6e978207e5218d5ba332cec7b1b55953&sign=12947A3A81E0BB060EB86A9E63288417&access_token=03e32273466e40edbee9e7111a559f1879f35a85&suppress_response_code=true&longitude=113.270796&parent_id=0&version=91&device_model=SM-G9550&latitude=23.135312011187&device_token=3a9d878bbe058d4cf6f6f3dfc689900f&channel=tencent`,
      })
        .then(({ data }) => {
          console.log("data", data.results);
          //device_token 可随便填写 但是不能没有
          this.navList = data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // linkPlay() {
    //   this.$router.push("/playPage");
    //   this.$store.commit("setNavIndex", -1); //调用store的commit方法 直接调用mutations对state的数据进行修改 将app的nav隐藏
    // },
  },
  computed: {
    ...mapState("playPage", ["duration", "playTime", "playState"]), //向vuex的playPage模块中的state取值
  },
  mounted() {},

  components: {},
};
</script>

<style lang="scss" scoped>
.topPage {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  .topPage_header {
    width: 100%;
    position: sticky;
    top: 0;
    left: 0;

    img {
      width: 100%;
      display: block;
      height: 20vh;
      object-fit: cover;
    }

    .backUp {
      position: absolute;
      top: 12%;
      left: 3%;
      width: 10vw;
      height: 10vw;
      border-radius: 999px;
      background-color: rgba(0, 0, 0, 0.1);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 60%;
        height: 60%;
      }
    }
  }

  .topPage_main_sticky {
    width: 100%;
    height: 90vh;
    position: sticky;
    left: 0;
    top: 10vh;

    .title {
      width: 100%;
      position: absolute;
      top: -6%;
      left: 30%;

      img {
        width: 40%;
        display: block;
      }
    }

    .topPage_main {
      width: 100%;
      height: 1000px;
      // background-color: chartreuse;
      overflow: auto;
    }
  }
}
</style>
