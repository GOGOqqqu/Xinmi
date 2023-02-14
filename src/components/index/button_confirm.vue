<template>
    <div class="button" @click="button_confirm">看看未来</div>
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
    (e: 'button_confirm'): void
    // (e: '事件名', 传的数据名: 类型): void  //没有返回值
}>()

const button_confirm = () => {  //点击事件 测试子传父
    emit('button_confirm')
}



</script>

<style lang="scss" scoped>
.button {
    font-size: 18px;
    letter-spacing: 2px;
    text-transform: uppercase;
    display: inline-block;
    text-align: center;
    font-weight: bold;
    padding: 0.7em 2em;
    border: 3px solid #FF0072;
    border-radius: 2px;
    position: relative;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.1);
    color: #FF0072;
    text-decoration: none;
    transition: 0.3s ease all;
    z-index: 1;
    width: 72vw;
    margin-left: 14vw;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.8vmin;
    border-radius: 20vmin;
}

.button:before {
    transition: 0.5s all ease;
    position: absolute;
    top: 0;
    left: 50%;
    right: 50%;
    bottom: 0;
    opacity: 0;
    content: '';
    background-color: #FF0072;
    z-index: -1;
    border-radius: 20vmin;

}

.button:hover,
.button:focus {
    color: white;
}

.button:hover:before,
.button:focus:before {
    transition: 0.5s all ease;
    left: -1vmin;
    right: -1vmin;
    opacity: 1;
}

.button:active {
    transform: scale(0.9);
}
</style>