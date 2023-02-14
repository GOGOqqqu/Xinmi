<template>
  <div class="submitOrderPage">
    <div class="header">
      确认订单
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
    <div class="main">
      <div class="bg"></div>
      <div class="site" @click="linkSitePage">
        <div class="no_site" v-if="site_list.length == 0">
          <div class="img">
            <img src="@/assets/submit/icon.png" />
          </div>
          <div class="text">添加收货地址</div>
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
        <div class="has_site" v-else>
          <div class="img"><img src="@/assets/submit/icon.png" /></div>
          <div class="text site">
            <div class="site_name">{{ site_list[0].name }}</div>
            <div class="user_message">
              {{ `${site_list[0].consignee + " " + site_list[0].phone}` }}
            </div>
          </div>
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
      </div>
      <div class="goods">
        <div class="goods_header">
          <div class="goods_header_title">发货时间</div>
          <div class="goods_header_main">明天 周一 不限时段</div>
        </div>
        <div class="goods_main">
          <div class="goods_list">
            <div
              class="goods_list_item"
              v-for="i in goodsList"
              :key="i.goods_id"
            >
              <img :src="`${i.img}`" />
            </div>
          </div>
          <div class="goods_num">
            {{ `共${goodsNum}件` }}
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
      </div>
    </div>
    <div class="main_message">
      <div class="goods_price">
        <div class="goods_price_total">
          <div class="goods_price_total_title">商品合计</div>
          <div class="goods_price_total_num">{{ `￥${total_price}` }}</div>
        </div>
        <div class="freight">
          <div class="freight_title">
            运费
            <div class="text">
              {{ `还差${169 - total_price}元即享免费配送` }}
            </div>
          </div>
          <div class="freight_num">+￥10</div>
        </div>
        <div class="discount">
          <div class="discount_title">
            <img src="@/assets/shopping/discount.png" />
            优惠券
            <div class="text">可输入优惠码添加新的券</div>
          </div>
          <div class="discount_num">
            无可用
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
        <div class="integral">
          <div class="integral_title">
            积分
            <div class="text">目前没有积分</div>
          </div>
          <div class="integral_num">
            <van-switch :value="checked" size="3vh" @input="integral_onInput" />
          </div>
        </div>
        <div class="total">
          合计:
          <div class="num">{{ `￥${Number(total_price) + 10}` }}</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="submit">
        <div class="text">
          <div class="num">应付{{ `￥${Number(total_price) + 10}` }}</div>
          <div class="goods_num">
            {{ `共${goodsNum}件商品` }}
          </div>
        </div>
        <div class="submit_button" @click="submit">提交订单</div>
      </div>
    </div>
    <van-popup
      v-model="show"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '40%' }"
      round
    >
      <div class="pay_main">
        <div class="title">请选择支付方式</div>
        <div class="typeList">
          <div class="type_li none">
            <img src="@/assets/submit/yuer.png" />
            账户余额:￥0
          </div>
          <div
            class="type_li"
            @click="pay_type = '支付宝支付'"
            :class="{ checked: pay_type == '支付宝支付' }"
          >
            <img src="@/assets/submit/zhifubao.png" />

            支付宝支付
          </div>
          <div
            class="type_li"
            @click="pay_type = '微信支付'"
            :class="{ checked: pay_type == '微信支付' }"
          >
            <img src="@/assets/submit/weixin.png" />

            微信支付
          </div>
          <div
            class="type_li"
            @click="pay_type = '银行卡支付'"
            :class="{ checked: pay_type == '银行卡支付' }"
          >
            <img src="@/assets/submit/xinyongka.png" />

            银行卡支付
          </div>
        </div>
        <div class="button">
          {{ pay_type + `￥${Number(total_price) + 10}` }}
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
// import bookComment from "@/components/bookMain/bookComment.vue"; //引入评论组件

import { mapState } from "vuex";
import { mapGetters } from "vuex";

import { mapMutations } from "vuex";

export default {
  name: "submitOrderPage",
  data() {
    return {
      checked: false,
      show: false,
      pay_type: "支付宝支付",
    };
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
    ...mapMutations(["ShowAppNavBar"]),
    ...mapMutations("shopping", ["showShoppingPage", "setTransitionName"]),

    goBack() {
      this.$router.go(-1);
      this.ShowAppNavBar(); //显示底部导航栏
    },

    integral_onInput() {
      this.$toast.fail("没有积分可用");
    },

    submit() {
      if (this.site_list.length == 0) {
        this.$toast.fail("请先填写收货地址");
      } else {
        console.log("提交订单");
        this.show = true;
      }
    },

    linkSitePage() {
      console.log("跳转到收货地址页面");
      this.$router.push("/sitePage");
    },

    // linkPlay() {
    //   this.$router.push("/playPage");
    //   this.$store.commit("setNavIndex", -1); //调用store的commit方法 直接调用mutations对state的数据进行修改 将app的nav隐藏
    // },
  },
  computed: {
    ...mapState("shopping", ["goodsList", "playTime", "playState"]), //向vuex的playPage模块中的state取值
    ...mapState(["site_list"]), //向vuex的playPage模块中的state取值

    ...mapGetters("shopping", ["goodsNum", "total_price"]),
  },
  mounted() {},

  components: {},
};
</script>

<style lang="scss" scoped>
.submitOrderPage {
  width: 100vw;
  height: 100vh;
  background-color: #f5f8fa;
  .header {
    width: 100%;
    height: 8vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.2vh;
    font-weight: 600;
    color: #000;
    position: sticky;
    background-color: #c2e3fb;
    left: 0;
    top: 0;
    padding-top: 2vh;
    z-index: 9;
    .goBack {
      position: absolute;
      left: 0%;
      top: 0;
      height: 8vh;
      width: 8vh;
      color: #666;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 2vh;

      svg {
        width: 45%;
        height: 45%;
      }
    }
  }

  .footer {
    background-color: #fff;
    width: 100%;
    height: 6vh;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-top: 0.5px solid rgba($color: #000000, $alpha: 0.05);
    box-shadow: 0 0 40px 4px rgba($color: #000000, $alpha: 0.05);
    .submit {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .text {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-evenly;
        height: 100%;
        margin-right: 3vw;
        .num {
          color: #79b96f;
          font-weight: bold;
          font-size: 1.8vh;
        }
        .goods_num {
          color: #666;
          font-weight: 400;
          font-size: 1.5vh;
        }
      }

      .submit_button {
        width: 36%;
        height: 80%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        background-color: #325976;
        border-radius: 3vh;
        margin-right: 2vw;
      }
    }
  }

  .pay_main {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    padding: 1vh 0;
    .title {
      width: 100%;
      height: 5vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6vh;
    }

    .button {
      width: 90%;
      margin-left: 5%;
      height: 5vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      background-color: #325976;
      border-radius: 4vw;
      margin-top: 2vh;
    }

    .typeList {
      width: 100%;
      padding: 0 4vw;
      .type_li {
        align-items: center;
        padding: 2vh 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        position: relative;
        padding-left: 4vw;
        font-weight: 500;
        display: flex;
        justify-content: flex-start;
        img {
          height: 2.4vh;
          width: 2.4vh;
          display: block;
          margin-right: 2vw;
        }
        &.none {
          color: #999;
        }
        &.checked::after {
          content: "√";
          display: block;
          position: absolute;
          color: #325976;
          right: 4%;
          font-size: 3vh;
          font-weight: bold;
        }
      }
    }
  }

  .main {
    width: 100%;
    height: 25vh; //暂时给的
    background-color: #c2e3fb;
    padding: 3vh 0 0 0;

    .site {
      width: 94%;
      margin-left: 3%;
      background-color: #fff;
      border-radius: 2vw;
      height: 10vh;

      .no_site,
      .has_site {
        width: 100%;
        height: 100%;
        display: flex;
        position: relative;
        .img {
          height: 100%;
          width: 10vh;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 36%;
            height: 36%;
          }
        }

        .text {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          font-size: 2.4vh;
          font-weight: bold;

          &.site {
            display: flex;
            align-items: flex-start;
            justify-content: space-evenly;
            height: 100%;
            font-size: 1.6vh;
            font-weight: bold;
            flex-wrap: wrap;
            flex-direction: column;
          }
        }

        .right {
          position: absolute;
          right: 3%;
          top: 0;
          height: 100%;
          width: 6vw;
          color: #666;
          display: flex;
          align-items: center;
          justify-content: center;
          svg {
            width: 100%;
            aspect-ratio: 1/1; //保持宽高等比
          }
        }
      }
    }

    .goods {
      width: 94%;
      margin-left: 3%;
      height: 16vh;
      margin-top: 2vh;
      background-color: #fff;
      border-radius: 2vh;
      padding: 1vh 5vw 0;

      .goods_header {
        width: 100%;
        height: 4vh;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .goods_header_title {
          color: #000;
          font-weight: 400;
          font-size: 1.6vh;
        }

        .goods_header_main {
          font-weight: 800;
          font-size: 1.8vh;
          color: #5496c6;
        }
      }

      .goods_main {
        padding-top: 1vh;
        width: 100%;
        height: 9vh;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        .goods_list {
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          margin-left: 2vw;
          height: 100%;
          .goods_list_item {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              height: 85%;
              aspect-ratio: 1/1; //保持宽高等比
              display: block;
            }
          }
        }

        .goods_num {
          padding-top: 1vh;
          height: 100%;
          position: absolute;
          top: 0;
          right: 0%;
          font-size: 1.8vh;
          color: #333;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;

          svg {
            height: 2vh;
            width: 2vh;
          }
        }
      }
    }
  }

  .main_message {
    width: 100%;
    background-color: #f5f8fa;
    margin-top: 8vh;

    .goods_price {
      width: 94%;
      margin-left: 3%;
      height: 30vh;
      background-color: #fff;
      padding: 2vh 3vw;
      border-radius: 1vh;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: space-between;
      .goods_price_total,
      .freight,
      .discount,
      .integral {
        width: 100%;
        height: 3vh;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .goods_price_total_title,
        .freight_title,
        .discount_title,
        .integral_title {
          font-size: 1.8vh;
          color: #333;
          font-weight: 400;
          display: flex;
          align-items: center;
          .text {
            color: #666;
            font-size: 1.2vh;
            margin-left: 3vw;
          }

          img {
            height: 1.8vh;
            aspect-ratio: 1/1; //保持宽高等比
            display: block;
          }
        }

        .goods_price_total_num,
        .freight_num,
        .integral {
          font-size: 1.8vh;
          color: #79b96f;
          font-weight: bold;
          display: flex;
          align-items: center;
        }

        .discount_num {
          font-size: 1.8vh;
          color: #666;
          font-weight: 300;
          display: flex;
          align-items: center;

          svg {
            width: 1.8vh;
            height: 1.8vh;
          }
        }
      }

      .total {
        width: 100%;
        height: 6vh;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: #666;
        font-weight: 400;
        font-size: 2vh;
        border-top: 0.5px solid rgba($color: #000000, $alpha: 0.05);
        padding-top: 2vh;

        .num {
          color: #79b96f;
          font-weight: bold;
          font-size: 2.4vh;
        }
      }
    }
  }
}
</style>
