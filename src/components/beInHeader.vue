<template>
  <div class="beInHeader">
    {{ title }}
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
</template>

<script>
// 这里可以导入其他文件 例如：组件、工具js、第三方插件js,json文件、图片文件等
// eg: import 《组件名称》 from '《文件路径》'
import { mapMutations } from "vuex";

export default {
  // import 引入的组件需要注入到对象中才能使用

  name: "beInHeader",
  components: {},
  props: {
    // 商品信息
    title: String,
    isShowNav: Boolean,
  },
  // 这里用于存放数据
  data() {
    return {};
  },
  //  计算属性 类似于data概念
  computed: {},
  //  监控data 中数据变化
  watch: {},
  //  方法集合
  methods: {
    ...mapMutations(["ShowAppNavBar"]),

    // 点击 + 事件
    goBack() {
      if (this.isShowNav) {
        this.$router.go(-1);
        this.ShowAppNavBar(); //显示底部导航栏
        console.log("返回上一级");
      } else {
        this.$router.go(-1);
        console.log("返回上一级");
      }
    },
  },
  //  生命周期 -创建完成（可以访问当前this 实例）
  created() {},
  //  生命周期 - 挂载完成（可以访问Dom元素）
  mounted() {},
  //  生命周期 - 创建之前
  beforeCreate() {},
  //  生命周期 - 挂载之前
  beforeMount() {},
  //  生命周期 - 更新之前
  beforeUpdate() {},
  //  生命周期 - 更新之后
  updated() {},
  //  生命周期 - 销毁之前
  beforeDestroy() {},
  //  生命周期 - 销毁完成
  destroyed() {},
  // 如果页面有keep-alive 缓存功能，这个函数会触发
  activated() {},
};
</script>

<style lang="scss" scoped>
.beInHeader {
  width: 100%;
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2vh;
  font-weight: 600;
  color: #000;
  position: sticky;
  background-color: #fff;
  left: 0;
  top: 0;
  padding-top: 2vh;
  z-index: 9;
  border-bottom: 0.5px solid rgba($color: #000000, $alpha: 0.05);
  box-shadow: 0 0 40px 4px rgba($color: #000000, $alpha: 0.05);
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
</style>
