<template>
    <div id="container">
        <router-view #default="{ route, Component }">
            <transition :enter-active-class="transitionName">
                <!-- //此处进入的动画类名可通过route.meta.transiton取到 -->
                <keep-alive>
                    <component :is="Component"></component>
                </keep-alive>
            </transition>
        </router-view>
        <!-- 展示主界面中的五个分页 -->
        <div class="nav">
            <van-config-provider :theme="state.dark ? 'dark' : 'light'">
                <van-tabbar v-model="active" @change="navChange">
                    <van-tabbar-item icon="underway-o" to="/">当下</van-tabbar-item>
                    <van-tabbar-item icon="description" to="/article">文章</van-tabbar-item>
                    <van-tabbar-item icon="sign" to="/planning">规划</van-tabbar-item>
                    <!-- <van-tabbar-item icon="shop-collect-o" to="/shop">商店</van-tabbar-item> -->
                    <!-- <van-tabbar-item icon="contact" to="/me">我的</van-tabbar-item> -->
                </van-tabbar>
            </van-config-provider>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";  //引入路由
import 'animate.css'  //引入animate动画库 用于路由动画
import { onMounted, onUnmounted, onUpdated, ref, reactive, watch, watchEffect } from "vue";
import { useState } from "../stores";   //引入pinia
import { useStateOne } from "../stores/one";  //引入one.ts

//创建路由器实例
const router = useRouter()   //创建路由器实例
const route = useRoute()   //创建路由器实例
const state = useState()  //创建pinia实例
const transitionName = ref('')  //路由动画名 根据不同路由层级判断
const active = ref(0);  //当前激活的底部导航栏
const states = useStateOne()  //创建one实例

watch(() => route.meta.hierarchy, (newVal: any, oldVal: any) => {  //监听路由元对象 判断路由层级的变化 从而做出不同的路由动画
    if (newVal > oldVal) {
        transitionName.value = 'animate__animated animate__fadeInRight animate__faster'
    }
    else {
        transitionName.value = 'animate__animated animate__fadeInLeft animate__faster'

    }
})

watch(() => route.path, (newVal, oldVal) => {  //监听路由变化 匹配底部导航栏的高亮位置 解决通过函数式切换路由时 底部导航栏高亮项不变的问题
    if (newVal == '/') {
        active.value = 0
    }
    else if (newVal == '/article') {
        active.value = 1
    }
    else if (newVal == '/planning') {
        active.value = 2
    }
    else if (newVal == '/shop') {
        active.value = 3
    }
    else if (newVal == '/me') {
        active.value = 4
    }
})


const navChange = (active: number | string) => {   //点击标签栏触发
    console.log('active', active)
}


// const props = defineProps<{  //父组件传来的数据
//     num: number,
//     arr: Array<number>
// }>()
//使用传来的值 props.arr

// const changeName = () => {
//     state.changeName('小白')
// }

onMounted(() => {
    console.log('container挂载完成');
    console.log('route', route.path)  //打印出当前的路径
})
onUnmounted(() => {
    // console.log('container卸载之后');
})
onUpdated(() => {
    // console.log('container数据发生了更新')
})

</script>

<style lang="scss">
#container {
    width: 100vw;
    height: 100vh;
    overflow-x: hidden; //不加溢出隐藏 路由动画会撑大整个屏幕一瞬间
    overflow-y: auto;
    background: v-bind('state.bg');
    color: v-bind('state.color');

    .nav {
        width: 100%;
    }


}

.animate__animated {
    animation-delay: 0s;
}
</style>
