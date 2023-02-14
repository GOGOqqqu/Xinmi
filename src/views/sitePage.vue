<template>
  <div class="sitePage">
    <beInHeader :title="`新增收货地址`" :isShowNav="false" />
    <div class="sitePage_main">
      <div class="select_site">
        <div class="site_main" v-if="poi_address && poi_name">
          <div class="icon">
            <img src="@/assets/submit/icon.png" />
          </div>
          <div class="poi_address">{{ poi_address }}</div>
          <div class="poi_name">{{ poi_name }}</div>
        </div>
        <div class="button" @click="linkNavigationPage" v-else>
          新增小区楼宇
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
      <div class="select_message">
        <div class="select_message_item">
          楼栋门牌
          <div class="doorplate">
            <input type="text" placeholder="例B栋 101室" v-model="doorplate" />
          </div>
        </div>
        <div class="select_message_item">
          标签
          <div
            class="tag"
            @click="tag = `home`"
            :class="{ checked: tag == `home` }"
          >
            家
          </div>
          <div
            class="tag"
            @click="tag = `company`"
            :class="{ checked: tag == `company` }"
          >
            公司
          </div>
        </div>
        <div class="select_message_item">
          收货人
          <div class="consignee">
            <input type="text" placeholder="请填写姓名" v-model="consignee" />
          </div>
        </div>
        <div class="select_message_item">
          手机号
          <div class="phone">
            <input type="text" placeholder="请填写手机号" v-model="phone" />
          </div>
        </div>
      </div>
      <div class="checkbox">
        <div class="title">设为默认地址</div>
        <div class="input">
          <van-switch v-model="checked" size="3vh" />
        </div>
      </div>
    </div>
    <div
      class="submit_button"
      :class="{
        isCanSubmit: doorplate && consignee && phone && poi_address && poi_name,
      }"
      @click="save_site"
    >
      保存并使用
    </div>
  </div>
</template>

<script>
import beInHeader from "@/components/beInHeader.vue"; //引入通用头部组件

import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "sitePage",
  data() {
    return {
      doorplate: "", //门牌号
      tag: "",
      consignee: "",
      phone: "",
      checked: false,
      isCanSubmit: false,
    };
  },

  created() {},

  beforeRouteLeave(to, from, next) {
    this.set_poi_address("");
    this.set_poi_name("");
    next();
  },
  methods: {
    ...mapMutations([
      "ShowAppNavBar",
      "set_poi_address",
      "set_poi_name",
      "add_site",
    ]),

    ...mapMutations("shopping", ["showShoppingPage", "setTransitionName"]),

    // linkPlay() {
    //   this.$router.push("/playPage");
    //   this.$store.commit("setNavIndex", -1); //调用store的commit方法 直接调用mutations对state的数据进行修改 将app的nav隐藏
    // },

    linkNavigationPage() {
      this.$router.push("/navigationPage");
    },

    save_site() {
      if (
        this.doorplate &&
        this.consignee &&
        this.phone &&
        this.poi_address &&
        this.poi_name
      ) {
        console.log("保存地址");
        this.add_site({
          name: this.poi_address,
          main: this.poi_name,
          doorplate: this.doorplate, //门牌
          consignee: this.consignee, //收货人
          phone: this.phone, //手机号
        });
        this.$router.go(-1);
      }
    },
  },
  computed: {
    ...mapState(["poi_address", "poi_name", "site_list"]), //向vuex的playPage模块中的state取值
  },

  deactivated() {
    //失活周期 销毁该组件 防止残留数据
    this.$destroy();
  },
  mounted() {},

  components: {
    beInHeader,
  },
};
</script>

<style lang="scss" scoped>
.sitePage {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #f5f8fa;

  .sitePage_main {
    width: 100%;
    padding: 2vh 3vw;
    .select_site {
      width: 100%;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      border-radius: 6px;
      .site_main {
        height: 100%;
        width: 90%;
        display: flex;
        border: 1px solid #468ec2;
        font-weight: 600;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: flex-start;
        align-content: flex-start;
        padding-left: 12vw;
        padding-right: 4vw;
        font-size: 1.2vh;
        position: relative;
        border-radius: 2vw;
        .icon {
          height: 100%;
          width: 20vw;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 0;
          left: -5%;

          img {
            width: 40%;
            height: 40%;
          }
        }

        .poi_address {
          font-weight: bold;
          font-size: 1.6vh;
        }
      }
      .button {
        border: 1px solid #468ec2;
        width: 90%;
        height: 60%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #468ec2;
        font-size: 2vh;

        svg {
          height: 24px;
          width: 24px;
        }
      }
    }

    .select_message {
      width: 100%;
      background-color: #fff;
      border-radius: 6px;
      margin-top: 3vh;
      .select_message_item {
        padding: 30px 6vw;
        font-size: 16px;
        font-weight: 500;
        border-bottom: 0.5px solid rgba($color: #000000, $alpha: 0.08);
        display: flex;
        align-items: center;
        justify-content: space-between;
        .doorplate,
        .consignee,
        .phone {
          width: 60vw;
          display: flex;
          align-items: center;
          justify-content: center;
          input {
            height: 100%;
            width: 100%;
            // padding: 1vh 0 1vh 2vw;

            &::placeholder {
              color: #ddd;
            }
          }
        }

        .tag {
          padding: 8px 8vw;
          background-color: #f5f8fa;
          color: #666;
          border-radius: 2vw;
          &.checked {
            background-color: #67a2cd;
            color: #fff;
          }
        }
      }
    }

    .checkbox {
      width: 100%;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      border-radius: 6px;
      padding: 0 6vw;
      margin: 3vh 0 0 0;
    }
  }

  .submit_button {
    width: 90%;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 4vh 5% 0;
    background-color: #e3e5e8;
    color: #fefefe;
    border-radius: 6vw;
    letter-spacing: 0.5px;
    &.isCanSubmit {
      background-color: #315876;
      color: #fff;
    }
  }
}
</style>
