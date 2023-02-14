<template>
    <div class="index">
        <van-popup v-model:show="showPopup" position="left" :close-on-popstate="true">
            <popup></popup>
        </van-popup>

        <header>
            <div class="button item" @click="switchPopup">
                <van-icon name="wap-nav" :color="state.color" size="6vw" />
            </div>
            <div class="date item">{{ state.now }}</div>
        </header>
        <main>
            <div class="main-title">{{ state.isDeathClock ? '死之钟' : '生之钟' }}</div>
            <div class="liveClock">
                <liveClock></liveClock>
            </div>
        </main>
        <transition enter-active-class="animate__animated animate__flipInY animate__delay-1s"
            leave-active-class="animate__animated animate__flipOutY">
            <footer v-if="state.isOnSetting">
                <van-popup v-model:show="showDatePopup" position="bottom" round lazy-render close-on-popstate>
                    <van-date-picker v-model="currentDate" title="选择日期" :min-date="minDate" :max-date="maxDate"
                        v-if="state.now != ''" @confirm="dateConfirm" @cancel="showDatePopup = false" />
                </van-popup>
                <van-popup v-model:show="showTimePopup" position="bottom" round lazy-render close-on-popstate>
                    <van-time-picker v-model="currentTime" title="选择时间" :columns-type="['hour', 'minute', 'second']"
                        @confirm="timeConfirm" @cancel="showTimePopup = false" />
                </van-popup>
                <van-popup v-model:show="showNumPopup" position="bottom" round lazy-render close-on-popstate>
                    <van-picker :columns="columnsNum" @cancel="showNumPopup = false" @confirm="numConfirm" />
                </van-popup>
                <div class="text">你的出生日期</div>
                <button_1 @switchDatePopup="switchDatePopup"></button_1>
                <div class="text">猜猜自己能活多少岁</div>
                <button_2 @switchNumPopup="switchNumPopup"></button_2>
                <button_confirm @button_confirm="buttonConfirm"></button_confirm>
            </footer>
            <footer v-else-if="!state.isDeathClock">
                <div class="text">你的年龄</div>
                <div class="text big">{{ state.age + '岁' }}</div>
                <div class="line"></div>
                <div class="text">
                    在这个世界上 , 你已经存在了
                </div>
                <div class="card van-haptics-feedback">
                    <div class="year item">
                        <div class="num">
                            <count-to :startVal="0" :endVal="state.timeStatistics.year" :duration="5000"></count-to>
                        </div>
                        <div class="title">年</div>
                    </div>
                    <div class="month item">
                        <div class="num">
                            <count-to :startVal="0" :endVal="state.timeStatistics.month" :duration="5000"></count-to>
                        </div>
                        <div class="title">月</div>
                    </div>
                    <div class="week item">
                        <div class="num">
                            <count-to :startVal="0" :endVal="state.timeStatistics.week" :duration="5000"></count-to>
                        </div>
                        <div class="title">周</div>
                    </div>
                </div>
                <div class="card van-haptics-feedback">
                    <div class="year item">
                        <div class="num">
                            <count-to :startVal="0" :endVal="state.timeStatistics.day" :duration="5000"></count-to>
                        </div>
                        <div class="title">天</div>
                    </div>
                    <div class="month item">
                        <div class="num">
                            <count-to :startVal="0" :endVal="state.timeStatistics.hour" :duration="5000"></count-to>
                        </div>
                        <div class="title">小时</div>
                    </div>
                    <div class="week item">
                        <div class="num">
                            <count-to :startVal="0" :endVal="state.timeStatistics.min" :duration="5000"></count-to>
                        </div>
                        <div class="title">分钟</div>
                    </div>
                </div>
            </footer>
            <footer v-else>
                <deathClock></deathClock>
            </footer>
        </transition>
        
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, onUpdated, ref, reactive, watch, watchEffect, onActivated, onDeactivated } from "vue";
import { useDateFormat } from '@vueuse/core'   //引入vueuse中的函数使用
import { useState } from "@/stores";  //引入pinia
import dayjs from "dayjs"  //引入day.js处理时间
import 'animate.css'   //引入animate.css动画库
import popup from '@/components/index/popup.vue';
import timer from '@/components/index/timer.vue';
import liveClock from '@/components/index/liveClock.vue';
import button_1 from '@/components/index/button_1.vue';
import button_2 from '@/components/index/button_2.vue';
import button_confirm from '@/components/index/button_confirm.vue';
import deathClock from '@/components/index/deathClock.vue';
import relativeTime from 'dayjs/plugin/relativeTime'; //引入day.js的额外库
import 'dayjs/locale/zh-cn'  //引入day.js的中文适配包
import { CountTo } from 'vue3-count-to';   //引入数字滚动

dayjs.extend(relativeTime); //并在day.js上挂载
dayjs.locale('zh-cn')  //挂载中文适配包




//console.log('setup执行了');

// const props = defineProps<{  //父组件传来的数据
//     num: number,
//     arr: Array<number>
// }>()
//使用传来的值 props.arr

const state = useState()  //创建仓库实例 可直接调用pinia的方法修改state


let showPopup = ref(false)   //是否展示左弹窗
const switchPopup = () => {  //切换弹窗
    showPopup.value = !showPopup.value
}

let timeButtonValue = ref('')

const showDatePopup = ref(false);   //是否弹出日期选择器
const switchDatePopup = () => {   //切换显示日期选择器
    showDatePopup.value = !showDatePopup.value;
};
const currentDate = ref();   //日期选择器当前选择的值
const minDate = ref(new Date(1900, 0, 1))  //日期选择器的最小值
const maxDate = ref()  //日期选择器的最大值
const dateConfirm = (e: any) => {   //点击了日期选择器的完成按钮
    timeButtonValue.value = e.selectedValues.join('-')
    let differYear = dayjs().diff(e.selectedValues.join('-'), 'year')  //比较当前时间与出生时间相差的年份 得到年龄
    state.setAge(differYear)
    switchDatePopup()  //关闭日期选择器
    switchTimePopup()  //打开时间选择器
}

const showTimePopup = ref(false);   //是否弹出时间选择器
const switchTimePopup = () => {   //切换显示时间选择器
    showTimePopup.value = !showTimePopup.value;
};
const currentTime = ref();   //日期选择器当前选择的值
const timeConfirm = (e: any) => {   //点击了时间选择器的完成按钮
    timeButtonValue.value = timeButtonValue.value + ' ' + e.selectedValues.join(':')
    switchTimePopup()  //关闭时间选择器
    state.setBirthTime(timeButtonValue.value)   //修改出生日期
}

const showNumPopup = ref(false);   //是否弹出数字选择器
const switchNumPopup = () => {   //切换显示数字选择器
    showNumPopup.value = !showNumPopup.value;
};
const columnsNum: Array<{ text: number, value: number }> = []  //数字选择器当前所选择的数字
for (let i = 1; i < 101; i++) {  //给选择器填充内容
    columnsNum.push({
        text: i,
        value: i
    })
}
const numConfirm = (e: any) => {
    state.setLifetime(e.selectedValues[0])
    switchNumPopup()  //关闭数字选择器
}

const buttonConfirm = () => {  //点击了确认按钮

    updateClock()   //更新统计时间
    state.switchIsOnSetting()  //关闭设置出生年龄以及预估寿命的面板 显示默认页
}

const updateClock = () => {   //更新统计的时间
    state.setTimeStatistics({  //更新生之钟 计算当下与预估寿命的差距
        year: dayjs(Date.now()).diff(state.birthTime, "year"),
        month: dayjs(Date.now()).diff(state.birthTime, "month"),
        week: dayjs(Date.now()).diff(state.birthTime, "week"),
        day: dayjs(Date.now()).diff(state.birthTime, "day"),
        hour: dayjs(Date.now()).diff(state.birthTime, "hour"),
        min: dayjs(Date.now()).diff(state.birthTime, "minute"),
    })

    state.setDiffTimeStatistics({ //更新死之钟 计算当下与预估寿命的差距
        year: dayjs(state.birthTime).add(state.lifetime, 'year').diff(state.now, 'year'),
        month: dayjs(state.birthTime).add(state.lifetime, 'year').diff(state.now, 'month'),
        day: dayjs(state.birthTime).add(state.lifetime, 'year').diff(state.now, 'day'),
        sec: dayjs(state.birthTime).add(state.lifetime, 'year').diff(state.now, 'second'),
    })
}



onMounted(() => {
    console.log('挂载完成');

    state.sewNow(useDateFormat(Date.now(), 'YYYY-MM-DD').value)

    console.log('今天周', dayjs().day())
    state.setWeek(dayjs().day()) // 获取星期几

    currentDate.value = [state.year, state.month, state.day]  //给日期选择器赋值

    maxDate.value = new Date(Number(state.year), Number(state.month) - 1, Number(state.day)) //给日期选择器赋值

    updateClock()  //更新统计的时间

})
onUnmounted(() => {
    //console.log('卸载之后');
})
onUpdated(() => {
    //console.log('数据发生了更新')
})

onActivated(() => {
    // console.log('主页组件激活')

})
onDeactivated(() => {
    // console.log('主页组件失活')
})

</script>

<style lang="scss" scoped>
.index {
    background: v-bind('state.bg');
    color: v-bind('state.color');
    position: relative;

    header {
        width: 100vw;
        height: 8vh;
        display: flex;
        // align-items: center;
        justify-content: space-between;
        position: sticky;
        left: 0;
        top: 0;
        background: v-bind('state.bg');

        .item {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            &.button {
                width: 16vw;
            }

            &.date {
                font-family: '弯曲';
                font-size: 6vw;
                letter-spacing: 0.8vmin;
                margin: 0 3vmin;
            }
        }
    }

    main {
        width: 100%;

        .main-title {
            padding-top: 1vh;
            width: 100%;
            letter-spacing: 1vmin;
            font-size: 4.5vmin;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .liveClock {
            width: 100%;
            height: 76vmin;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    footer {
        width: 100%;

        .text {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-bottom: 2vh;
            font-size: 4vmin;
            letter-spacing: 0.2vmin;

            &.big {
                font-size: 5vmin;
                font-weight: 600;
                letter-spacing: 0.5vmin;
            }
        }

        .line {
            width: 94%;
            margin: 2.5vh 3%;
            height: 0.1vmin;
            background: v-bind('state.LightColor');
            opacity: 0.5;
        }

        .card {
            width: 94%;
            margin-left: 3%;
            height: 12vh;
            background: v-bind('state.LightBg');
            border-radius: 2vmin;
            overflow: hidden;
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 2vh;
            box-shadow: inset 0 -3em 3em rgb(0 0 0 / 5%), 0 0 0 2px rgb(190 190 190 / 12%), 0.3em 0.3em 1em rgb(0 0 0 / 8%);


            .item {
                width: calc(100% / 3);
                height: 100%;
                display: flex;
                flex-wrap: wrap;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                .num {
                    margin-bottom: 1.5vmin;
                    font-size: 5vmin;
                    font-weight: 600;
                }
            }
        }
    }
}
</style>