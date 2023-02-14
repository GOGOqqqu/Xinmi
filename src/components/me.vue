<template>
    <div class="me">
        <div class="button" @click="add">点我添加</div>
        <div class="box" ref="parent">
            <span class="item" v-for="i, index in arr" :key="index">{{ i }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, onUpdated, ref, reactive, watch, watchEffect } from "vue";
// import _ from 'lodash'
import { useState } from "../stores";
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import { appendFile } from "fs";
// import { useLastChanged } from '@vueuse/core'  //使用函数库vueuse的函数


let arr = reactive(['a', 'b', 'c', 'd'])

const add = () => {
    arr.push('e')
}

const [parent] = useAutoAnimate()


// const props = defineProps<{  //父组件传来的数据
//     num: number,
//     arr: Array<number>
// }>()
//使用传来的值 props.arr

const state = useState()  //仓库的使用
// const changeName = () => {
//     state.changeName('小白')
// }

onMounted(() => {
    // console.log('me页面挂载完成');
})
onUnmounted(() => {
    // console.log('me页面卸载之后');
})
onUpdated(() => {
    // console.log('me页面数据发生了更新')
})


</script>

<style lang="scss" scoped>
.me {
    font-size: 6vw;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    height: calc(100vh - 50px);
    width: 100vw;
    background: v-bind('state.bg');
    color: v-bind('state.color');

    .box {
        width: 100%;
        height: 60vh;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-content: flex-start;

        .item {
            width: 6vmin;
            height: 6vmin;
            border-radius: 2vmin;
            border: 1px solid cornflowerblue;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 1vh;
        }
    }
}
</style>
