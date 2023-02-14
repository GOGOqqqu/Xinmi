<template>
    <div class="planning">

        <header>
            <div class="title">清单</div>

            <!-- 清单 -->
            <div class="inventory-icon" @click="showPopup">
                <svg t="1673650044365" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="2765" width="32" height="32">
                    <path
                        d="M515 1c-33.1 0-60 26.9-60 60v95c0 33.1 26.9 60 60 60s60-26.9 60-60V61c0-33.1-26.9-60-60-60zM289 1c-33.1 0-60 26.9-60 60v95c0 33.1 26.9 60 60 60s60-26.9 60-60V61c0-33.1-26.9-60-60-60zM741 1c-33.1 0-60 26.9-60 60v95c0 33.1 26.9 60 60 60s60-26.9 60-60V61c0-33.1-26.9-60-60-60zM640 622H475c-22.1 0-40-17.9-40-40s17.9-40 40-40h165c22.1 0 40 17.9 40 40s-17.9 40-40 40zM760 820H475c-22.1 0-40-17.9-40-40s17.9-40 40-40h285c22.1 0 40 17.9 40 40s-17.9 40-40 40zM760 430H475c-22.1 0-40-17.9-40-40s17.9-40 40-40h285c22.1 0 40 17.9 40 40s-17.9 40-40 40z"
                        fill="#ffffff" p-id="2766"></path>
                    <path
                        d="M861 147v797H169V147h692m20-80H149c-33.1 0-60 26.9-60 60v837c0 33.1 26.9 60 60 60h732c33.1 0 60-26.9 60-60V127c0-33.1-26.9-60-60-60z"
                        fill="#ffffff" p-id="2767"></path>
                    <path
                        d="M302.8 319.7c-3 0-6.1 1.6-7.6 4.8l-14.3 29c-1.2 2.5-3.6 4.3-6.4 4.7l-32 4.6c-7 1-9.8 9.6-4.7 14.5l23.1 22.6c2 2 2.9 4.8 2.5 7.5l-5.5 31.8c-0.9 5.5 3.4 10 8.4 10 1.3 0 2.7-0.3 4-1l28.6-15c1.2-0.7 2.6-1 4-1s2.7 0.3 4 1l28.6 15c1.3 0.7 2.7 1 4 1 5 0 9.3-4.5 8.4-10l-5.5-31.8c-0.5-2.8 0.4-5.6 2.5-7.5l23.1-22.6c5.1-4.9 2.3-13.5-4.7-14.5l-32-4.6c-2.8-0.4-5.2-2.1-6.4-4.7l-14.3-29c-1.7-3.2-4.7-4.8-7.8-4.8zM302.8 509.7c-3 0-6.1 1.6-7.6 4.8l-14.3 29c-1.2 2.5-3.6 4.3-6.4 4.7l-32 4.6c-7 1-9.8 9.6-4.7 14.5l23.1 22.6c2 2 2.9 4.8 2.5 7.5l-5.5 31.8c-0.9 5.5 3.4 10 8.4 10 1.3 0 2.7-0.3 4-1l28.6-15c1.2-0.7 2.6-1 4-1s2.7 0.3 4 1l28.6 15c1.3 0.7 2.7 1 4 1 5 0 9.3-4.5 8.4-10l-5.5-31.8c-0.5-2.8 0.4-5.6 2.5-7.5l23.1-22.6c5.1-4.9 2.3-13.5-4.7-14.5l-32-4.6c-2.8-0.4-5.2-2.1-6.4-4.7l-14.3-29c-1.7-3.2-4.7-4.8-7.8-4.8zM302.8 699.7c-3 0-6.1 1.6-7.6 4.8l-14.3 29c-1.2 2.5-3.6 4.3-6.4 4.7l-32 4.6c-7 1-9.8 9.6-4.7 14.5l23.1 22.6c2 2 2.9 4.8 2.5 7.5l-5.5 31.8c-0.9 5.5 3.4 10 8.4 10 1.3 0 2.7-0.3 4-1l28.6-15c1.2-0.7 2.6-1 4-1s2.7 0.3 4 1l28.6 15c1.3 0.7 2.7 1 4 1 5 0 9.3-4.5 8.4-10l-5.5-31.8c-0.5-2.8 0.4-5.6 2.5-7.5l23.1-22.6c5.1-4.9 2.3-13.5-4.7-14.5l-32-4.6c-2.8-0.4-5.2-2.1-6.4-4.7l-14.3-29c-1.7-3.2-4.7-4.8-7.8-4.8z"
                        fill="#ffffff" p-id="2768"></path>
                </svg>
            </div>

        </header>

        <!-- <div class="popupInventories"> -->
        <van-popup v-model:show="popupInventories" round position="bottom" :style="{}">
            <div class="btn_list">
                <div class="title">清单</div>
                <div class="new_inventory" @click="popupShow = true">
                    <van-icon name="plus" />
                    <span>
                        新建清单
                    </span>
                </div>
                <div class="inventory_list" ref="inventory_list">
                    <div class="inventory_box" v-for="e in piniaTodo.Inventories" :key="e">
                        <span>{{ e }}</span>
                        <van-button type="warning" size="small" @click="deleteInventory(e)">删除</van-button>
                    </div>
                </div>

            </div>
        </van-popup>
        <!-- </div> -->

        <!-- 添加清单弹窗 -->
        <van-popup v-model:show="popupShow" round :style="{ padding: '64px' }">
            <div class="group">
                <input required type="text" class="input" v-model="inpInventory">
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>清单名</label>
            </div>
            <van-button round type="success" color="#03a9f3" @click="addInventory">确定</van-button>
        </van-popup>

        <nav>
            <!-- 标签栏 -->
            <van-tabs v-model:active="selectInventories" @click-tab="onClickTab">
                <van-tab :name="item" :title=item v-for="item in inventories" :key="item"></van-tab>
            </van-tabs>
        </nav>

        <main>
            <!-- 时间卡片 -->
            <div class="date_card">

                <div class="data_time">
                    {{ state.now }} - {{ state.weekC }}
                </div>

                <div class="target_num">
                    该清单已经完成{{ accomplishNum }}个待办事项 (共{{ displayNum }}个)
                </div>

                <van-progress :percentage="percentage" :show-pivot="false" color="#ffffffB3" track-color="#0000001a" />

            </div>

            <!-- todo列表 -->
            <div class="todo_list" ref="parent">
                <template v-auto-animate v-for="item in piniaTodo.todoList" :key="item.id">
                    <div class="todo_item" v-if="!item.state" v-show="selectInventories == item.inventory">
                        <todoItem :sendData="item"></todoItem>
                    </div>
                </template>
            </div>

        </main>

        <div class="add_btn" @click="$router.push('/addTodoDail')">
            <van-icon name="plus" size="10vw" />
        </div>


    </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, onUpdated, ref, reactive, watch, watchEffect, computed, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useState } from "@/stores";
import { userTodo } from '@/stores/todo'
// import { todo } from "@/api/todo"  //引入apiheader
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import todoItem from '@/components/planning/todoItem.vue' // todo小组件
import { todoType } from '@/utils/Type'

const state = useState()//创建仓库实例 可直接调用pinia的方法修改state
const piniaTodo = userTodo()
const router = useRouter()   //创建路由器实例
const route = useRoute()   //创建路由器实例

// 变量 ===================================== 变量

const selectInventories = ref('默认'); // 被选中的清单
let inventories: Array<string> = reactive([]) // 清单arr
const [parent] = useAutoAnimate() // 动画
const [inventory_list] = useAutoAnimate() // 动画
let showTodo: todoType[] = [] // 展示的todo
const accomplishNum = ref(0) // 该清单任务完成数
const displayNum = ref(0) // 该清单任务总数

const popupInventories = ref(false);
let popupShow = ref(false); // 弹出层popup 开关
let inpInventory = '' // v-model 新清单的名字

const percentage = computed(() => { // 清单任务完成数 / 清单任务总数 => 百分比
    return (accomplishNum.value / displayNum.value) * 100
})

// 方法 =================================== 方法

const showPopup = () => {
    popupInventories.value = true
}

// 添加一个清单tag
const addInventory = () => {
    if (inpInventory == '') {
        return
    }
    piniaTodo.Inventories.push(inpInventory)
    inpInventory = ''
    popupShow.value = false
}

// 删除一个清单项
const deleteInventory = (val: string) => {
    let index = piniaTodo.Inventories.findIndex(t => {
        return t == val
    })
    piniaTodo.Inventories.splice(index, 1)
}

const onClickTab = (val: object) => {
    console.log('val', val)
    console.log('selectInventories', selectInventories)
}

const target = () => {
    displayNum.value = showTodo.length
    accomplishNum.value = 0
    showTodo.map(t => {
        // console.log('t.inventory != val', t.inventory != val, t, t.inventory, val)
        if (t.state == true) {
            accomplishNum.value++
        }
    })
}

watch(selectInventories, (newVal) => {
    showTodo = []
    piniaTodo.todoList.map(t => {
        if (t.inventory != selectInventories.value) {
            return
        }
        showTodo = [...showTodo, t]
        console.log('showTodo', showTodo)
    })
    target()
})

// 生命周期 ============================
onMounted(async () => {
    console.log('planning挂载完成');
    inventories = piniaTodo.Inventories
    nextTick()
    selectInventories.value = '默认'
})
onUpdated(() => {
    console.log('planning数据发生了更新后')
})
onUnmounted(() => {
    console.log('planning卸载之后');
})



</script>

<style lang="scss" scoped>
// 颜色
$bg: v-bind('state.bg');
$font: v-bind('state.color');
$todo_header: v-bind('state.todo_header');
$todo_addBtn: v-bind('state.todo_addBtn');
$todo_list: v-bind('state.todo_list'); // ;列表背景色
$todo_list_caed: v-bind('state.todo_list_caed'); // 时间卡片背景色

.planning {
    width: 100vw;
    height: calc(100vh - 50px);
    background-color: $bg;
    color: $font;
    position: relative;

    header {
        width: 100vw;
        height: 6vh;
        background-color: $todo_header;
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .title {
            font-size: 25px;
            margin-left: 6vw;
        }

        .inventory-icon {
            margin-right: 6vw;
        }
    }

    nav {
        width: 100vw;
    }

    main {
        height: calc(100vh - 50px - 5vh);
        background-color: $todo_list;
        overflow: scroll;
        color: #fff;

        .date_card {
            width: 96vw;
            height: 15vh;
            background: linear-gradient($todo_list_caed);
            margin: 1vh auto;
            border-radius: 10px;
            box-sizing: border-box;
            padding: 2vh 5vw;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            .data_time {
                font-size: 20px;
            }

            .target_num {
                font-size: 14px;
            }
        }
    }

    .add_btn {
        position: absolute;
        background-color: $todo_addBtn;
        padding: 2vw;
        border-radius: 999px;
        box-shadow: 1px 1px 4px 1px #333;
        right: 5vw;
        bottom: 5vh;
    }

    .btn_list {
        padding: 0 0 3vh 0;

        .title {
            padding: 2vh 5vw;
            font-size: 18px;
            font-weight: bold;
        }

        .new_inventory {
            width: 100%;
            // height: 5vh;
            padding: 2vh 5vw;
            border: solid #aaaaaa;
            border-width: 1px 0;
            display: flex;
            justify-content: center;

        }

        max-height: 50vh;

        .inventory_list {
            overflow: scroll;

            .inventory_box {
                width: 90vw;
                padding: 1vh 5vw;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }


    }

    ::v-deep(.van-popup) {
        background-color: $bg;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

    }
}

.group {
    position: relative;
    margin-bottom: 2vh;

    .input {
        font-size: 16px;
        padding: 10px 10px 10px 5px;
        display: block;
        width: 200px;
        border: none;
        border-bottom: 1px solid #515151;
        background: transparent;
    }

    .input:focus {
        outline: none;
    }

    label {
        color: #999;
        font-size: 18px;
        font-weight: normal;
        position: absolute;
        pointer-events: none;
        left: 5px;
        top: 10px;
        transition: 0.2s ease all;
        -moz-transition: 0.2s ease all;
        -webkit-transition: 0.2s ease all;
    }

    .input:focus~label,
    .input:valid~label {
        top: -20px;
        font-size: 14px;
        color: #5264AE;
    }

    .bar {
        position: relative;
        display: block;
        width: 200px;
    }

    .bar:before,
    .bar:after {
        content: '';
        height: 2px;
        width: 0;
        bottom: 1px;
        position: absolute;
        background: #5264AE;
        transition: 0.2s ease all;
        -moz-transition: 0.2s ease all;
        -webkit-transition: 0.2s ease all;
    }

    .bar:before {
        left: 50%;
    }

    .bar:after {
        right: 50%;
    }

    .input:focus~.bar:before,
    .input:focus~.bar:after {
        width: 50%;
    }

    .highlight {
        position: absolute;
        height: 60%;
        width: 100px;
        top: 25%;
        left: 0;
        pointer-events: none;
        opacity: 0.5;
    }

    .input:focus~.highlight {
        animation: inputHighlighter 0.3s ease;
    }

    @keyframes inputHighlighter {
        from {
            background: #5264AE;
        }

        to {
            width: 0;
            background: transparent;
        }
    }
}
</style>
