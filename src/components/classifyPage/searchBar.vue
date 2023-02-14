<template>
  <div class="searchBar">
    <div class="searchBarInput">
      <div class="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
          />
        </svg>
      </div>
      <div class="textSwipe" v-if="list !== ['']">
        <div
          class="swipe"
          :class="{ canSwipe: can }"
          :style="{
            height: `${100 * swipeList.length + '%'}`,
            transform: `translate(0, ${swipeTop}%)`,
          }"
          @transitionend="transitionEndHandel"
        >
          <div
            class="SwipeItem van-ellipsis"
            v-for="(item, index) in swipeList"
            :key="index"
            :style="{
              height: `${100 / swipeList.length + '%'}`,
            }"
          >
            {{ item.value }}
          </div>
        </div>
      </div>
      <div class="button">搜索</div>
    </div>
  </div>
</template>

<script>
// import homeBookList from "@/components/homePage/homeBook/homeBookList.vue";

import { mapState } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "searchBar",
  props: {
    // swipe: { type: Array, requited: true },
  },

  created() {
    this.getText(); //请求轮播文本
  },

  watch: {},

  mounted() {
    //数据挂载完毕后
  },

  computed: {
    ...mapState("playPage", ["duration", "playTime", "playState"]), //向vuex的playPage模块中的state取值
    ...mapGetters("playPage", ["songDuration", "songNowTime"]),

    swipeList() {
      //遍历用的数组
      return [...this.list, this.list[0]];
    },
  },

  data() {
    return {
      swipeTop: 0, //当前偏移
      can: true, //是否过渡
      run: true, //该组件是否未被销毁
      list: [""], //用于遍历的数组 并且当内容不存在时 不渲染轮播文本
    };
  },

  methods: {
    swipeRun() {
      console.log("定时器触发");
      // console.log("this.list", this.list);
      let i = this.list.length + 1;
      // console.log("i", i);
      let timer = setInterval(() => {
        this.swipeTop -= 100 / i;
        if (this.swipeTop > -((100 / i) * (i - 1))) {
          //判断是否应该进行过渡
          this.can = true;
        }
        // console.log("this.swipeTop", this.swipeTop);
        if (!this.run) {
          //判断该组件是否已被销毁
          timer = null;
        }
      }, 1500);
      if (timer) {
        //若存在定时器 则return
        return;
      }
    },
    transitionEndHandel() {
      //过渡结束事件
      let i = this.list.length + 1;
      if (this.swipeTop <= -((100 / i) * (i - 1))) {
        this.can = false;
        this.swipeTop = 0;
      }
    },

    getText() {
      //获取轮播文本
      this.$axios({
        method: "get",
        url: "api/v3/apppages/layout?access_token&page_type=search_keywords",
      })
        .then(({ data }) => {
          console.log("data", data.results[0].rows[0].elements);
          this.list = data.results[0].rows[0].elements;
          this.swipeRun(); //启动轮播图  //请求完成之后 再开定时器
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  beforeDestory() {
    //销毁前生命周期
    this.run = false; //销毁前删除定时器
  },

  components: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss">
.searchBar {
  //根据该组件外包裹的盒子大小进行适应
  width: 100%;
  height: 100%;
  // background-color: aqua;
  display: flex;
  align-items: center;
  justify-content: center;

  .searchBarInput {
    width: 100%;
    height: 70%;
    border: 1px solid #29638f;
    border-radius: 4vw;
    padding: 0 0 0 4%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    .icon {
      //搜索图标
      display: flex;
      align-items: center;
      justify-content: center;
      aspect-ratio: 1/1; //css3属性 宽高一致
      height: 70%;

      svg {
        width: 100%;
        height: 100%;
        color: #565454;
      }
    }

    .textSwipe {
      //文字轮播
      position: absolute;
      width: 60%;
      height: 100%;
      top: 0%;
      left: 14%;
      // background-color: chartreuse;
      overflow: hidden;
      pointer-events: none; //能看到但是摸不到

      .swipe {
        width: 100%;
        // height: 500%;

        &.canSwipe {
          transition: all 0.5s;
        }

        .SwipeItem {
          width: 100%;
          // height: 20%;
          display: flex;
          align-items: center;
          // justify-content: center;
          // background-color: black;
          color: #666;
          font-size: 3vw;
          font-weight: 200;
        }
      }
    }

    .button {
      //搜索按钮
      width: 15%;
      height: 100%;
      color: #fff;
      background-color: #29638f;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1vh;
      font-weight: 200;
      border-radius: 24px;
    }
  }
}
</style>
