<template>
  <div class="settingPage">
    <div class="settingPage_header">
      <div class="title">设置</div>
      <div class="goBack" @click="goBack">
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
    <div class="settingPage_main">
      <div class="title">账户</div>
      <div class="setting_item">
        个人中心
        <div class="right">
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
      <div class="setting_item">
        安全中心
        <div class="right">
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
      <div class="setting_item">
        收货地址
        <div class="right">
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
      <div class="title">更多</div>
      <div class="setting_item">允许定向推送</div>
      <div class="setting_item">
        常遇问题
        <div class="right">
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
      <div class="setting_item">
        给一米好评
        <div class="right">
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
      <div class="setting_item">
        用户协议与私隐政策
        <div class="right">
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
      <div class="setting_item">
        资质证照
        <div class="right">
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
      <div class="setting_item">
        自动下载最新安装包
        <div class="right text">仅wifi网络</div>
      </div>
      <div class="setting_item">
        版本号{{ "3.39.0" }}
        <div class="right text">检查版本更新</div>
      </div>
      <div class="button" @click="log_out">退出登录</div>
    </div>
  </div>
</template>

<script>
// import bookComment from "@/components/bookMain/bookComment.vue"; //引入评论组件

import { mapState } from "vuex";
import { mapMutations } from "vuex";
import { Dialog } from "vant";
export default {
  name: "settingPage",
  data() {
    return {};
  },

  created() {},

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
    ...mapMutations([
      "ShowAppNavBar",
      "HideAppNavBar",
      "setLogin",
      "setUserPhone",
    ]),
    ...mapMutations("shopping", ["showShoppingPage", "setTransitionName"]),

    goBack() {
      this.ShowAppNavBar(); //显示底部导航栏
      this.$router.go(-1);
    },

    log_out() {
      //退出登录
      console.log("即将退出登录");
      Dialog.confirm({
        message: "是否退出登录？",
        confirmButtonColor: "#026ffe",
      })
        .then(() => {
          // on confirm
          this.setLogin(false);
          this.setUserPhone(null);
          localStorage.YiMiUser = null;
          this.ShowAppNavBar(); //显示底部导航栏
          this.$router.push("/mePage");
        })
        .catch(() => {
          // on cancel
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
.settingPage {
  width: 100vw;
  height: 100vh;

  .settingPage_header {
    height: 8vh;
    width: 100%;
    border-bottom: 0.5px solid rgba($color: #000000, $alpha: 0.05);
    box-shadow: 0 0 30px 4px rgba($color: #000000, $alpha: 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: #fff;

    .title {
      font-size: 2vh;
      color: #333;
      font-weight: bold;
    }
    .goBack {
      height: 100%;
      width: 6vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      left: 0%;
      svg {
        width: 50%;
        height: 50%;
        color: #333;
      }
    }
  }

  .settingPage_main {
    height: 94vh;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #f5f8fa;

    .title {
      padding: 2.5vh 2vw;
      color: #9f9f9f;
      font-size: 1.8vh;
      font-weight: 200;
      width: 100%;
    }

    .setting_item {
      width: 100%;
      padding: 3vh;
      background-color: #fff;
      color: #333;
      font-weight: 500;
      border-bottom: 1px solid rgba($color: #000000, $alpha: 0.04);
      position: relative;
      font-size: 2vh;
      .right {
        position: absolute;
        height: 8vh;
        width: 8vh;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #999;
        top: 0%;
        right: 0%;
        svg {
          width: 30%;
          height: 30%;
        }

        &.text {
          color: #8eb6d4;
          width: auto;
          right: 3%;
        }
      }
    }

    .button {
      width: 100%;
      height: 6vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000;
      font-weight: 600;
      font-size: 1.8vh;
      letter-spacing: 0.5px;
      margin: 2vh 0 4vh;
      background-color: #fff;
    }
  }
}
</style>
