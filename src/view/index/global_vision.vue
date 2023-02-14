<template>
    <loading></loading>
    <div class="global_vision">
        <header>
            <div class="button left" @click="goBack">
                <van-icon name="arrow-left" size="3vh" />
            </div>
            <div class="button right" @click="showPopup">
                <van-icon name="ellipsis" size="3vh" />
            </div>
            <div class="title"><span class="big">Daily</span>每日环球视野</div>
        </header>
        <main v-if="list">
            <van-back-top target="main" />
            <van-popup v-model:show="showSharePopup" position="bottom">
                <div class="SharePopup">
                    <div class="SharePopup_header">
                        <div class="SharePopup_header_title">分享是美德</div>
                        <div class="SharePopup_header_text">Great People Share Knowledge</div>
                    </div>
                    <div class="SharePopup_main">
                        <div class="SharePopup_main_item">
                            <div class="icon">
                                <van-icon name="share-o" size="13vmin" />
                                <div class="icon_title">分享</div>
                            </div>
                        </div>
                        <div class="SharePopup_main_item">
                            <div class="icon">
                                <van-icon name="photo-o" size="13vmin" />
                                <div class="icon_title">保存图片</div>
                            </div>
                        </div>
                        <div class="SharePopup_main_item">
                            <div class="icon">
                                <van-icon name="star-o" size="13vmin" />
                                <div class="icon_title">收藏</div>
                            </div>
                        </div>
                    </div>
                    <div class="SharePopup_footer" @click="showSharePopup = false">取消</div>
                </div>
            </van-popup>
            <div class="box" v-for="i, index in list" :key="index">
                <div class="img">
                    <img :src="i.cover_landscape" alt="">
                </div>
                <div class="title" v-if="i.ui_sets?.caption_subtitle != undefined">{{ i.ui_sets.caption_subtitle }}
                </div>
                <div class="miniTitle" v-if="i.tags != undefined">{{ i.tags[0].name ?? '' }}</div>
                <div class="main">{{ i.content }}</div>
                <div class="date">{{ i.pubdate }}</div>
                <div class="footer">
                    <div class="distance footer-item van-ellipsis">
                        <van-icon name="guide-o" size="3vh" />
                        {{ i.location }}
                    </div>
                    <div class="like footer-item" @click="like(i.guid)">
                        <svg v-if="!i.like" xmlns="http://www.w3.org/2000/svg" width="2vh" height="2vh"
                            fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                            <path
                                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="2vh" height="2vh" fill="currentColor"
                            class="bi bi-heart-fill liked" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                        </svg>
                    </div>
                    <div class="transmit footer-item" @click="share">
                        <van-icon name="share-o" size="3vh" />
                    </div>
                    <div class="line left"></div>
                    <div class="line right"></div>
                </div>
            </div>
        </main>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, onUpdated, ref, reactive, watch, watchEffect, onActivated, onDeactivated } from "vue";
//import { 使用的函数名 } from '@vueuse/core'   //引入vueuse中的函数使用
import { useState } from "@/stores";  //引入pinia
import { useRouter, useRoute } from "vue-router";  //引入
import api from "@/api";  //引入
import loading from '@/components/loading.vue';

const state = useState()  //创建仓库实例 可直接调用pinia的方法修改state

const router = useRouter()   //创建路由器实例
const route = useRoute()   //创建路由器实例

const goBack = () => {
    router.go(-1)  //前进后退
}

const showPopup = () => {
    console.log('打开更多面板');

}

const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
]

let list = ref()


const numArr = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']

const like = (id: number) => {  //点赞
    let index = list.value.findIndex((i: any) => i.guid == id)
    console.log('index', index);

    list.value[index].like = !list.value[index].like
}

let showSharePopup = ref(false)   //是否弹出分享窗口
const share = () => {   //分享
    showSharePopup.value = true
}



onMounted(async () => {
    //console.log('挂载完成');
    state.showLoading = true
    let { data } = await api.day.getData()

    list.value = data.map((i: any) => {
        return {
            ...i,
            like: false
        }
    })

    state.showLoading = false

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
.global_vision {
    width: 100vw;
    height: 100vh;
    background: v-bind('state.bg');
    color: v-bind('state.color');
    overflow-y: auto;
    position: relative;

    header {
        width: 100%;
        height: 8vh;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        font-size: 4.5vmin;
        font-weight: 500;
        letter-spacing: 0.2vmin;
        padding-bottom: 2vh;
        position: relative;
        box-shadow: 0 1vmin 100vh 30px rgb(255 255 255 / 20%);
        position: sticky;
        top: 0;
        left: 0;
        background: v-bind('state.bg');


        .big {
            font-size: 5.2vmin;
            margin-right: 1vmin;
            font-family: '弯曲';
            letter-spacing: 0.3vmin;

        }

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
        height: 92vh;
        overflow-y: auto;

        .SharePopup {
            width: 100%;
            background: v-bind('state.bg');
            color: v-bind('state.color');

            .SharePopup_header {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                flex-direction: column;
                padding: 2vh 0 3vh;
                line-height: 3vh;

                .SharePopup_header_title {
                    font-size: 5vmin;
                }

                .SharePopup_header_text {
                    color: v-bind('state.LightColor');
                }
            }

            .SharePopup_main {
                width: 100%;
                display: flex;
                margin-bottom: 4.2vh;

                .SharePopup_main_item {
                    width: calc(100% / 3);
                    height: calc(100vmin / 3);
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    .icon {
                        width: 70%;
                        height: 70%;
                        border-radius: 50%;
                        background: v-bind('state.LightBg');
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: relative;

                        .icon_title {
                            position: absolute;
                            left: 0;
                            bottom: -3vh;
                            width: 100%;
                            text-align: center;
                            font-size: 3.2vmin;
                        }
                    }
                }
            }

            .SharePopup_footer {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 6vh;
                letter-spacing: 0.3vmin;
                border-top: 1px solid v-bind('state.cardBg');
                box-shadow: 0 2px 1vh -2px #fff;
            }
        }

        .box {
            width: 96%;
            margin: 0.6vh 2%;

            .img {
                width: 100%;

                img {
                    width: 100%;
                    display: block;
                }
            }

            .title {
                width: 100%;
                height: 6vh;
                display: flex;
                align-items: center;
                padding: 0 5vmin;
                font-size: 5vmin;
                font-weight: 600;
            }

            .miniTitle {
                font-size: 3vmin;
                padding: 1vh 2vmin;
                border: 1px solid #ddd;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 45vmin;
                margin-left: 5vmin;
                border-radius: 0.5vmin;
            }

            .main {
                padding: 1vh 5vmin;
                letter-spacing: 0.2vmin;
                font-size: 4vmin;
                display: flex;
                align-items: center;
                justify-content: center;
                line-height: 3vh;
            }

            .date {
                width: 100%;
                height: 4vh;
                display: flex;
                align-items: center;
                font-size: 3.6vmin;
                font-weight: 600;
                padding: 0 5vmin;
            }

            .footer {
                width: 100%;
                height: 6vh;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid #6b6a6a;
                border-left: none;
                border-right: none;
                margin: 2vh 0;
                position: relative;

                .footer-item {
                    height: 100%;
                    width: calc(100% / 3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2.5vmin;

                    .liked {
                        color: #F51F46;
                        animation: zoom 1s ease;
                    }

                    @keyframes zoom {
                        0% {
                            transform: scale(1);
                        }

                        50% {
                            transform: scale(2);
                        }

                        100% {
                            transform: scale(1);
                        }
                    }
                }

                .line {
                    width: 0.2vmin;
                    height: 80%;
                    position: absolute;
                    top: 10%;
                    background: v-bind('state.cardBg');

                    &.left {
                        left: calc(100% / 3)
                    }

                    &.right {
                        left: calc(100% / 3 * 2)
                    }
                }
            }
        }
    }
}
</style>