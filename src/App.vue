<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view @changeActive="changeActive"/>
      </keep-alive>
    </transition>

    <van-tabbar v-model="active" :border="false" v-show="isShowAppNavBar">
      <van-tabbar-item
          :to="{
          name: 'homePage',
        }"
      >
        <div class="tab_item">
          <div class="tab_item_box_img">
            <img src="@/assets/navBar/home.png" v-if="active != 0"/>
            <img src="@/assets/navBar/home_checked.png" v-else/>
          </div>
          <div class="tab_item_box_text">首页</div>
        </div>
      </van-tabbar-item>
      <van-tabbar-item
          :to="{
          name: 'classifyPage',
        }"
      >
        <div class="tab_item">
          <div class="tab_item_box_img">
            <img src="@/assets/navBar/classify.png" v-if="active != 1"/>
            <img src="@/assets/navBar/classify_checked.png" v-else/>
          </div>
          <div class="tab_item_box_text">分类</div>
        </div>
      </van-tabbar-item>
      <van-tabbar-item
        :to="{
          name: 'chaozhi',
        }"
      >
        <div class="tab_item">
          <div class="tab_item_box_img">
            <img src="@/assets/navBar/choiceness.png" v-if="active != 2"/>
            <img src="@/assets/navBar/choiceness_checked.png" v-else/>
          </div>
          <div class="tab_item_box_text">超值精选</div>
        </div>
      </van-tabbar-item>
      <van-tabbar-item
          :to="{
          name: 'shoppingPage',
        }"
        :badge="goodsNum == 0 ? '' : goodsNum"
      >
        <div class="tab_item">
          <div class="tab_item_box_img">
            <img src="@/assets/navBar/shopping.png" v-if="active != 3"/>
            <img src="@/assets/navBar/shopping_checked.png" v-else/>
          </div>
          <div class="tab_item_box_text">购物篮</div>
        </div>
      </van-tabbar-item>
      <van-tabbar-item
          :to="{
          name: 'mePage',
        }"
      >
        <div class="tab_item">
          <div class="tab_item_box_img">
            <img src="@/assets/navBar/me.png" v-if="active != 4"/>
            <img src="@/assets/navBar/me_checked.png" v-else/>
          </div>
          <div class="tab_item_box_text">我的</div>
        </div>
      </van-tabbar-item>
    </van-tabbar>

    <van-popup
        v-model="isShowShopMain"
        position="bottom"
        :close-on-click-overlay="false"
        duration="0.18"
        :close-on-popstate="true"
        v-show="isShowShoppingPage"
        :overlay="false"
    >
      <shopMainPage v-if="showShopMain"/>
    </van-popup>
    <div class="popup-adv" v-if="popUpAdUrl !== '' ">
      <van-dialog v-model="showAD" title="" confirmButtonText="关闭" confirmButtonColor="#000000">
        <img :src="'https://img01.yimishiji.com/v1/img/' + popUpAdUrl + '.webp'" alt=""/>
      </van-dialog>
    </div>
  </div>
</template>

<script>
import shopMainPage from "@/views/app/shopMainPage.vue"; //引入商品详情页组件

import { mapState, mapGetters } from "vuex"; //引入vuex自带的语法糖
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      active: 0, //底部标签栏当前激活的索引
      transitionName: "", //当前路由切换进行的动画
      showAD: true, // 弹出广告的布尔
    };
  },

  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      // meta.index在路由配置中设置 用于判断此时路由的切换属于是同级切换还是跨级切换
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        // console.log("路由前进");
        this.transitionName = "slide-right"; //前进动画
      } else {
        // console.log("路由后退");
        this.transitionName = "slide-right"; //后退动画
      }

      if (to.name == "loginPage") {
        this.changeActive(0); //跳转到登录页后 如点击返回则返回首页 将导航栏的激活索引调整回首页
        this.HideAppNavBar();
      }
    },
  },

  created() {
    this.getLocalStorage(); //获取历史记录的用户信息
  },

  computed: {
    ...mapState(["isShowAppNavBar", "isLogin"]), //使用计算属性中的vuex语法糖 直接获得state中存储的对象App 存储着关于app页面的数据
    ...mapState("shopMain", ["showShopMain", "isShowShoppingPage"]), //使用计算属性中的vuex语法糖 直接获得state中存储的对象App 存储着关于app页面的数据
    ...mapState("homePage", ["popUpAdUrl"]),
    ...mapGetters("shopping", ["goodsNum"]),

    // ...mapState("topPage", ["isShowTopPage"]),

    isShowShopMain: {
      //为防止v-model与计算属性绑定发出警告 给vuex中的数据加工下 添加一个空的set方法
      get() {
        return this.showShopMain;
      },
      set() {
      },
    },
  },

  methods: {
    changeActive(index) {
      //改变当前激活的索引 由子组件触发
      // console.log("index", index);
      this.active = index;
    },

    getLocalStorage() {
      //获取local中的用户信息
      let YiMiUser = localStorage.YiMiUser
        ? JSON.parse(localStorage.YiMiUser)
        : {};
      if (YiMiUser?.isLogin) {
        //如果处于已登录状态  则将用户数据存储至vuex中
        this.setLogin(YiMiUser.isLogin);
        this.setUserPhone(YiMiUser.userPhone);
      }
    },

    ...mapMutations("homePage", ["setAddress"]), //设置定位

    ...mapMutations(["HideAppNavBar", "setLogin", "setUserPhone"]),
  },

  mounted() {
    // this.$axios({
    //   method: "get",
    //   url: "https://img01.yimishiji.com/v1/img/0b822edb28b02d882ce09a79c7066d24.webp",
    // })
    //   .then(({ data }) => {
    //     console.log("商城", data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    this.$axios({
      method: "get",
      url: "map/location/ip?ip=&coor=bd09ll&ak=&sn=", //使用百度地图
      params: {
        ak: "u3njbWWmt39e9Rx4b7eXTLk41C8HqZxW",
      },
    })
        .then(({data}) => {
          console.log("data", data.content.address);
          this.setAddress(data.content.address); //将获取到的定位存入homePage模块中
        })
        .catch((error) => {
          console.log(error);
        });
  },

  components: {
    shopMainPage,
  },
};
</script>

<style lang="scss" scoped>
img {
  display: block;
  width: 100%;
}

#app {
  .van-tabbar--fixed {
    height: 6vh;
    border-top: 0.1px solid rgba(100, 100, 100, 0.2);
  }

  .tab_item {
    height: 6vh;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    z-index: 3;
    .tab_item_box_img {
      width: 3vh;
      height: 3vh;

      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }

    .tab_item_box_text {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1vh;
    }
  }

  ::v-deep .van-tabbar-item__icon {
    // font-size: 3vh;
    right: -10px;
    top: 8px;
  }

  // .van-tabbar-item__text {
  //   font-size: 2vh;
  // }

  .slide-right-enter-active, //路由动画
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
  .slide-right-leave {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-leave {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  ::v-deep .van-popup {
    //弹出层样式
    background-color: transparent;
  }
}
</style>
