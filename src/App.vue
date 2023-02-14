<script setup lang="ts">

// onMounted(() => {
//   console.log('app挂载完成');
// })
// onUnmounted(() => {
//   console.log('app卸载之后');
// })
// onUpdated(() => {
//   console.log('app数据发生了更新')
// })

</script>

<template>

  <!-- <keep-alive :include="['A', 'B']">
      <boxA :userList="userList" v-if="flag"></boxA>
      <boxB @getUser="getUser" v-else></boxB>
    </keep-alive> -->

  <router-view></router-view>
  <!-- 展示container组件 即主体部分 不包括其他弹窗类 在主体之上的页面 -->

</template>

<style lang="scss">
:root {
  //--van-tabbar-height: 6vh   //全局更改组件库样式的方法 不建议 建议在组件内使用:deep(组件库的类名){样式}
  --animate-delay: 0s
}

.mm {
  position: flex;
  right: 0px;
  top: 80px;
  height: 20px;
  background-color: red;
  width: 20px;
}
</style>
