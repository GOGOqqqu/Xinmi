<template>
  <div class="shoppingPage">
    <transition :name="transitionName">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
    <div class="shoppingPage_header" v-show="isShowShoppingPage">
      <div class="title">购物篮</div>
      <div class="shoppingPage_header_right">
        <div class="discount">
          <img src="@/assets/shopping/discount.png" />
          <div class="redact" @click="isRedact = !isRedact">
            {{ isRedact == false ? `编辑` : `取消` }}
          </div>
        </div>
      </div>
    </div>
    <div class="shoppingPage_main" v-show="isShowShoppingPage">
      <div class="announcement" v-if="shoppingData?.cart?.notification">
        <van-notice-bar
          left-icon="volume-o"
          scrollable
          mode="link"
          background="#9cbed4"
          color="#fefefe"
          @click="linkAnnouncement"
          >{{ announcement.title }}</van-notice-bar
        >
      </div>
      <div class="goods_list">
        <goodsItem
          v-for="i in goodsList"
          :key="i.goods_id"
          :checked="i.checked"
          :shopId="i.goods_id"
          :img="i.img"
          :title="i.name"
          :num="i.num"
          :price="i.price"
          :sellPrice="i.sell_price"
          :size="i.size"
        />
      </div>
      <div class="goods_list_default" v-if="goodsList.length == 0">
        <div class="goods_list_default_img">
          <img src="@/assets/shopping/goods_list_default_bg.png" />
        </div>
        <div class="goods_list_default_title">购物篮中空空的喔</div>
        <div class="goods_list_default_button" @click="linkHomePage">
          马上去逛好食材
        </div>
      </div>
      <div class="redemption"></div>

      <div class="Guess_You_Like" v-if="shopping_page_bottom_main_isLoaded">
        <div class="Guess_You_Like_title">
          <div class="img_left">
            <img src="@/assets/shopMain/Guess_You_Like_title_left.png" />
          </div>
          猜你喜欢
          <div class="img_right">
            <img src="@/assets/shopMain/Guess_You_Like_title_right.png" />
          </div>
        </div>
        <div class="Guess_You_Like_main">
          <shoppingGuessYouLike />
        </div>
      </div>
    </div>
    <div class="shoppingPage_bottom" v-show="isShowShoppingPage">
      <div class="shoppingPage_bottom_left">
        <van-checkbox
          v-model="allCheckedButtonState"
          checked-color="#496c85"
          @click="allChange"
          ><div class="text">全选</div></van-checkbox
        >
      </div>
      <div class="shoppingPage_bottom_right" v-if="isRedact">
        <div class="delete_button" @click="delete_select">删除所选</div>
      </div>
      <div class="shoppingPage_bottom_right" v-else>
        <div class="shoppingPage_bottom_right_text">
          合计(不含运费)￥
          <div class="num">{{ total_price }}</div>
        </div>
        <div
          class="shoppingPage_bottom_right_button"
          @click="onSubmit"
          :class="{ none_goods: goodsNum == 0 }"
        >
          去结算{{ `(${goodsNum})` }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import goodsItem from "@/components/shopping/goodsItem.vue"; //引入商品组件
import shoppingGuessYouLike from "@/components/shopping/shoppingGuessYouLike.vue"; //引入猜你喜欢商品组件

import { mapState } from "vuex";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import { Dialog } from "vant"; //弹出框 通过函数调用
export default {
  name: "shoppingPage",
  data() {
    return {
      shoppingData: {},
      checked: true, //全选按钮状态
      isRedact: false, //是否出去编辑状态中
      shopping_page_bottom_main_isLoaded: false,
      // transitionName: "", //当前路由切换进行的动画
    };
  },

  watch: {
    //使用watch 监听$router的变化
    // $route(to, from) {
    //   // meta.index在路由配置中设置 用于判断此时路由的切换属于是同级切换还是跨级切换
    //   // 如果to索引大于from索引,判断为前进状态,反之则为后退状态
    //   if (to.meta.index > from.meta.index) {
    //     //设置动画名称
    //     // console.log("路由前进");
    //     this.transitionName = "slide-left"; //前进动画
    //   } else if (to.meta.index == from.meta.index) {
    //     return; //同级路由不做动画
    //   } else {
    //     // console.log("路由后退");
    //     this.transitionName = "slide-right"; //后退动画
    //   }
    //   console.log("to", to);
    //   console.log("from", from);
    // },
  },

  computed: {
    ...mapState("shopping", [
      "goodsList",
      "isShowShoppingPage",
      "transitionName",
    ]), //向vuex的playPage模块中的state取值
    ...mapGetters("shopping", ["goodsNum", "total_price"]),
    announcement() {
      return this.shoppingData.cart.notification.find(
        (item) => item.tag == "公告" //找到公告
      );
    },

    allCheckedButtonState: {
      //全选按钮的状态
      get() {
        let isAllChecked = this.goodsList.findIndex(
          (i) => i.checked == false //找到商品列表中的未选中商品
        );
        if (isAllChecked == -1) {
          //如果不存在未选中的商品
          return true; //则全选按钮的状态为勾选
        } else {
          return false; //反之不勾选
        }
      },
      set() {},
    },
  },

  created() {
    this.sendShoppingPageMessage();
    this.send_shopping_page_bottom_main();
  },

  activated() {
    //路由激活时触发
    console.log("激活组件钩子");
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
    ...mapMutations(["HideAppNavBar"]),
    ...mapMutations("playPage", ["PLAY", "set_list", "set_sylloge"]),
    ...mapMutations("shopping", [
      "deleteChangeGoods",
      "check_all_goods",
      "Invert_Selection_goods",
      "setTopSellingGoods",
      "setGuessYouLike_goods",
    ]),

    sendShoppingPageMessage() {
      this.$axios({
        method: "get",
        url: `api/v2/cart?system_version=23&aaid=6e978207e5218d5ba332cec7b1b55953&sign=62BECF7A6F994FF64F96CF40045EACC4&init_select_gift_status=true&longitude=113.270796&adjustQuantity=true&platform=ANDROID&autoused_coupon=true&selectCheckout=true&access_token=03e32273466e40edbee9e7111a559f1879f35a85&suppress_response_code=true&version=90&latitude=23.135312011187&req_page=1&device_token=3a9d878bbe058d4cf6f6f3dfc689900f`,
      })
        .then(({ data }) => {
          console.log("data", data.results[0]);
          //device_token 可随便填写 但是不能没有
          this.shoppingData = data.results[0];
        })
        .catch((error) => {
          console.log(error);
        });
    },

    send_shopping_page_bottom_main() {
      this.$toast.loading({
        //开始loading
        //开始网络请求时 进行loading
        duration: 0, //持续加载
        forbidClick: true, //禁止在加载过程中点击背景
        message: "加载中...",
        className: "showList_toast", //自定义类名 用于更改样式
      });
      //包括轮播商品 以及猜你喜欢商品
      this.$axios({
        method: "get",
        url: `api/v2/products/member_recommend?platform=ANDROID&system_version=23&aaid=6e978207e5218d5ba332cec7b1b55953&sign=5CF5DAF4979D3B27ED1CE0CD779943FA&access_token=03e32273466e40edbee9e7111a559f1879f35a85&suppress_response_code=true&longitude=113.270796&version=91&device_model=SM-G9550&latitude=23.135312011187&device_token=3a9d878bbe058d4cf6f6f3dfc689900f&channel=tencent&top_sell_products=true`,
      })
        .then(({ data }) => {
          let topSellingGoods = data.results.find(
            //分类数据
            (i) => i.goods_type == "topSellingGoods"
          );
          let GuessYouLike_goods = data.results.filter(
            //分类数据
            (i) => i.goods_type == "normal"
          );
          this.setTopSellingGoods(topSellingGoods.products); //注入vuex
          this.setGuessYouLike_goods(GuessYouLike_goods); //注入vuex
          console.log("topSellingGoods.products", topSellingGoods.products);
          console.log("GuessYouLike_goods", GuessYouLike_goods);
          this.shopping_page_bottom_main_isLoaded = true; //显示出猜你喜欢
          this.$toast.clear(); //请求完成 关闭loading
        })
        .catch((error) => {
          console.log(error);
        });
    },

    linkAnnouncement() {
      console.log("点击了");
      Dialog.alert({
        title: this.announcement.popTitle,
        // message: this.announcement.popContent,
        message: `<div class="shoppingPage_announcement">${this.announcement.popContent}</div>`,
        theme: "round-button",
        width: "82vw",
        messageAlign: "left",
        confirmButtonText: "我知道了",
        confirmButtonColor: "#325976",
        closeOnClickOverlay: true,
        className: "shoppingPage_announcement",
      }).then(() => {
        // on close
      });
    },

    onSubmit() {
      if (this.goodsNum) {
        //当购物篮存在商品时才可以提交
        console.log("点击了提交");
        this.HideAppNavBar(); //隐藏底部导航栏
        this.$router.push("/submitOrderPage"); //跳转到提交订单页面
      }
    },

    allChange() {
      //点击全选按钮事件
      if (!this.allCheckedButtonState) {
        console.log("触发了全选操作");
        this.check_all_goods();
      } else {
        console.log("触发了取消全选操作");
        this.Invert_Selection_goods();
      }
    },

    delete_select() {
      //删除所选
      console.log("点击了删除");
      this.deleteChangeGoods();
      this.isRedact = false; //回到非编辑模式
    },

    linkHomePage() {
      //跳转到主页
      this.$router.push("/");
      this.$emit("changeActive", 0);
    },

    // goBack() {
    //   // console.log("点击了返回按钮");
    //   this.$router.go(-1);
    // },

    // linkPlay() {
    //   this.$router.push("/playPage");
    //   this.$store.commit("setNavIndex", -1); //调用store的commit方法 直接调用mutations对state的数据进行修改 将app的nav隐藏
    // },
  },

  mounted() {},

  components: {
    goodsItem,
    shoppingGuessYouLike,
  },
};
</script>

<style lang="scss" scoped>
.shoppingPage {
  width: 100vw;
  height: 94vh;
  background-color: #f5f8fa; //购物篮页面默认颜色
  position: relative;

  .slide-right-enter-active,  //路由动画
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    //路由切换时 前进 与 后退 的动画
    will-change: transform;
    transition: all 250ms;
    position: absolute;
  }
  .slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .shoppingPage_header {
    width: 100%;
    height: 7vh;
    padding: 0 4vw 2vh;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 2;
    background: #f5f8fa;

    .title {
      font-size: 2.2vh;
      color: #333;
      font-weight: bold;
      height: 50%;
      display: flex;
      align-items: center;
    }

    .shoppingPage_header_right {
      display: flex;
      height: 100%;
      .discount {
        height: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: center;

        img {
          // width: 100%;
          height: 45%;
          display: block;
        }

        .redact {
          height: 50%;
          display: flex;
          align-items: center;
          margin-left: 4vw;
          color: #666;
          font-size: 1.8vh;
        }
      }
    }
  }

  .shoppingPage_main {
    width: 100%;
    overflow-y: auto;
    height: 81vh;
    .announcement {
      // height: 5vh;
      width: 100%;
      // background-color: blue;

      .van-notice-bar {
        height: 5vh;
      }
    }

    .goods_list {
      width: 100%;
      padding: 1.5vh 2vw;
    }

    .goods_list_default {
      width: 100%;
      height: 50vh;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-evenly;

      .goods_list_default_img {
        width: 100%;
        aspect-ratio: 1.5/1; //保持宽高等比
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 65%;
          display: block;
        }
      }

      .goods_list_default_title {
        color: #666;
        font-size: 1.6vh;
        font-weight: 200;
        display: flex;
        justify-content: center;
      }

      .goods_list_default_button {
        width: 42%;
        height: 5vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #325976;
        color: #fff;
        font-size: 1.6vh;
        border-radius: 6vw;
      }
    }

    .Guess_You_Like {
      width: 100%;
      background-color: #f5f8fa;
      padding-bottom: 3vh;

      .Guess_You_Like_title {
        width: 100%;
        height: 6vh;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2vh;
        font-weight: bold;
        color: #000;

        .img_left,
        .img_right {
          height: 3vh;
          margin: 0 2vw;
          img {
            height: 100%;
            display: block;
          }
        }
      }

      .Guess_You_Like_main {
        width: 100%;
      }
    }
  }

  .shoppingPage_bottom {
    position: sticky;
    left: 0;
    bottom: 6vh;
    width: 100%;
    height: 6vh;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4vw;

    .shoppingPage_bottom_left {
      display: flex;
      align-items: center;
      .text {
        font-size: 1.2ch;
      }
    }

    .shoppingPage_bottom_right {
      display: flex;
      align-items: center;
      height: 100%;

      .delete_button {
        height: 75%;
        padding: 0px 25vw;
        background-color: #f55050;
        color: #fff;
        font-size: 1.6vh;
        letter-spacing: 2px;
        border-radius: 4vh;
        display: flex;
        align-items: center;
      }

      .shoppingPage_bottom_right_text {
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 0.6vw;
        margin-right: 2vw;
        color: #72b567;

        .num {
          font-size: 2vh;
          font-weight: bold;
        }
      }

      .shoppingPage_bottom_right_button {
        display: flex;
        align-items: center;
        padding: 1.4vh 8vw;
        border-radius: 6vw;
        background-color: #325976;
        color: #f9fafb;
        font-size: 2vh;

        &.none_goods {
          background-color: #e3e5e8;
          color: #fff;
        }
      }
    }
  }
}
</style>
