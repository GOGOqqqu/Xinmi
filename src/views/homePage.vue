<template>
  <div class="homePage">
    <div class="homePageHeader">
      <div class="navigation">
        {{ address }}
        <span class="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-caret-down-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
            />
          </svg>
        </span>
      </div>
      <div class="header_icon">
        <div class="icon_service icon">
          <img src="@/assets/homePage/service.png" />
        </div>
        <div class="icon_message icon" @click="linkMessagePage">
          <img src="@/assets/homePage/message.png" />
        </div>
      </div>
    </div>
    <div class="homePageHeader_Sticky">
      <div class="searchBar_homePage">
        <searchBar />
      </div>
      <div class="navBar_homePage" v-if="navList">
        <!-- 标签页组件 -->
        <van-tabs
          v-model="active"
          color="#1e5b89"
          line-width="40"
          :animated="true"
          :swipeable="true"
          title-active-color="#000"
          title-inactive-color="#666"
          :swipe-threshold="4"
        >
          <van-tab
            v-for="item in navList"
            :key="item.cat_id"
            :title="item.cat_name"
          >
            <!-- 第二个 图片 -->
            <template v-if="item.cat_type !== `text`" #title>
              <!-- 当选项卡的类型非文本时 显示出图片 -->
              <div class="navBar_homePage_img">
                <img
                  :src="`https://img01.yimishiji.com/v1/img/${item.cat_name}.webp`"
                />
              </div>
            </template>

            <!-- 内容 1 -->
            <choiceness-module v-if="item.event_type === 'main'" />
            <!-- 内容2 -->
            <second-m v-else-if="item.event_type === 'event'" />
            <!-- 最后一页 -->
            <all-goods :catId="item.cat_id" v-else-if="item.event_type === 'all'"/>
            <!-- 其他内容 -->
            <general-module :catId="item.cat_id" v-else/>
            <!-- {{ item.cat_id }}-->
            <!-- {{ item.event_type }}-->
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import searchBar from "@/components/classifyPage/searchBar.vue"; //搜索栏组件

import { mapState } from "vuex";
import { mapMutations } from "vuex";
import ChoicenessModule from "@/components/homePage/choicenessModule.vue";
import SecondM from "@/components/homePage/secondM.vue";
import GeneralModule from "@/components/homePage/generalModule.vue";
import AllGoods from "@/components/homePage/allGoods";

export default {
  name: "homePage",
  data() {
    return {
      navList: [],
      active: 0,
    };
  },

  computed: {
    ...mapState("homePage", ["address"]), //向vuex的homePage模块中的state取值
  },

  created() {
    this.sendNavigation(); //获取导航信息
    this.sendNavItem(); //获取nav标签
    // this.sendShopData();
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
    ...mapMutations("homePage", ["setAddress", "setCity", "set_x", "set_y"]),
    ...mapMutations(["HideAppNavBar"]),

    sendNavigation() {
      //获取定位 使用百度地图
      this.$axios({
        method: "get",
        url: "map/location/ip?ip=&coor=bd09ll&ak=u3njbWWmt39e9Rx4b7eXTLk41C8HqZxW&sn=",
      })
        .then(({ data }) => {
          console.log("data", data.content.point);
          this.setAddress(data.content.address);
          this.setCity(data.content.address_detail.city);
          this.set_x(data.content.point.x);
          this.set_y(data.content.point.y);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    sendNavItem() {
      this.$axios({
        method: "get",
        url: "api/v3/categories/lists?source=1&longitude=113.270796&latitude=23.135312011187",
      })
        .then(({ data }) => {
          console.log("sendNavItem", data.results);
          this.navList = data.results;
          // this.navList = data.results.filter((item) => {
          //   return !(item.cat_type == "text" && item.cat_id == ""); //把无用的分类剔除 筛选无用数据
          // });
          // console.log("this.navList", this.navList);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    linkMessagePage() {
      this.HideAppNavBar();
      this.$router.push("/messagePage");
    },

    // sendShopData() {
    //   this.$axios({
    //     method: "get",
    //     url: "api/v3/apppages/layout",
    //   })
    //     .then(({ data }) => {
    //       console.log("sendShopData", data.results[0].rows);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },

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

  // 注册组件
  components: {
    AllGoods,
    searchBar,
    ChoicenessModule,
    SecondM,
    GeneralModule,
  },
};
</script>

<style lang="scss" scoped>
.homePage {
  width: 100vw;
  height: 94vh;
  position: relative;
  // background-color: aqua;

  .homePageHeader {
    //头部非粘性模块
    width: 100%;
    height: 5vh;
    // background-color: aqua;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 4vw;

    .navigation {
      //导航块
      height: 100%;
      font-size: 2vh;
      font-weight: bold;
      display: flex;
      align-items: center;

      .icon {
        height: 100%;
        aspect-ratio: 1/1; //保持宽高等比
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          width: 40%;
          height: 40%;
        }
      }
    }

    .header_icon {
      //右侧功能按钮
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .icon {
        height: 100%;
        aspect-ratio: 1/1; //保持宽高等比
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 50%;
          height: 50%;
          display: block;
        }
      }
    }
  }

  .homePageHeader_Sticky {
    //粘性定位的头部
    top: 20px;
    width: 100%;

    .searchBar_homePage {
      //顶部搜索栏
      padding: 0 2%;
      height: 6vh;
    }

    .navBar_homePage {
      width: 100%;

      ::v-deep .van-tab--active {
        font-size: 1.8vh;
        font-weight: 600;
      }
    }
  }

  .navBar_homePage_img {
    //nav图片
    height: 6vh;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      height: 70%;
      display: block;
    }
  }
}
</style>
