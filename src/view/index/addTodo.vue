<template>
    <van-config-provider :theme="state.dark ? 'dark' : 'light'">
        <Toast :text="'请填写事件内容'" :icon-name="'question-o'"></Toast>
        <van-popup v-model:show="isShowPicker" position="bottom" round>
            <div class="popup">
                <van-picker-group title="选择频率" :tabs="['次数', '频次']" @confirm="onConfirm" @cancel="onCancel">
                    <van-picker title="次数" :columns="columnsNum" :visible-option-num="8" />
                    <van-picker title="频次" :columns="columnsText" :visible-option-num="8" />
                </van-picker-group>
            </div>
        </van-popup>
    </van-config-provider>
    <div class="settingTodo">
        <header>
            <div class="button left" @click="goBack">
                <van-icon name="cross" size="3vh" />
            </div>
            <div class="button right" @click="save">
                保存
            </div>
            <div class="title">添加事件</div>
        </header>
        <main>
            <div class="item">
                <div class="title">事件名称</div>
                <div class="text">
                    <input type="text" placeholder="要做点什么呢" v-model="text" @input="textChange">
                </div>
            </div>
            <div class="item">
                <div class="title">事件频率</div>
                <div class="text" @click="isShowPicker = true">
                    <div class="button">{{ frequencyValue }}</div>
                    <div class="icon">
                        <van-icon name="arrow" size="" />
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, onUpdated, ref, reactive, watch, watchEffect, onActivated, onDeactivated, computed } from "vue";
//import { 使用的函数名 } from '@vueuse/core'   //引入vueuse中的函数使用
import { useState } from "@/stores";  //引入pinia
import { useRouter, useRoute } from "vue-router";  //引入
import Toast from '@/components/Toast.vue';

const router = useRouter()   //创建路由器实例
const route = useRoute()   //创建路由器实例

const state = useState()  //创建仓库实例 可直接调用pinia的方法修改state

// const changeName = () => {
//     state.changeName('小白')   //调用pinia的方法
// }

const goBack = () => {
    router.go(-1)  //前进后退
}

const checkedTodo = (index: number) => {
    console.log('index', index);
    state.remainderTodo[index].show = !state.remainderTodo[index].show
}

let text = ref('')
let frequencyValue = ref('1次/日')
let frequencyNum = 1
let frequencyName = '日'
const frequencyNameToNumber = computed(() => {
    if (frequencyName == '日') {
        return 1
    }
    else if (frequencyName == '周') {
        return 7
    }
    else if (frequencyName == '月') {
        return 30
    }
    else {
        return 365
    }
})


const textChange = () => {
    console.log('text', text.value);

}

let isShowPicker = ref(false)

const columnsNum: Array<{ text: number, value: number }> = []  //数字选择器当前所选择的数字
for (let i = 1; i < 101; i++) {  //给选择器填充内容
    columnsNum.push({
        text: i,
        value: i
    })
}

const columnsText = [
    {
        text: '日',
        value: '日'
    },
    {
        text: '周',
        value: '周'
    },
    {
        text: '月',
        value: '月'
    },
    {
        text: '年',
        value: '年'
    },
]  //频次选择器当前所选择的数字

const onConfirm = (e: any) => {
    isShowPicker.value = false
    console.log('e', e);
    frequencyValue.value = e[0].selectedValues + '次/' + e[1].selectedValues
    frequencyNum = e[0].selectedValues
    frequencyName = e[1].selectedValues
}

const onCancel = () => {
    isShowPicker.value = false
}

const save = () => {
    if (text.value == '') {
        state.isShowToast()  //弹出轻提示
        return
    }
    else if (route.query.todoIndex != undefined) {  //如果是通过点击已有的todo来到的此页面
        state.remainderTodo[route.query.todoIndex as any] = {
            title: text.value,
            frequency: frequencyNum / frequencyNameToNumber.value,
            show: true,
            frequencyName: frequencyName,
            num: frequencyNum
        }
    }
    else {
        state.remainderTodo.push({  //向todo数组导入新todo
            title: text.value,
            frequency: frequencyNum / frequencyNameToNumber.value,
            show: true,
            frequencyName: frequencyName,
            num: frequencyNum
        })
    }
    goBack()  //返回上一级

}

onMounted(() => {
    //console.log('挂载完成');
    console.log('route.query', route.query.todoIndex)
    if (route.query.todoIndex != undefined) {  //如果是修改已有的todo
        text.value = state.remainderTodo[route.query.todoIndex as any].title
        frequencyNum = state.remainderTodo[route.query.todoIndex as any].num
        frequencyName = state.remainderTodo[route.query.todoIndex as any].frequencyName
        frequencyValue.value = frequencyNum + '次/' + frequencyName
    }
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
.popup {
    width: 100vw;
    height: 52vh;
}

.settingTodo {
    width: 100vw;
    height: 100vh;
    background: v-bind('state.bg');
    color: v-bind('state.color');

    header {
        width: 100%;
        height: 8vh;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        font-size: 4.5vmin;
        font-weight: 550;
        letter-spacing: 0.1vmin;
        padding-bottom: 2vh;
        position: relative;
        box-shadow: 0 1vmin 100vh 30px rgb(255 255 255 / 20%);
     

        .button {
            height: 6vh;
            width: 6vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            bottom: 0;

            &.left {
                left: 1%;
            }

            &.right {
                right: 1%;
            }
        }
    }

    main {
        width: 100%;

        .item {
            width: 90%;
            margin: 3.2vh 5%;
            border-radius: 4vmin;
            background: v-bind('state.todoBg');
            box-shadow: 0 5px 3vmin 1vmin v-bind('state.bg');
            height: 8vh;
            display: flex;
            align-items: center;
            padding: 0 5vmin;
            position: relative;
            overflow: hidden;
            color: #fff;

            .text {
                position: absolute;
                height: 100%;
                width: 30vw;
                top: 0;
                right: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                letter-spacing: 0.2vmin;

                input {
                    height: 100%;
                    width: 100%;
                    text-align: center;

                    &::placeholder {
                        color: #f3f3f3;

                    }
                }
            }
        }
    }
}
</style>