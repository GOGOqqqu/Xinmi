<template>
    <div class="timer">
        <div class="text">
            {{ state.year }}年已经过去了{{ (dayjs(state.now).dayOfYear() / 3.65).toFixed(0) + '%' }}
        </div>
        <div class="line">
            <van-circle v-model:current-rate="currentRate" :rate="(dayjs(state.now).dayOfYear() / 3.65).toFixed(0)"
                :speed="50" :text="text" size="50vmin" stroke-width="40" />
            <div class="num">{{ dayjs(state.now).dayOfYear() + '/' + 365 }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, onUpdated, ref, reactive, watch, watchEffect, onActivated, onDeactivated, computed } from "vue";
//import { 使用的函数名 } from '@vueuse/core'   //引入vueuse中的函数使用
import { useState } from "../../stores";  //引入pinia
import dayjs from "dayjs"   //引入day.js函数库
import dayOfYear from 'dayjs/plugin/dayOfYear'
dayjs.extend(dayOfYear)
// const props = defineProps<{  //父组件传来的数据
//     num: number,
//     arr: Array<number>
// }>()
//使用传来的值 props.arr

const state = useState()  //创建仓库实例 可直接调用pinia的方法修改state

// const changeName = () => {
//     state.changeName('小白')   //调用pinia的方法
// }

const currentRate = ref(0)   //环形进度条的初始值
const text = computed(() => currentRate.value.toFixed(0) + '%');

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
.timer {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    padding: 3vh 0;
    font-size: 5vmin;
    font-weight: 600;
    letter-spacing: 0.5vmin;

    .text {
        width: 100%;
        height: 6vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4vh 0;

    }

    .line {
        position: relative;

        .num {
            position: absolute;
            right: -6vmin;
            bottom: -3vmin;
            font-size: 4vmin;
            color: v-bind('state.LightColor');
            font-family: '弯曲';
            letter-spacing: 1vmin;
        }
    }

    :deep(.van-circle__text) {
        font-size: 6vmin;
    }
}
</style>