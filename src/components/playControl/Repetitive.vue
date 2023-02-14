<script setup lang="ts">
import { useStateOne } from "../../stores/one"; //引入pinia
import {
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
  reactive,
  watch,
  watchEffect,
  onActivated,
  onDeactivated
} from "vue";
import { useRouter, useRoute } from "vue-router";
import { showToast } from "vant";

const state = useStateOne(); //创建仓库实例 可直接调用pinia的方法修改state
const route = useRoute();
const router = useRouter();
const audio = ref();
//自定义音乐控制组件的显示
const playShowDisc = () => {
  state.playShow = true;
};
//自定义音乐控制组件的隐藏
const playHideDisc = () => {
  state.playShow = false;
};

//控制audio是否循环播放
const loopBtn = () => {
  state.needLoop = true;
};
const loopBtns = () => {
  state.needLoop = false;
};

const clickShows = () => {
  console.log("播放");
  // console.log(audio);
  audio.value.play();
  // state.showDisc =
  state.showHied = true;
};
const clickHieds = () => {
  console.log("暂停");
  audio.value.pause();
  state.showHied = false;
};

const value = ref(state.progressBar);
const onChange = value => {
  let shi1 = Math.floor((state.durations / 100) * value);
  audio.value.currentTime = shi1;
  if (shi1 > 60) {
    let t1 = shi1 % 60;
    let t2 = (shi1 - t1) / 60;
    let t22 = t2 >= 10 ? t2 : "0" + t2;
    let t11 = t1 >= 10 ? t1 : "0" + t1;
    let t3 = t22 + ":" + t11;
    state.currentTimes = t3;
  } else {
    let t1 = shi1;
    let t11 = t1 >= 10 ? t1 : "0" + t1;
    let t2 = "00:" + t11;
    state.currentTimes = t2;
  }
  console.log(value);
  state.progressBar = shi1
};

//回到播放页
const goArticle = () => {
  console.log("回到播放页");
};

//音乐时间总时长获取
const getAudioDuration = () => {
  let mm = Math.floor(audio.value.duration);
  let m = mm % 60;
  let f = (mm - m) / 60;
  let m1 = m < 10 ? "0" + m : m;
  let shi = f + ":" + m1;
  state.duration = shi;
  state.durations = mm;
};
//音乐播放进度获取
const timeupdateListener = () => {
  let mm = Math.floor(audio.value.currentTime);
  let m = mm % 60;
  let f = (mm - m) / 60;
  let f2 = f >= 10 ? f : "0" + f;
  let m1 = m < 10 ? "0" + m : m;
  let shi = f2 + ":" + m1;
  state.currentTimes = shi;
  state.currentTime = mm;
  console.log("播放中");
  let tt = Math.floor((state.currentTime * 100) / state.durations);
  state.progressBar = tt;
  if (tt == 100) {
    audio.value.pause();
    state.showHied = false;
    audio.value.currentTime = 0;
    state.progressBar = 0;
  }
};

watch(
  () => state.showHied,
  (newVal: any, oldVal: any) => {
    //监听路由元对象 判断路由层级的变化 从而做出不同的路由动画
    if (newVal == true) {
      audio.value.play();
    } else {
      audio.value.pause();
    }
  },

);
watch(
  () => state.closeAll,
  (newVal: any, oldVal: any) => {
    //监听路由元对象 判断路由层级的变化 从而做出不同的路由动画
    if (newVal == true) {
      audio.value.currentTime = 0;
      state.progressBar = 0
    } else {
      audio.value.pause();
    }
  }
)
// onMounted(() => {
//   audio.value.play();
//     // console.log('me页面挂载完成');
// })
</script>

<template>
  <div id="zong">
    <!-- 展示container组件 即主体部分 不包括其他弹窗类 在主体之上的页面 -->
    <div class="disc-iconss" v-if="state.showDisc" @click="playShowDisc">
      <img :src="state.discImageArr" />
    </div>
    <div class="play-show" v-if="state.playShow">
      <slot></slot>
      {{ state.discImageIndex }}
      <div class="play-control">
        <div class="play-title">{{state.titles}}</div>
        <div>
          <div class="wd-slider">
            <van-slider button-size="8px" active-color="#000000" v-model="state.progressBar" @change="onChange"  />
          </div>
        </div>
        <div class="time-wrap">
          <span>{{state.currentTimes}}</span>
          <span>{{state.duration}}</span>
        </div>
        <p class="anchor-name">{{state.anchor}}</p>
        <div class="control-bar">
          <div class="prev">
            <img src="../../assets/one/play/last_disable.png" />
          </div>
          <div class="play">
            <img v-if="state.showHied" @click="clickHieds" src="../../assets/one/play/player_pause.png" />
            <img v-if="!state.showHied" @click="clickShows" src="../../assets/one/play/player_play.png" />
          </div>
          <div class="next">
            <img src="../../assets/one/play/next_disable.png" />
          </div>
        </div>

        <div class="bottom-bar">
          <div class="loop-btn">
            <img
              @click="loopBtn"
              :class="{play:!state.needLoop}"
              src="../../assets/one/play/player_all_cycle.png"
            />
            <img
              @click="loopBtns"
              :class="{play:state.needLoop}"
              src="../../assets/one/play/player_single_cycle.png"
            />
          </div>
          <div class="logo">
            <i></i> 来自一个音乐
          </div>
          <div class="func-bar">
            <div class="collect">
              <img src="../../assets/one/play/music_collection_night.png" />
            </div>
            <div class="go-article" @click="goArticle">
              <img src="../../assets/one/play/detail_content.png" />
            </div>
          </div>
        </div>
      </div>

      <div class="play-hide" @click="playHideDisc"></div>
    </div>
    <audio
      :src="state.src"
      @canplay="getAudioDuration"
      @timeupdate="timeupdateListener"
      ref="audio"
      controls
      muted=true
      style="display: none;"
    ></audio>
  </div>
</template>

<style lang="scss">
:root {
  //--van-tabbar-height: 6vh   //全局更改组件库样式的方法 不建议 建议在组件内使用:deep(组件库的类名){样式}
  --animate-delay: 0s;
}
.disc-iconss {
  position: fixed;
  right: 0;
  top: 13vh;
  z-index: 8;
  width: 40px;
  height: 40px;

  img {
    width: 40px;
    height: 40px;
  }
}
.play-show {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 25;
  // background-color: aquamarine;
  .play-control {
    position: fixed;
    top: 0;
    width: 100vw;
    padding: 20px;
    background-color: rgb(255, 255, 255);
    .play-title {
      font-size: 16px;
      margin-bottom: 10px;
      text-align: center;
      color: #777;
    }
    .time-wrap {
      display: flex;
      justify-content: space-between;
      color: #777;
      font-size: 12px;
    }
    .anchor-name {
      transform: translateY(-50%);
      text-align: center;
      font-size: 12px;
      color: #777;
    }
    .control-bar {
      margin-top: 26px;
      display: flex;
      justify-content: space-between;
      padding: 0 26vw;

      img {
        width: 45px;
        height: 45px;
      }
    }

    .bottom-bar {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      .loop-btn {
        img {
          margin-right: 62px;
          width: 22px;
          height: 22px;
          display: none;
        }
      }
      .logo {
        text-align: center;
        font-size: 12px;
        color: #999;
        i {
          vertical-align: top;
          display: inline-block;
          width: 12px;
          height: 12px;
          background-size: cover;
          background-image: url(./assets/one/one_icon.png);
        }
      }
      .func-bar {
        display: flex;
        .collect {
          margin-right: 40px;
        }
        img {
          width: 22px;
          height: 22px;
        }
      }
    }
  }
  .play-hide {
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.6);
  }
  .play {
    display: block !important;
  }
}
</style>