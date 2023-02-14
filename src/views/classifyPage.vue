<template>
  <div class="classifyPage">
    <div class="classifyPageHeader" @click="linkSearchPage">
      <searchBar />
    </div>
    <div class="classifyPageMain">
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item
          v-for="item in list"
          :key="item.cat_id"
          :title="item.cat_name"
        />
      </van-sidebar>
      <div class="showList">
        <showListHot v-show="activeKey == 0" :hot="hot" />
        <showList
          v-show="activeKey != 0"
          :list="elseList"
          :showType="activeKey"
        />
      </div>
    </div>
  </div>
</template>

<script>
import searchBar from "@/components/classifyPage/searchBar.vue"; //搜索栏组件
import showListHot from "@/components/classifyPage/showListHot.vue"; //热搜推荐列表组件组件
import showList from "@/components/classifyPage/showList.vue"; //其他列表组件组件

import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "classifyPage",
  data() {
    return {
      activeKey: 0,
      id: 0, //当前展示的大类的id
      isLoad: false,
      list: [], //用于遍历数据的数组
    };
  },
  computed: {
    ...mapState("playPage", ["duration", "playTime", "playState"]), //向vuex的playPage模块中的state取值

    hot() {
      //热销列表
      return this.list[0];
    },

    elseList() {
      //其他列表
      return this.list.slice(1);
    },
  },

  // created() {
  //   this.sendBookMain(); //请求书本主数据
  // },

  activated() {
    //路由激活时触发
    console.log("激活组件钩子");
  },

  created() {
    //创建时
    this.getData();
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
    ...mapMutations("playPage", ["PLAY", "set_list", "set_sylloge"]),
    ...mapMutations(["HideAppNavBar"]),
    onChange() {
      // console.log("当前切换到了第", index);
      // console.log("this.list", this.list[index].cat_id);
    },

    getData() {
      //获取数据
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
        url: `api/v3/categories/lists?source=2`,
      })
        .then(({ data }) => {
          console.log("this.list", data.results);
          this.list = data.results;
          this.$toast.clear(); //请求完成 关闭loading
        })
        .catch((error) => {
          console.log(error);
        });
    },

    linkSearchPage() {
      console.log("跳转搜索页");
      this.HideAppNavBar(); //隐藏底部导航栏
      this.$router.push({
        name: "searchPage",
      });
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
    searchBar,
    showListHot,
    showList,
  },
};
</script>

<style lang="scss">
.classifyPage {
  width: 100vw;
  height: 94vh;

  // background-color: aqua;

  .classifyPageHeader {
    width: 100vw;
    height: 7vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2vh 3vw 0;
  }

  .classifyPageMain {
    width: 100vw;
    height: 87vh;
    // background-color: chocolate;
    overflow: hidden;
    position: relative;

    .van-sidebar {
      width: 25vw;
      height: 100%;
      background-color: #f7f8fa;

      .van-sidebar-item {
        display: flex;
        justify-content: center;
      }

      .van-sidebar-item--select::before {
        background-color: #90cbf9;
        height: 60%;
      }
    }

    .showList {
      width: 75vw;
      height: 100%;
      // background-color: aquamarine;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0%;
      right: 0%;
      overflow: auto;
    }
  }
}
</style>
