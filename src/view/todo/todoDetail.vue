<template>

    <div class="todoDetail">
        <header>

            <div class="quit" @click="$router.back">
                <svg t="1673476744234" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="1361" width="30" height="30">
                    <path
                        d="M521.28 918.72L160 557.44c-24.96-24.96-24.96-65.6 0-90.56l361.28-361.6L566.4 150.4 205.12 511.68 566.4 872.96l-45.12 45.12z"
                        fill="#ffffff" p-id="1362"></path>
                    <path d="M192 480h704v64H192z" fill="#ffffff" p-id="1363"></path>
                </svg>
            </div>

            <div class="title">
                目标详情
            </div>
        </header>
        <main>
            <!-- 目标 -->
            <div class="target">
                <div class="title">
                    {{ showData.inventory }}
                </div>

                <!-- 主要内容 -->
                <div class="target_content">
                    <van-checkbox v-model="showData.state" @click="clickTarget"></van-checkbox>
                    <span> {{ showData.content }}</span>
                </div>

                <!-- 子目标 -->
                <div class="target_child_list" v-if="showData.children.length != 0">
                    <div class="target_child" v-for="e in showData.children">
                        <van-checkbox v-model="e.state" @click="clickChild"></van-checkbox>
                        <span>{{ e.content }}</span>
                    </div>
                </div>
            </div>
            <!-- 进度 -->
            <div class="schedule">
                <div class="title">进度</div>
                <div class="circle">
                    <van-circle v-model:current-rate="currentRate" :rate="targetProgress" :speed="100" :text="text"
                        color="#03a9f5" layer-color="#eeeeee" />
                    <div class="text">子任务</div>
                </div>
            </div>
            <!-- 其他信息 -->
            <div class="other">
                <div> <van-icon name="star" size="25" /> <span>事项状态: {{ showData.state ? "已完成" : "尚未完成" }}</span></div>
                <div> <van-icon name="fire" size="25" /> <span>事项等级: {{ grade[showData.grade] }}</span></div>
                <div> <van-icon name="underway" size="25" /> <span>创建日期: {{ showData.creationDate }}</span></div>
                <div> <van-icon name="underway-o" size="25" /> <span>创建时间: {{ showData.creationTime }}</span></div>
            </div>
        </main>
    </div>

</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, onUnmounted, onUpdated, ref, reactive, watch, watchEffect, computed } from "vue";
import { useState } from "@/stores";
import { userTodo } from '@/stores/todo'
import { useRouter, useRoute } from "vue-router";
import { todoType } from '@/utils/Type'

const state = useState()
const piniaTodo = userTodo()
const router = useRouter()   //创建路由器实例
const route = useRoute()   //创建路由器实例

let showData: todoType = reactive({
    id: '',
    inventory: '默认',
    content: '',
    remark: '',
    creationDate: '',
    creationTime: '',
    state: false,
    grade: 0,
    children: []
})
const grade = ['无优先级', '低优先级', '中优先级', '高优先级',]


const currentRate = ref(0);
let targetProgress = ref(0)
const text = computed(() => currentRate.value.toFixed(0) + '%');

const gainPercentage = () => {
    console.log('看看百分比',)
    let allNum = showData.children.length
    let num = 0
    showData.children.map(t => {
        if (t.state == true) {
            num++
        }
    })
    targetProgress.value = (num / allNum) * 100
}


// 点击主要内容复选框
const clickTarget = () => {
    if (showData.state == true) {
        showData.children.map(t => {
            t.state = true
        })
    } else {
        showData.children.map(t => {
            t.state = false
        })
    }
    gainPercentage()
}

// 点击子目标复选框
const clickChild = () => {
    console.log('调用clickChild',)
    let num = 0
    showData.children.map(t => {
        if (t.state == true) {
            num++
        }
    })
    gainPercentage()
    console.log('看看数字', num, showData.children.length)
    if (num == showData.children.length) {
        showData.state = true
    } else {
        showData.state = false
        return
    }
}



onBeforeMount(() => {
    console.log('组件挂载之前')
    piniaTodo.todoList.map(t => {
        if (t.id == route.query.id) {
            showData = t
        }
    })

    console.log('showData', showData)
})

onMounted(() => {
    console.log('挂载完成');
    gainPercentage()
})
onUnmounted(() => {
    console.log('卸载之后');
})
onUpdated(() => {
    console.log('数据发生了更新', showData)
})



</script>

<style lang="scss" scoped>
$bg: v-bind('state.bg');
$font: v-bind('state.color');
$todo_header: v-bind('state.todo_header');

.todoDetail {
    height: 100vh;
    width: 100vw;

    header {
        width: 100vw;
        height: 6vh;
        background-color: $todo_header;
        color: white;
        display: flex;
        align-items: center;

        .quit {
            margin-left: 2vw;
        }

        .title {
            font-size: 25px;
            margin-left: 4vw;
        }
    }

    main {

        .target {
            padding: 3vh 5vw;
            color: v-bind("state.color");

            .title {
                color: #03a9f5;
                margin-bottom: 3vh;
            }

            .target_content {
                display: flex;
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 3vh;

                span {
                    margin-left: 3vw;
                }
            }

            .target_child_list {

                .target_child {
                    display: flex;
                    margin-bottom: 3vh;

                    span {
                        margin-left: 3vw;
                    }
                }
            }
        }

        .schedule {
            width: 92vw;
            padding: 2vh 4vw;
            background-color: #f8f8f8;
            margin: 0 auto;
            border-radius: 8px;

            .title {
                font-weight: bold;
            }

            .circle {
                width: 100%;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;

                :deep(.van-circle__text) {
                    color: #03a9f5;
                }

                .text {
                    margin-top: 1vh;
                    color: #999;
                }
            }
        }

        .other {
            color: #999;

            &>div {
                width: 92vw;
                margin: 4vh auto;
                display: flex;
                align-items: center;

                span {
                    margin-left: 3vw;
                }
            }
        }
    }
}
</style>
