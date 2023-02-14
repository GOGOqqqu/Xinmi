<template>
    <div class="text">每格都代表着一个月</div>
    <div class="text">剩下的格子消失殆尽之时,也是生命结束之日</div>
    <div class="box">
        <div class="item" v-for="i in state.timeStatistics.month"></div>
        <div class="item surplus" v-for="i in state.diffTimeStatistics.month"></div>
    </div>
    <div class="title">您的余生大约还剩下{{
    (state.diffTimeStatistics.day / (state.timeStatistics.day + state.diffTimeStatistics.day) * 100).toFixed(0) +
        '%'
    }}</div>
    <div class="progress">
        <van-progress
            :percentage="state.diffTimeStatistics.day / (state.timeStatistics.day + state.diffTimeStatistics.day) * 100"
            stroke-width="1vh" :show-pivot="false" color="#24ACD7 " />
    </div>
    <div class="title">{{ lastSec }}秒</div>
    <div class="title">{{ state.diffTimeStatistics.day }}天</div>
    <div class="title">{{ state.diffTimeStatistics.month }}月</div>
    <div class="title">{{ state.diffTimeStatistics.year }}年</div>
    <div class="title">在剩下的日子里,你大概可以</div>
    <div class="card" v-for="i in showRemainderTodo">
        <div class="name item">{{ i.title }}</div>
        <div class="num item"><span class="number">{{ (state.diffTimeStatistics.day * i.frequency).toFixed(0) }}</span>次
        </div>
    </div>
    <div class="card button" @click="linkSettingTodo"><span class="icon">+</span>新建</div>
    <div class="line"></div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, onUpdated, ref, reactive, watch, watchEffect, onActivated, onDeactivated } from "vue";
import { useIntervalFn } from '@vueuse/core'   //引入vueuse中的函数使用
import { useState } from "@/stores";  //引入pinia
import { useRouter } from "vue-router";  //引入
const router = useRouter()   //创建路由器实例
//console.log('setup执行了');

// const props = defineProps<{  //父组件传来的数据
//     num: number,
//     arr: Array<number>
// }>()
//使用传来的值 props.arr

const state = useState()  //创建仓库实例 可直接调用pinia的方法修改state

// const changeName = () => {
//     state.changeName('小白')   //调用pinia的方法
// }

const lastSec = ref(state.diffTimeStatistics.sec as number)

const { pause, resume, isActive } = useIntervalFn(() => {
    //逻辑内容
    lastSec.value--
}, 1000)

let showRemainderTodo = reactive(state.remainderTodo.filter(i =>
    i.show
))

const linkSettingTodo = () => {
    console.log('进入修改余生todo页面');
    router.push({
        name: 'settingTodo',
        query: {
            //传参只接受对象
        }
    })
}


onUnmounted(() => {
    //console.log('卸载之后');
    pause()  //保证卸载定时器
})



</script>

<style lang="scss" scoped>
.text {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.5vh;
    font-size: 3.2vmin;
    font-weight: 500;
    color: v-bind('state.LightColor');
    letter-spacing: 0.3vmin;
}

.box {
    width: 90%;
    margin: 2vh 5%;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;

    .item {
        width: 3.75vw;
        height: 3.75vw;
        border-right: 0.1vmin solid #1E2E9F;
        border-bottom: 0.1vmin solid #1E2E9F;
        border-collapse: collapse;
        background: v-bind('state.LightColor');
        box-sizing: border-box;

        &.surplus {
            //剩余的
            background: v-bind('state.LightBg');

        }
    }

}

.title {
    width: 100%;
    height: 3vh;
    display: flex;
    align-items: center;
    margin-left: 5%;
    font-size: 3.6vmin;
    letter-spacing: 0.2vmin;
    font-weight: 500;
    color: v-bind('state.color');
}

.progress {
    width: 90%;
    margin: 2vh 5%;
}

.card {
    width: 92%;
    margin: 1.2vh 4%;
    height: 7vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1vh 5vmin;
    background: v-bind('state.cardBg');
    border-radius: 2vmin;
    color: v-bind('state.color');

    .item {
        height: 100%;
        display: flex;
        align-items: center;

        .number {
            color: #F8375A;
            font-size: 5.5vmin;
            font-weight: 600;
            font-family: "弯曲";
            letter-spacing: 0.2vmin;
            margin: 0 1vmin;
            text-shadow: 5px 5px 2px rgb(255 255 225 / 10%);
        }


    }

    &.button {
        justify-content: center;
        letter-spacing: 0.1vmin;
        opacity: 0.8;

        .icon {
            font-size: 8vmin;
            margin-right: 1vmin;

        }
    }
}

.line {
    padding-bottom: 10vh
}
</style>