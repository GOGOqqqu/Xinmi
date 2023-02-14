<template>
    <div class="shop">
        <div class="button" @click="getCode">点我获取验证码</div>
        <div class="input">
            <input type="text" v-model="value">
        </div>
        <div class="test" @click="getCode" v-html="test" v-if="test != ''"></div>
        <div class="button" @click="login">登录</div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, onUpdated, ref, reactive, watch, watchEffect, onActivated, onDeactivated } from "vue";
// import _ from 'lodash'
import { useState } from "../stores";
import api from "@/api";
// console.log('setup执行了');

// const props = defineProps<{  //父组件传来的数据
//     num: number,
//     arr: Array<number>
// }>()
//使用传来的值 props.arr

const state = useState()  //仓库的使用
// const changeName = () => {
//     state.changeName('小白')
// }

let test = ref('')
const getCode = async () => {
    let { data } = await api.day.getCode()
    test.value = data
}

let value = ref('')

const login = async () => {
    console.log('点击了登录');
    let { data } = await api.day.login(value.value)
    if (data.data.message == '验证码错误') {
        getCode()
    }
    console.log('data', data.data.message)
}

// onMounted(async () => {
//     console.log('挂载完成');

// })
// onUnmounted(() => {
//     console.log('卸载之后');
// })
// onUpdated(() => {
//     console.log('数据发生了更新')
// })

onActivated(() => {
    // console.log('组件激活')

})
onDeactivated(() => {
    // console.log('组件失活')
})

</script>

<style lang="scss" scoped>
.shop {
    font-size: 6vw;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: calc(100vh - 50px);
    width: 100vw;
    background: v-bind('state.bg');
    color: v-bind('state.color');
    flex-wrap: wrap;
    flex-direction: column;

    .input {
        width: 100%;
        height: 6vh;
        display: flex;
        align-items: center;
        justify-content: center;

        input {
            width: 90%;
            height: 100%;
            text-align: center;
        }
    }
}
</style>
