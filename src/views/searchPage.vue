<template>
  <div class="searchPage">
    <div class="searchPage_header">
      <div class="searchPage_header_input">
        <input type="text" :placeholder="placeholder" v-model.trim="text" />
        <div class="cancel" v-if="text != ''" @click="cancel">x</div>
      </div>
      <div class="searchPage_header_button" @click="goBack">取消</div>
    </div>
    <div class="searchPage_Main">
      <div class="searchPage_Main_default box" v-show="text == ``">
        <defaultPage @setPlaceholder="setPlaceholder" />
      </div>
      <div
        class="searchPage_Main_searchResult box"
        v-show="text !== `` && !isShowSearchMain"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div
            class="searchResult_item"
            v-for="i in list"
            :key="i.value"
            @click="searchStart(i.value)"
          >
            {{ i.value }}
          </div>
        </van-list>
      </div>
      <div
        class="searchPage_Main_searchMain box"
        v-show="text !== `` && isShowSearchMain"
      >
        <resultPage :result="result" />
      </div>
    </div>
  </div>
</template>

<script>
import defaultPage from "@/components/searchPage/defaultPage.vue"; //引入默认内容组件
import resultPage from "@/components/searchPage/resultPage.vue"; //引入默认内容组件

import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "searchPage",
  data() {
    return {
      placeholder: "",
      text: "",
      isShowSearchMain: false,
      list: [], //联想词列表
      loading: false,
      finished: false,
      result: "",
    };
  },

  watch: {
    text(n) {
      if (n == "") {
        this.isShowSearchMain = false;
        this.list = [];
      }
      if (this.isShowSearchMain || this.text == "") {
        return;
      }
      this.onLoad();
      this.isShowSearchMain = false;
    },
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
    ...mapMutations("searchPage", ["setSearchHistory", "addSearchHistory"]),

    goBack() {
      // console.log("点击了返回按钮");
      this.$router.go(-1);
      this.ShowAppNavBar(); //显示底部导航栏
      this.text = ""; //清空搜索栏
    },

    setPlaceholder(value) {
      this.placeholder = value;
    },

    onLoad() {
      this.loading = true;
      this.$axios({
        method: "get",
        url: `api/v3/products/search_keywords?platform=ANDROID&system_version=23&aaid=6e978207e5218d5ba332cec7b1b55953&sign=DB7C413A4D6B6D032687F3DA43D51334&access_token=03e32273466e40edbee9e7111a559f1879f35a85&suppress_response_code=true&longitude=113.270796&keyword=${this.text}&device_model=SM-G9550&latitude=23.135312011187&device_token=3a9d878bbe058d4cf6f6f3dfc689900f&channel=tencent`,
      })
        .then(({ data }) => {
          console.log("item", data.results);
          this.list = data.results;
          this.loading = false;
          this.finished = true;
          this.isShowSearchMain = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    searchStart(value) {
      //开始搜索
      this.text = value;
      this.isShowSearchMain = true;
      this.result = this.text;
      localStorage.searchHistory = JSON.stringify([
        this.result,
        ...(localStorage.searchHistory
          ? JSON.parse(localStorage.searchHistory)
          : []),
      ]);
      this.addSearchHistory(this.result);
    },

    cancel() {
      this.text = "";
    },

    // linkPlay() {
    //   this.$router.push("/playPage");
    //   this.$store.commit("setNavIndex", -1); //调用store的commit方法 直接调用mutations对state的数据进行修改 将app的nav隐藏
    // },
  },
  computed: {
    ...mapState("searchPage", ["isShowMain", "searchHistory"]), //向vuex的playPage模块中的state取值
  },
  mounted() {},

  components: {
    defaultPage,
    resultPage,
  },
};
</script>

<style lang="scss" scoped>
.searchPage {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  // background-color: aqua;

  .searchPage_header {
    height: 8vh;
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-bottom: 2px solid rgba($color: #000000, $alpha: 0.04);
    .searchPage_header_input {
      height: 60%;
      width: 80%;
      border-radius: 2vh;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f5f8fa;
      position: relative;
      .cancel {
        position: absolute;
        right: 5%;
        top: 16%;
        height: 56%;
        aspect-ratio: 1/1;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        color: #fefefe;
        background-color: #c7d3db;
        padding: 1px;
      }
      input {
        height: 100%;
        width: 100%;
        padding: 0 5%;
        font-size: 2vh;
        letter-spacing: 1px;
        color: #333;
        &::placeholder {
          color: rgba(102, 102, 102, 0.8);
          font-size: 1.6vh;
        }
      }
    }

    .searchPage_header_button {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #333;
      font-weight: 500;
      font-size: 1.6vh;
      width: 10%;
      height: 100%;
    }
  }

  .searchPage_Main {
    height: 92vh;
    width: 100%;
    // background-color: blue;

    .box {
      width: 100%;
      height: 100%;
      // background-color: cyan;
      overflow-x: hidden;
      overflow-y: auto;

      &.searchPage_Main_searchResult {
        width: 100%;

        .searchResult_item {
          width: 100%;
          height: 6vh;
          display: flex;
          align-items: center;
          color: #333;
          font-size: 1.6vh;
          border-bottom: 0.5px solid rgba(0, 0, 0, 0.05);
          font-weight: 500;
          padding: 0 4vw;
        }
      }

      &.searchPage_Main_searchMain {
        width: 100%;
      }
    }
  }
}
</style>
