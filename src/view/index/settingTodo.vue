<template>
    <van-config-provider :theme="state.dark ? 'dark' : 'light'">
        <van-dialog v-model:show="show_dialog" title="提示" width="82vmin" show-cancel-button @confirm="confirm"
            @cancel="cancel">
            <div class="dialog">
                确定删除该事件吗？
            </div>
        </van-dialog>
    </van-config-provider>
    <div class="settingTodo">
        <header>
            <div class="button left" @click="goBack">
                <van-icon name="cross" size="3vh" />
            </div>
            <div class="button right" @click="linkAddTodo">
                <van-icon name="plus" size="3vh" />
            </div>
            <div class="title">事件</div>
        </header>
        <main>
            <!--  -->
            <draggable v-model="state.remainderTodo" item-key="title" :force-fallback="true" :delay="50"
                :animation="400">
                <template #item="{ element, index }">
                    <van-swipe-cell right-width="80">
                        <div class="item">
                            <div class="card" @click="checkedTodo(element.title)" :class="{ checked: element.show }">
                                <div class="icon card-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" fill="currentColor"
                                        class="bi bi-check-all" viewBox="0 0 16 16">
                                        <path
                                            d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z" />
                                    </svg>
                                </div>
                                <div class="title card-item">{{ element.title }}</div>
                                <div class="frequency card-item">{{ element.num + '次/' + element.frequencyName }}</div>
                                <div class="right-icon icon card-item" @click.stop="changeTodo(element.title)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36%" height="36%" fill="currentColor"
                                        class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path
                                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fill-rule="evenodd"
                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <template #right>
                            <div class="button" @click="deleteTodo(element.title)">
                                <van-icon name="delete-o" size="3vh" />
                            </div>
                        </template>
                    </van-swipe-cell>
                </template>
            </draggable>
        </main>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, onUpdated, ref, reactive, watch, watchEffect, onActivated, onDeactivated } from "vue";
//import { 使用的函数名 } from '@vueuse/core'   //引入vueuse中的函数使用
import { useState } from "@/stores";  //引入pinia
import { useRouter } from "vue-router";  //引入
import draggable from "vuedraggable";
const router = useRouter()   //创建路由器实例

const state = useState()  //创建仓库实例 可直接调用pinia的方法修改state

// const changeName = () => {
//     state.changeName('小白')   //调用pinia的方法
// }

const goBack = () => {
    router.go(-1)  //前进后退
}

const checkedTodo = (title: string) => {
    console.log('title', title);
    let index = state.remainderTodo.findIndex(i =>
        i.title == title
    )
    state.remainderTodo[index].show = !state.remainderTodo[index].show
}

const linkAddTodo = () => {
    router.push(
        {
            name: 'addTodo'
        }
    )
}

let show_dialog = ref(false)
const confirm = () => {
    show_dialog.value = false
    state.remainderTodo.splice(deleteIndex, 1)
}
const cancel = () => {
    show_dialog.value = false
}


let deleteIndex: number
const deleteTodo = (title: string) => {
    console.log('title', title);
    show_dialog.value = true
    deleteIndex = state.remainderTodo.findIndex(i =>
        i.title == title
    )
}

const changeTodo = (title: string) => {
    let index = state.remainderTodo.findIndex(i =>
        i.title == title
    )
    router.push(
        {
            name: 'addTodo',
            query: {
                todoIndex: index
            }
        }
    )
}



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
.dialog {
    width: 82vmin;
    height: 30vmin;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.3vmin;
    font-size: 4.2vmin;
    background: v-bind('state.bg');
    color: v-bind('state.color');
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
        margin-bottom: 2vh;

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
        height: 90vh;
        overflow-y: auto;

        .item {
            height: 8vh;
            width: 100%;
            margin: 1.2vh 0;

            .card {
                width: 92%;
                margin-left: 4%;
                height: 8vh;
                display: flex;
                background: v-bind('state.todoBg');
                border-radius: 2vmin;
                color: #fff;

                &.checked {
                    background: #dd536c;
                }

                .card-item {
                    height: 8vh;
                    position: relative;

                    &.icon {
                        width: 8vh;
                        height: 8vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    &.title {
                        height: 8vh;
                        display: flex;
                        align-items: center;
                    }

                    &.frequency {
                        position: absolute;
                        top: 0;
                        right: calc(8vh + 2vmin);
                        display: flex;
                        align-items: center;
                        height: 8vh;
                        letter-spacing: 0.2vmin;
                    }

                    &.right-icon {
                        position: absolute;
                        right: 2vmin;
                        top: 0;
                    }
                }
            }
        }

        .button {
            height: 8vh;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 60px;
            border-left: 1px solid v-bind('state.LightColor');
        }
    }
}
</style>