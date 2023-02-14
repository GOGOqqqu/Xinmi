<template>
  <div class="loginPage">
    <div class="loginPage_header">
      <div class="loginPage_header_title" v-if="login_title == 0">
        验证码登录
      </div>
      <div class="loginPage_header_title" v-else>密码登录</div>

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
    <div class="loginPage_Main">
      <div class="loginPage_Main_user">
        <input
          class="input_user"
          type="text"
          placeholder="输入手机号"
          v-model="phone"
        />
        <div
          class="input_user_button"
          v-if="login_title == 0"
          @click="sendCode"
        >
          {{ isSendCode == true ? `已发送(${Countdown}秒)` : "发送验证码" }}
        </div>
      </div>
      <div class="loginPage_Main_password">
        <input
          class="input_password"
          :type="isShowPassword == true ? 'text' : 'password'"
          placeholder="输入密码(6-20字英数混合)"
          v-if="login_title == 1"
          v-model="password"
        />
        <input
          class="input_verification_code"
          type="text"
          placeholder="输入验证码"
          v-else
          v-model="code"
        />
      </div>
      <div class="loginPage_Main_button">
        <div class="left_button text" v-if="login_title == 0">
          未注册手机号验证后即完成注册
        </div>
        <div class="left_button btn" v-else>忘记密码</div>

        <div class="change_button" @click="change">
          {{ login_title == 0 ? "密码登录" : "验证码登录" }}
        </div>
      </div>
      <div
        class="loginPage_Main_login"
        :class="{ canLogin: isCanLogin }"
        @click="login"
      >
        登录
      </div>
      <div class="loginPage_Main_loginType">
        <div class="title">
          <van-divider>其他登陆方式</van-divider>
        </div>
        <div class="main">
          <div class="weiXin">
            <div class="icon" @click="linkWeiXin">
              <img src="@/assets/login/icon.png" alt="" />
            </div>
            <div class="text">微信</div>
          </div>
        </div>
      </div>
      <div class="login_agreement">
        <div class="checkbox">
          <van-checkbox
            v-model="checked"
            checked-color="#0aa3e8"
          ></van-checkbox>
        </div>
        <div class="text">登录即代表您同意《用户协议》和《隐私协议》</div>
      </div>
    </div>
  </div>
</template>

<script>
// import bookComment from "@/components/bookMain/bookComment.vue"; //引入评论组件

import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "loginPage",
  data() {
    return {
      login_title: "0",
      checked: false, //是否已勾选服务协议
      isShowPassword: false,
      password: null,
      code: null,
      phone: null,
      isSendCode: false, //是否已发送验证码
      Countdown: 120, //倒计时
      timer: null, //定时器
      isCanLogin: false, //是否可以登录
    };
  },

  watch: {
    code(n, o) {
      if (n?.length > 6) {
        //当验证码的长度超过六位时 限制在六位
        this.code = o;
      }
    },
    phone(n, o) {
      if (n?.length > 11) {
        //当手机号的长度超过十一位时 限制在十一位
        this.phone = o;
      }

      if (
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
          this.phone
        ) &&
        this.login_title == "1"
      ) {
        //当处于密码登录 非验证码登录时 如果已输入密码,且手机符合格式 则允许登录
        this.isCanLogin = true;
      }
    },

    password(n) {
      if (
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
          this.phone
        ) &&
        this.login_title == "1" &&
        n
      ) {
        //当处于密码登录 非验证码登录时 如果已输入密码,且手机符合格式 则允许登录
        this.isCanLogin = true;
      }
    },
  },

  created() {},

  destroyed() {
    //失活周期
    this.password = null;
    this.code = null;
    this.phone = null;
  },
  methods: {
    ...mapMutations([
      "ShowAppNavBar",
      "setLogin",
      "ShowAppNavBar",
      "setUserPhone",
    ]),

    ...mapMutations("shopping", ["showShoppingPage", "setTransitionName"]),

    goBack() {
      //返回上一级
      this.$router.push("/");

      this.ShowAppNavBar(); //显示底部导航栏
    },

    change() {
      //切换登录方式
      this.phone = null;
      if (this.login_title) {
        this.login_title = 0;
        this.password = null;
        this.isSendCode = false;
        this.isCanLogin = false;
      } else {
        this.login_title = 1;
        this.code = null;
        this.isCanLogin = false;
      }
    },

    sendCode() {
      //获取验证码
      console.log("发送验证码");
      if (!this.phone) {
        this.$toast.fail("请输入手机号");
      } else if (
        !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
          this.phone
        )
      ) {
        this.$toast.fail("手机号不正确");
      } else if (this.isSendCode) {
        this.$toast(`还需${this.Countdown}秒重新发送验证码`);
        return;
      } else {
        this.$toast.success("已发送验证码");
        this.isSendCode = true;

        this.timer = setInterval(() => {
          //开启定时器
          if (this.Countdown < 0) {
            this.timer = null;
            this.Countdown = 120;
            this.isSendCode = false;
          }
          this.Countdown = this.Countdown - 1; //倒计时开始
        }, 1000);

        this.$axios({
          method: "get",
          url: `https://www.maitanbang.com/api/sendcode/index?key=vV7XvCBLDxfXvgg4M72R0bVFdw&phone=${this.phone}&tpl=1449978`,
          data: {
            // key: 'ChC8lBQ8UWDKjGJ43hd3eH2kOe',
            // phone: 15791043140,
            // tpl: 1449978,
          },
        })
          .then(({ data }) => {
            console.log("data", data);
            this.isCanLogin = true;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    login() {
      //登录
      if (this.isCanLogin) {
        console.log("允许登录");
        if (!this.checked) {
          this.$toast(`请先勾选下方登录相关服务事项`);
          return;
        } else if (this.checked) {
          this.$toast.success("登录成功");
          this.setLogin(true); //登录成功   存储登录状态到vuex 并存储到local中
          this.setUserPhone(this.phone); //存储用户手机号到vuex 并存储到local中
          this.ShowAppNavBar(); //显示出底部导航栏
          this.$router.push("/"); //跳转至主页
        }
      }
    },

    linkWeiXin() {
      if (this.isCanLogin) {
        console.log("允许登录");
        if (!this.checked) {
          this.$toast(`请先勾选下方登录相关服务事项`);
          return;
        } else {
          this.$toast.fail("授权取消");
        }
      }
    },

    // linkPlay() {
    //   this.$router.push("/playPage");
    //   this.$store.commit("setNavIndex", -1); //调用store的commit方法 直接调用mutations对state的数据进行修改 将app的nav隐藏
    // },
  },
  computed: {
    ...mapState("playPage", ["duration", "playTime", "playState"]), //向vuex的playPage模块中的state取值
  },

  deactivated() {
    //失活周期 销毁该组件 防止残留数据
    this.$destroy();
  },
  mounted() {},

  components: {},
};
</script>

<style lang="scss" scoped>
.loginPage {
  width: 100vw;
  height: 100vh;
  background: url(@/assets/login/bg.png) no-repeat center center;
  background-size: cover;
  .loginPage_header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 6vh;
    width: 100%;
    position: relative;

    .loginPage_header_title {
      font-size: 2vh;
      font-weight: bold;
    }

    .goBack {
      position: absolute;
      height: 100%;
      width: 10%;
      left: 0%;
      top: 0%;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 70%;
      }
    }
  }

  .loginPage_Main {
    width: 100%;
    height: 94vh;
    padding: 10vh 5vw 0;
    position: relative;
    .loginPage_Main_user,
    .loginPage_Main_password {
      width: 100%;
      height: 6vh;
      background-color: #fff;
      margin-bottom: 2vh;
      border-radius: 1vh;
      overflow: hidden;
      display: flex;
      align-items: center;
      border: 0.5px solid rgba($color: #666, $alpha: 0.2);
      box-shadow: 0 0 30px 4px rgb(51 51 51 / 4%);
      position: relative;
      input {
        height: 80%;
        width: 100%;
        padding-left: 4vw;
        font-size: 2.4vh;
        font-weight: 400;
        color: #000;
        &::placeholder {
          color: #666;
          font-size: 2vh;
          font-weight: 200;
        }
      }

      .input_user_button {
        position: absolute;
        right: 0%;
        top: 0%;
        height: 100%;
        /* width: 25%; */
        color: #666;
        font-size: 1.5vh;
        font-weight: 200;
        border-left: 0.5px solid rgba(102, 102, 102, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 1px;
        padding: 0 3vw;
      }
    }

    .loginPage_Main_button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 4vh;

      .left_button {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        &.btn {
          font-size: 1.8vh;
          color: #1e384b;
          font-weight: bold;
        }

        &.text {
          color: #666;
          font-size: 1.6vh;
          font-weight: 200;
        }
      }

      .change_button {
        height: 100%;
        font-size: 1.8vh;
        color: #1e384b;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .loginPage_Main_login {
      width: 100%;
      height: 6vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      background-color: #e3e5e8;
      letter-spacing: 1.2px;
      border-radius: 4vh;
      margin-top: 3vh;

      &.canLogin {
        background-color: #315876;
      }
    }

    .loginPage_Main_loginType {
      width: 100%;
      height: 20vh;
      margin-top: 12vh;

      .main {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .weiXin {
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
          align-items: center;
          .icon {
            height: 6vh;
            width: 6vh;
            border-radius: 50%;
            overflow: hidden;
            margin-bottom: 2vh;
            img {
              width: 100%;
              height: 100%;
            }
          }

          .text {
            color: #666;
            font-size: 1.5vh;
            font-weight: 400;
          }
        }
      }
    }

    .login_agreement {
      width: 100%;
      position: fixed;
      bottom: 2%;
      left: 0%;
      display: flex;
      align-items: center;
      justify-content: center;

      .text {
        color: #fefefe;
        font-size: 1.4vh;
        font-weight: 200;
        margin-left: 3vw;
      }
    }
  }
}
</style>
