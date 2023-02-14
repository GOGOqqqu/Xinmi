<template>
    <div class="popup">
        <header>
            <!-- <img src="../../img/index/popupBg.png" alt=""> -->
            <bg></bg>
            <div class="text">你好,世界</div>
        </header>
        <main>
            <div class="item van-haptics-feedback">
                <div class="icon box">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-moon-stars-fill"
                        viewBox="0 0 16 16" width="60%" height="60%">
                        <path
                            d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
                        <path
                            d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
                    </svg>
                </div>
                <div class="text box">夜间</div>
                <div class="switch box">
                    <van-switch v-model="state.dark" active-color="#363636" />
                </div>
            </div>
            <div class="item van-haptics-feedback" @click="recover">
                <div class="icon box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60%" height="60%" fill="currentColor"
                        class="bi bi-clipboard-check" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                        <path
                            d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                        <path
                            d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                    </svg>
                </div>
                <div class="text box">修改出生日期</div>
            </div>
            <div class="item van-haptics-feedback" @click="switchDeathClock">
                <div class="icon box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60%" height="60%" fill="currentColor"
                        class="bi bi-clock-fill" viewBox="0 0 16 16">
                        <path
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                    </svg>
                </div>
                <div class="text box">切换生死之钟</div>
                <Toast :text="'请先设置出生日期'" :icon-name="'revoke'"></Toast>
            </div>
            <div class="item van-haptics-feedback" @click="link_global_vision">
                <div class="icon box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60%" height="60%" fill="currentColor"
                        class="bi bi-globe-asia-australia" viewBox="0 0 16 16">
                        <path
                            d="m10.495 6.92 1.278-.619a.483.483 0 0 0 .126-.782c-.252-.244-.682-.139-.932.107-.23.226-.513.373-.816.53l-.102.054c-.338.178-.264.626.1.736a.476.476 0 0 0 .346-.027ZM7.741 9.808V9.78a.413.413 0 1 1 .783.183l-.22.443a.602.602 0 0 1-.12.167l-.193.185a.36.36 0 1 1-.5-.516l.112-.108a.453.453 0 0 0 .138-.326ZM5.672 12.5l.482.233A.386.386 0 1 0 6.32 12h-.416a.702.702 0 0 1-.419-.139l-.277-.206a.302.302 0 1 0-.298.52l.761.325Z" />
                        <path
                            d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM1.612 10.867l.756-1.288a1 1 0 0 1 1.545-.225l1.074 1.005a.986.986 0 0 0 1.36-.011l.038-.037a.882.882 0 0 0 .26-.755c-.075-.548.37-1.033.92-1.099.728-.086 1.587-.324 1.728-.957.086-.386-.114-.83-.361-1.2-.207-.312 0-.8.374-.8.123 0 .24-.055.318-.15l.393-.474c.196-.237.491-.368.797-.403.554-.064 1.407-.277 1.583-.973.098-.391-.192-.634-.484-.88-.254-.212-.51-.426-.515-.741a6.998 6.998 0 0 1 3.425 7.692 1.015 1.015 0 0 0-.087-.063l-.316-.204a1 1 0 0 0-.977-.06l-.169.082a1 1 0 0 1-.741.051l-1.021-.329A1 1 0 0 0 11.205 9h-.165a1 1 0 0 0-.945.674l-.172.499a1 1 0 0 1-.404.514l-.802.518a1 1 0 0 0-.458.84v.455a1 1 0 0 0 1 1h.257a1 1 0 0 1 .542.16l.762.49a.998.998 0 0 0 .283.126 7.001 7.001 0 0 1-9.49-3.409Z" />
                    </svg>
                </div>
                <div class="text box">每日环球视野</div>
            </div>
        </main>
    </div>


</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, onUpdated, ref, reactive, watch, watchEffect, onActivated, onDeactivated } from "vue";
//import { 使用的函数名 } from '@vueuse/core'   //引入vueuse中的函数使用
import { useState } from "@/stores";  //引入pinia
import bg from './bg.vue';
import Toast from '@/components/Toast.vue';
import router from "@/router";


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

const switchChecked = ref(false);

const recover = () => {   //恢复初始状态
    if (state.isOnSetting) {
        return
    }
    state.switchIsOnSetting()   //调出设置出生日期面板
    state.setAge(0)  //初始化数值
    state.setLifetime(80) //初始化数值
    state.setBirthTime('') //初始化数值
}


const switchDeathClock = () => {

    if (state.isOnSetting) {   //现在正在设置出生日期
        state.isShowToast()
    }
    else {
        state.switchDeathClock()   //切换出死之钟
    }
}

const link_global_vision = ()=>{
    router.push({
        name:'global_vision'
    })
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
.popup {
    height: 100vh;
    width: 75vw;
    overflow-y: auto;
    overflow-x: hidden;



    header {
        width: 100%;
        padding: 2vmin;
        position: relative;
        background-image: linear-gradient(70deg, #434343 0%, black 100%);

        svg {
            width: 100%;
        }

        .text {
            font-size: 5vmin;
            position: absolute;
            bottom: 1vh;
            left: 0;
            height: 4vh;
            width: 100%;
            display: flex;
            align-items: center;
            letter-spacing: 0.5vmin;
            font-weight: 600;
            padding-left: 4vmin;
            color: #fff;
        }
    }

    main {
        width: 100%;

        .item {
            width: 100%;
            height: 8vh;
            display: flex;
            align-items: center;
            position: relative;
            padding: 0 5vmin;
            border-bottom: 1px solid rgba($color: #666, $alpha: .2);

            .box {
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 4vmin;

                &.icon {
                    height: 100%;
                    width: 6vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 1vmin;
                }

                &.switch {
                    width: 30%;
                    position: absolute;
                    right: 0;
                    top: 0;
                }
            }
        }
    }
}
</style>