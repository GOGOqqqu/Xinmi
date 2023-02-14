<template>
  <div class="choicenessPage">

  </div>
</template>

<script>
// import bookComment from "@/components/bookMain/bookComment.vue"; //引入评论组件

import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "choicenessPage",
  data() {
    return {};
  },

  // created() {
  //   this.sendBookMain(); //请求书本主数据
  // },

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
    ...mapMutations("playPage", ["PLAY", "set_list", "set_sylloge"]),

    // goBack() {
    //   // console.log("点击了返回按钮");
    //   this.$router.go(-1);
    // },

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

<style lang="scss">
.choicenessPage {
  width: 100vw;
  height: 94vh;

  background-color: aqua;
}
</style>
