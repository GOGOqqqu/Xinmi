<template>
    <div class="button" @click="switchNumPopup">{{ state.lifetime }}</div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, onUpdated, ref, reactive, watch, watchEffect, onActivated, onDeactivated } from "vue";
//import { 使用的函数名 } from '@vueuse/core'   //引入vueuse中的函数使用
import { useState } from "@/stores";  //引入pinia
const state = useState()  //创建仓库实例 可直接调用pinia的方法修改state

//console.log('setup执行了');

// const props = defineProps<{  //父组件传来的数据
//     num: number,
//     arr: Array<number>
// }>()
//使用传来的值 props.arr


// const changeName = () => {
//     state.changeName('小白')   //调用pinia的方法
// }



const emit = defineEmits<{   //子传父
    (e: 'switchNumPopup'): void
    // (e: '事件名', 传的数据名: 类型): void  //没有返回值
}>()

const switchNumPopup = () => {  //点击事件 测试子传父
    emit('switchNumPopup')
}






</script>

<style lang="scss" scoped>
.button {
    padding: 15px 25px;
    border: unset;
    border-radius: 20vmin;
    color: v-bind('state.LightColor');
    z-index: 1;
    background: v-bind('state.LightBg');
    position: relative;
    font-weight: 200;
    font-size: 5vmin;
    -webkit-box-shadow: 4px 8px 19px -3px rgb(0 0 0 / 27%);
    box-shadow: 4px 8px 19px -3px rgb(0 0 0 / 20%);
    transition: all 250ms;
    overflow: hidden;
    width: 72vw;
    margin-left: 14vw;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "弯曲";
    letter-spacing: 0.8vmin;
    margin-bottom: 6vh;
}

.button::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    border-radius: 15px;
    background-image: linear-gradient(-225deg, #FF3CAC 0%, #562B7C 52%, #2B86C5 100%);
    z-index: -1;
    -webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
    box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
    transition: all 250ms
}

.button:hover {
    color: #e8e8e8;

}

.button:hover::before {
    width: 100%;
}
</style>