<template>
  <div class="mePage">
    <div
      class="mePage_header"
      :style="{ backgroundColor: `rgba(222, 241, 255,${iconOpacity})` }"
    >
      <div class="mePage_header_icon">
        <div class="icon">
          <img
            src="@/assets/mePage/icon1.png"
            :style="{ opacity: iconOpacity }"
          />
        </div>
        <div class="icon" @click="linkSettingPage">
          <img
            src="@/assets/mePage/icon2.png"
            :style="{ opacity: iconOpacity }"
          />
        </div>
        <div class="icon">
          <img
            src="@/assets/mePage/icon3.png"
            :style="{ opacity: iconOpacity }"
          />
        </div>
      </div>
    </div>
    <div class="mePageMain" @scroll.passive="getScroll($event)">
      <div class="mePageMain_bg"></div>
      <div class="mePageMain_top">
        <div class="mePageMain_bg_header">
          <div class="left">
            <div class="user_img">
              <img src="@/assets/mePage/user.png" />
            </div>
            <div class="user_message">
              <div class="user_name">{{ userPhone }}</div>
              <div class="user_vip">
                {{ userData?.member_lv_name || "vip" }}
              </div>
            </div>
          </div>
          <div class="right">
            <div class="icon">
              <img src="@/assets/mePage/icon1.png" />
            </div>
            <div class="icon" @click="linkSettingPage">
              <img src="@/assets/mePage/icon2.png" />
            </div>
            <div class="icon">
              <img src="@/assets/mePage/icon3.png" />
            </div>
          </div>
        </div>
        <div class="mePageMain_bg_line">
          <van-progress
            :percentage="2 / 20000"
            :show-pivot="false"
            track-color="#f2f8fd"
          />
        </div>
        <div class="mePageMain_bg_vip">
          <div class="left">
            成长值{{ userData?.growth?.now_growth || "0" }}/{{
              userData?.growth?.next_growth || "0"
            }}
          </div>
          <div class="right">
            <div>会员中心</div>
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
        <div class="mePageMain_bg_button">
          <div class="mePageMain_bg_button_item">
            <div class="num">0</div>
            <div class="title">优惠券</div>
          </div>
          <div class="mePageMain_bg_button_item">
            <div class="num">0</div>
            <div class="title">积分</div>
          </div>
          <div class="mePageMain_bg_button_item">
            <div class="num">0</div>
            <div class="title">余额</div>
          </div>
          <div class="mePageMain_bg_button_item">
            <div class="num">0</div>
            <div class="title">礼品</div>
          </div>
        </div>
      </div>
      <div class="mePageMain_main" v-if="userData?.columns">
        <div class="mePageMain_main_header">
          <div
            class="mePageMain_main_header_item"
            v-for="i in userData.columns[0].rows"
            :key="i.title"
          >
            <img
              :src="`https://img01.yimishiji.com/v1/img/${i.imageId}.webp`"
            />
            {{ i.title }}
          </div>
        </div>
        <div class="mePageMain_main_goods">
          <van-swipe
            class="mePageMain_main_goods_swipe"
            :autoplay="2500"
            indicator-color="white"
          >
            <van-swipe-item
              v-for="item in userData.group_list"
              :key="item.product_id"
            >
              <div class="mePageMain_main_goods_swipe_box">
                <div class="box_img">
                  <img
                    :src="`https://img01.yimishiji.com/v1/img/${item.product.image_default_id}.webp`"
                  />
                </div>
                <div class="box_main">
                  <div class="goods_name">{{ item.share_product_name }}</div>
                  <div class="goods_tab">{{ item.progress.msg }}</div>
                  <div
                    class="price"
                    v-if="item.product.discount_price == item.product.price"
                  >
                    {{ `￥${parseFloat(item.product.price)}` }}
                  </div>
                  <div class="sell_Price price" v-else>
                    {{ `￥${parseFloat(item.product.discount_price)}`
                    }}<span class="black">{{
                      `￥${parseFloat(item.product.price)}`
                    }}</span>
                  </div>
                  <div class="goods_button">立即蹭团</div>
                </div>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="mePageMain_main_texts">
          <van-swipe
            vertical
            class="notice-swipe"
            :autoplay="1500"
            :show-indicators="false"
            :loop="true"
          >
            <van-swipe-item v-for="item in userData.brand_words" :key="item">{{
              item
            }}</van-swipe-item>
          </van-swipe>
        </div>
        <div
          class="mePageMain_main_item"
          v-for="i in userData.c_row"
          :key="i.w_id"
        >
          <div class="image-multi" v-if="i.type == `image-multi`">
            <img
              v-for="item in i.elements"
              :key="item.value"
              :src="`https://img01.yimishiji.com/v1/img/${item.value}.webp`"
            />
          </div>
          <div class="icon-config" v-else-if="i.type == `icon-config`">
            <div
              class="icon-config_item"
              v-for="item in i.elements"
              :key="item.value"
            >
              <img
                :src="`https://img01.yimishiji.com/v1/img/${item.value}.webp`"
              />
              {{ item.attrs.title }}
            </div>
          </div>
          <div class="ad-config" v-else-if="i.type == `ad-config`">
            <img
              v-for="item in i.elements"
              :key="item.value"
              :src="`https://img01.yimishiji.com/v1/img/${item.value}.webp`"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import bookComment from "@/components/bookMain/bookComment.vue"; //引入评论组件

import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "mePage",
  data() {
    return {
      iconOpacity: 0, //图标的不透明度
      userData: {}, //用户数据
    };
  },

  created() {
    this.sendData(); //请求用户数据
  },

  activated() {
    //路由激活时触发
    console.log("激活组件钩子");
  },

  methods: {
    ...mapMutations([
      "HideAppNavBar",
      "setLogin",
      "ShowAppNavBar",
      "setUserPhone",
    ]),

    // goBack() {
    //   // console.log("点击了返回按钮");
    //   this.$router.go(-1);
    // },

    // linkPlay() {
    //   this.$router.push("/playPage");
    //   this.$store.commit("setNavIndex", -1); //调用store的commit方法 直接调用mutations对state的数据进行修改 将app的nav隐藏
    // },

    getScroll(event) {
      //滚动事件
      // console.log("this.iconOpacity", this.iconOpacity);
      this.iconOpacity = event.target.scrollTop / 100; //划下100px的时候 图片透明度刚好为0
    },

    linkSettingPage() {
      //跳转到设置页面
      console.log("跳转到设置页面");
      this.HideAppNavBar();
      this.$router.push("/SettingPage");
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
        url: `api/v3/member?platform=ANDROID&system_version=23&aaid=6e978207e5218d5ba332cec7b1b55953&sign=7CC2E41E4B64061431B76C57B20148B5&access_token=49c1d73371f21b802fc1aa80e5328dc815fbd3e5&suppress_response_code=true&longitude=113.270796&version=91&device_model=SM-G9550&latitude=23.135312011187&device_token=3a9d878bbe058d4cf6f6f3dfc689900f&channel=tencent`,
      })
        .then(({ data }) => {
          console.log("data", data.results[0]);
          this.userData = data.results[0];
          //device_token 可随便填写 但是不能没有
          this.$toast.clear(); //请求完成 关闭loading
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    ...mapState(["userPhone"]), //向vuex的playPage模块中的state取值
  },
  mounted() {},

  components: {},
};
</script>

<style lang="scss" scoped>
.mePage {
  width: 100vw;
  height: 94vh;
  position: relative;
  .mePage_header {
    width: 100%;
    height: 5vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    background-color: rgb(222, 241, 255);
    .mePage_header_icon {
      height: 100%;
      display: flex;
      position: absolute;
      top: 0;
      right: 2%;
      .icon {
        height: 100%;
        width: 5vh;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 1vw;
        img {
          width: 60%;
          height: 60%;
          display: block;
          // opacity: 0;
        }
      }
    }
  }

  .mePageMain {
    height: 94vh;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    .mePageMain_bg {
      width: 100%;
      height: 32%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      pointer-events: none;
      background: url("@/assets/mePage/bg.png") no-repeat;
      background-size: cover;
    }

    .mePageMain_top {
      width: 100%;
      height: 32%;
      position: absolute;
      left: 0;
      top: 0;

      .mePageMain_bg_header {
        width: 100%;
        height: 12vh;
        padding: 2vh 2vw 1vh 5vw;
        display: flex;
        justify-content: space-between;

        .left {
          display: flex;
          align-items: center;

          .user_img {
            height: 6vh;
            width: 6vh;

            img {
              width: 100%;
              height: 100%;
              display: block;
            }
          }

          .user_message {
            margin-left: 3vw;
            line-height: 2.4vh;
            .user_name {
              font-size: 2vh;
              font-weight: 600;
              letter-spacing: 0.5px;
              color: #666;
            }
            .user_vip {
              font-size: 1.6vh;
              font-weight: 800;
              color: #a6bdc7;
            }
          }
        }

        .right {
          height: 5vh;
          display: flex;
          .icon {
            height: 100%;
            width: 5vh;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 1vw;
            img {
              width: 60%;
              height: 60%;
              display: block;
              // opacity: 0;
            }
          }
        }
      }

      .mePageMain_bg_line {
        width: 100%;
        height: 3vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 3vw;

        .van-progress {
          width: 100%;
        }
      }

      .mePageMain_bg_vip {
        width: 100%;
        height: 3vh;
        padding: 0 3vw;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 1.4vh;
        font-weight: 500;
        color: #333;

        .right {
          display: flex;
          align-items: center;
          svg {
            width: 1.4vh;
            height: 1.4vh;
          }
        }
      }

      .mePageMain_bg_button {
        width: 100%;
        height: 8vh;
        display: flex;
        .mePageMain_bg_button_item {
          width: 25%;
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .num {
            font-size: 2.4vh;
            font-weight: bold;
            margin-bottom: 1vh;
          }

          .title {
            font-size: 1.6vh;
            font-weight: 400;
            font-weight: 200;
            color: #666;
          }
        }
      }
    }

    .mePageMain_main {
      position: absolute;
      left: 0;
      top: 28%;
      width: 100%;
      // height: 100vh; //暂时给的
      background-color: #fefefe;
      overflow: hidden;
      border-radius: 5vh 5vh 0 0;

      .mePageMain_main_header {
        height: 12vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .mePageMain_main_header_item {
          height: 100%;
          width: 25%;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          flex-direction: column;
          justify-content: space-evenly;
          font-size: 1.5vh;
          color: #333;
          letter-spacing: 0.5px;
          font-weight: 400;
          img {
            width: 36%;
            height: 36%;
            display: block;
          }
        }
      }

      .mePageMain_main_goods {
        height: 15vh;
        width: 92%;
        margin-left: 4%;
        background-color: #f5f8fa;
        border-radius: 1vh;
        overflow: hidden;

        .mePageMain_main_goods_swipe {
          width: 100%;
          height: 100%;

          .mePageMain_main_goods_swipe_box {
            width: 100%;
            height: 100%;
            display: flex;
            // align-items: center;
            // justify-content: center;

            .box_img {
              height: 100%;
              aspect-ratio: 1/1; //保持宽高等比
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                height: 85%;
                width: 85%;
                border-radius: 2vh;
                display: block;
              }
            }

            .box_main {
              width: calc(92vw - 15vh);
              height: 100%;
              display: flex;
              flex-wrap: wrap;
              flex-direction: column;
              justify-content: space-evenly;
              padding: 0 2vw;
              position: relative;

              .goods_name {
                font-weight: 600;
                font-size: 1.6vh;
                line-height: 2vh;
              }

              .goods_tab {
                font-size: 1.2vh;
                color: #333;
                font-weight: 200;
              }

              .price {
                font-size: 1.6vh;
                color: #72b567;
                font-weight: bold;
                margin-top: 1vh;

                &.sell_Price {
                  color: #fa5555;
                  display: flex;
                  align-items: center;

                  .black {
                    color: #666;
                    font-size: 0.8vh;
                    font-weight: 200;
                    text-decoration: line-through;
                  }
                }
              }

              .goods_button {
                position: absolute;
                padding: 1.2vh 3vw;
                color: #fff;
                background-color: #fa5555;
                border-radius: 3vh;
                display: flex;
                align-items: center;
                justify-content: center;
                bottom: 10%;
                right: 5%;
              }
            }
          }
        }
      }

      .mePageMain_main_texts {
        width: 86%;
        margin-left: 7%;
        margin-top: 3vh;
        height: 4vh;
        line-height: 4vh;
        background-color: #f5f8fa;
        color: #a6bdc7;
        font-size: 1.5vh;
        font-weight: 400;
        border-radius: 3vh;

        .notice-swipe {
          height: 4vh;
          line-height: 4vh;
          width: 100%;
          text-align: center;
        }
      }

      .mePageMain_main_item {
        width: 100%;
        padding: 0 3vw;

        .image-multi {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          margin-top: 2.5vh;
          img {
            width: 45%;
            display: block;
            border-radius: 2vw;
          }
        }

        .icon-config {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          margin-top: 1vh;

          .icon-config_item {
            width: 25%;
            aspect-ratio: 1/1;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            font-size: 1.5vh;
            color: #666;
            img {
              width: 50%;
              display: block;
            }
          }
        }

        .ad-config {
          width: 100%;
          margin: 1.5vh 0;

          img {
            width: 100%;
            border-radius: 1.5vh;
            display: block;
          }
        }
      }
    }
  }
}
</style>
