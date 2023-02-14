<template>
  <div class="messagePage">
    <div class="messagePage_header">
      <div class="messagePage_header_title">消息中心</div>
      <div class="messagePage_header_goBack" @click="goBack">
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
      <div class="messagePage_header_button" @click="isRead = true">
        全部已读
      </div>
    </div>
    <div class="messagePage_main" v-if="list.length != 0">
      <van-swipe-cell
        v-for="(i, index) in list"
        :key="i.memberMessageId"
        :right-width="60"
      >
        <div class="messagePage_main_item">
          <div class="messagePage_main_item_title">
            <div class="point" v-if="!isRead"></div>
            {{ i.title }}
          </div>
          <div class="messagePage_main_item_text">{{ i.content }}</div>
          <div class="messagePage_main_item_time">
            {{
              new Date(i.createdAt * 1000).getFullYear() +
              "-" +
              (new Date(i.createdAt * 1000).getMonth() + 1 < 10
                ? "0" + new Date(i.createdAt * 1000).getMonth() + 1
                : new Date(i.createdAt * 1000).getMonth() + 1) +
              "-" +
              (new Date(i.createdAt * 1000).getDate() < 10
                ? "0" + new Date(i.createdAt * 1000).getDate()
                : new Date(i.createdAt * 1000).getDate())
            }}
          </div>
        </div>

        <template #right>
          <div class="button" @click="delete_message(index)">删除</div>
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
// import bookComment from "@/components/bookMain/bookComment.vue"; //引入评论组件

import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "messagePage",
  data() {
    return {
      list: [],
      isRead: false,
    };
  },

  created() {
    this.sendData();
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
      // this.setTransitionName("slide-right");
      this.$router.go(-1);
      this.ShowAppNavBar(); //隐藏底部导航栏
      this.showShoppingPage(); //隐藏购物篮页
    },

    readAll() {
      console.log("点击了全部已读");
    },

    sendData() {
      this.$toast.loading({
        //开始loading
        //开始网络请求时 进行loading
        duration: 0, //持续加载
        forbidClick: true, //禁止在加载过程中点击背景
        message: "加载中...",
        className: "showList_toast", //自定义类名 用于更改样式
      });
      this.$axios({
        method: "get",
        url: `api/v1/member/messages?platform=ANDROID&system_version=23&aaid=6e978207e5218d5ba332cec7b1b55953&sign=5B0A9AD953BED37025E7A988F11D0E26&modifiedAt=0&access_token=03e32273466e40edbee9e7111a559f1879f35a85&suppress_response_code=true&longitude=113.270796&version=91&device_model=SM-G9550&latitude=23.135312011187&device_token=3a9d878bbe058d4cf6f6f3dfc689900f&channel=tencent`,
      })
        .then(({ data }) => {
          console.log("data", data.results);
          //device_token 可随便填写 但是不能没有
          this.list = data.results;
          this.$toast.clear(); //请求完成 关闭loading
        })
        .catch((error) => {
          console.log(error);
        });
    },

    delete_message(index) {
      // console.log(index);
      this.list = this.list.filter((item, i) => i != index);
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
.messagePage {
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;

  .messagePage_header {
    height: 6vh;
    width: 100%;
    border-bottom: 0.5px solid rgba($color: #000000, $alpha: 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .messagePage_header_title {
      font-size: 2vh;
      font-weight: 500;
    }

    .messagePage_header_goBack {
      height: 100%;
      aspect-ratio: 1/1; //保持宽高等比
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      left: 0%;
      svg {
        width: 50%;
        height: 50%;
      }
    }

    .messagePage_header_button {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      right: 2%;
      font-size: 1.6vh;
      font-weight: 500;
      color: #333;
      letter-spacing: 1px;
    }
  }

  .messagePage_main {
    height: 94vh;
    width: 100%;
    background-color: #f5f8fa;
    overflow-x: hidden;
    overflow-y: auto;

    .messagePage_main_item {
      width: 92%;
      padding: 1vh 3vw;
      line-height: 3vh;
      margin-left: 4%;
      background: #fff;
      margin: 1.6vh 4%;
      border-radius: 1vh;

      .messagePage_main_item_title {
        font-weight: bold;
        font-size: 1.6vh;
        color: #000;
        display: flex;
        align-items: center;
        .point {
          width: 1vh;
          height: 1vh;
          border-radius: 50%;
          margin-right: 1.2vw;
          background-color: #fc011a;
        }
      }

      .messagePage_main_item_text {
        color: #333;
        font-weight: 200;
        font-size: 1.4vh;
      }

      .messagePage_main_item_time {
        color: #666;
        font-weight: 200;
        font-size: 1vh;
      }
    }

    .button {
      height: 100%;
      width: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fc011a;
      color: #f5f8fa;
      border-radius: 8px;
    }
  }
}
</style>
