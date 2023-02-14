<template>

    <div class="clock">
        <div class="sec time"></div>
        <div class="min time"></div>
        <div class="hour time"></div>
    </div>

</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, onUpdated, ref, reactive, watch, watchEffect, onActivated, onDeactivated, computed } from "vue";
import { useIntervalFn } from '@vueuse/core'   //引入vueUse中的函数使用
import { useState } from "@/stores";  //引入仓库
import dayjs from "dayjs"   //引入day.js函数库
const state = useState()  //创建仓库实例 可直接调用仓库的方法修改state


const { pause, resume, isActive } = useIntervalFn(() => {   //调用vueUse的函数 开启计时 同步现在的时间仓库
    state.setSec(dayjs().second())   //设置秒
    state.setMin(dayjs().minute())  //设置分
    state.setHour(dayjs().hour())  //设置时
}, 1000)


//console.log('setup执行了');

// const props = defineProps<{  //父组件传来的数据
//     num: number,
//     arr: Array<number>
// }>()
//使用传来的值 props.arr



onMounted(() => {
    //console.log('挂载完成');

})
onUnmounted(() => {
    //console.log('卸载之后');
})
onUpdated(() => {
    //console.log('数据发生了更新')
})

onActivated(() => {
    // console.log('组件激活')

})
onDeactivated(() => {
    // console.log('组件失活')
})

</script>

<style lang="scss" scoped>
.clock {
    width: 64vmin;
    height: 64vmin;
    border: 0.5vmin solid v-bind('state.color');
    border-radius: 50%;
    position: relative;

    .time {
        width: 0.5vmin;
        background-color: v-bind('state.color');
        position: absolute;
        right: 50%;
        bottom: 50%;
        transform-origin: bottom;
        transition: all 0.5s;

        &.sec {
            height: 28vmin;
            transform: rotate(v-bind('state.secDeg'));
            background-color: #fc011a;
        }

        &.min {
            height: 22vmin;
            transform: rotate(v-bind('state.minDeg'));

        }

        &.hour {
            height: 16vmin;
            transform: rotate(v-bind('state.hourDeg'));

        }
    }
}
</style>