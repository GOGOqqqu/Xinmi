<script lang="ts" setup>
import { onMounted, onUnmounted, onUpdated, ref, reactive, onActivated } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStateOne } from "../stores/one";
import api from "../api";  //引入api
import type { contentDetails, stateArticleReview } from "../types";
import { categoryNames, getChineseMouths } from "../utils/date-tools"

const state = useStateOne()  //创建仓库实例 可直接调用pinia的方法修改state
const route = useRoute();
const router = useRouter();
const audio = ref()
const yings = ref(state.shu)
const stateContent = reactive<{ Content: Array<contentDetails> }>({
  Content: []
})
const articleReviews = reactive<{ articleReview: Array<stateArticleReview> }>({
  articleReview: []
})


// 音乐小图标 自动播放
const timer = ref(null)
const Counter = ref(0)
const start = () => {
  setinterval()
}
const setinterval = () => {
  timer.value = setInterval(() => {
    Counter.value++
    if (Counter.value > 20) {
      Counter.value = 1
    }
    let tu = Counter.value < 10 ? '../src/assets/one/float_player/float_player_play_0' + Counter.value + '.png' : '../src/assets/one/float_player/float_player_play_' + Counter.value + '.png'
    state.discImageIndex = Counter.value
    state.discImageArr = tu

  }, 90)
}

const clickShow = () => {
  console.log('播放');
  // console.log(audio);
  // audio.value.play() 
  start()
  state.showDisc = true
  state.showHied = true
}
const clickHied = () => {
  console.log('暂停');
  // audio.value.pause() 
  state.showHied = false
}

const getAudioDuration = () => {

}
const playMusic = () => {
  yings.value++
  // console.log(yings.value);

  start()
  if (yings.value == 2) {
    // audio.value.play() 
    state.playShow = true;
  } else {
    state.showDisc = true
    state.showHied = true
    // audio.value.pause() 
    yings.value = 1

  }

}
const goDetail = () => {
  router.go(-1);
}

// const state = useState()  //仓库的使用
const userId = route.query.id
const types = route.query.types
onMounted(async () => {
  // console.log('planning挂载完成');
  articleReviews.articleReview = state.articleReview
})
onUnmounted(() => {
  // console.log('planning卸载之后');
})
onUpdated(() => {
  // console.log('planning数据发生了更新')
})
onActivated(async () => {
  // console.log('文章页组件激活:')

  let mm = Math.floor(audio.value.duration)
  let m = mm % 60
  let f = (mm - m) / 60
  let m1 = m < 10 ? '0' + m : m
  let shi = f + ':' + m1
  state.duration = shi
  // console.log(shi);

  // let shu = categoryNames(a)
  // let url =  shu +  '/htmlcontent/' +  state.id

  // let monthss = await api.one.getComment(url)
  // console.log('详情页',monthss.data.data);
  // state.content = monthss.data.data
})
</script>
<template>
  <div class="articleSetails">
    <div class="top">
      <div @click="goDetail">&lt;</div>
      <div>{{ state.text }}</div>
      <div>
        <img src="../assets/one/articles/bubble_collect.png" />
      </div>
    </div>
    <div class="aduio-banner" v-if="state.details == '8'">
      <img :src="state.cover" />
      <div class="aduio-content">
        <div class="content-content">
          <div class="content1">
            <div class="wave-item s" :class="{ play: state.showHied }"></div>
            <div class="wave-item s" :class="{ play: state.showHied }"></div>
            <div class="wave-item s" :class="{ play: state.showHied }"></div>
            <div class="wave-item a" :class="{ play: state.showHied }"></div>
            <div class="wave-item b" :class="{ play: state.showHied }"></div>
            <div class="wave-item c" :class="{ play: state.showHied }"></div>
            <div class="wave-item b" :class="{ play: state.showHied }"></div>
            <div class="wave-item a" :class="{ play: state.showHied }"></div>
            <div class="wave-item s" :class="{ play: state.showHied }"></div>
            <div class="wave-item s" :class="{ play: state.showHied }"></div>
            <div class="wave-item s" :class="{ play: state.showHied }"></div>
          </div>
          <div class="content2">
            <img
              v-if="!state.showHied"
              @click="clickShow"
              src="../assets/one/play/feeds_radio_play.png"
            />
            <img
              v-if="state.showHied"
              @click="clickHied"
              src="../assets/one/play/feeds_radio_pause.png"
            />
          </div>
          <div class="content1">
            <div class="wave-item" :class="{ play: state.showHied }"></div>
            <div class="wave-item" :class="{ play: state.showHied }"></div>
            <div class="wave-item" :class="{ play: state.showHied }"></div>
            <div class="wave-item" :class="{ play: state.showHied }"></div>
            <div class="wave-item" :class="{ play: state.showHied }"></div>
            <div class="wave-item" :class="{ play: state.showHied }"></div>
            <div class="wave-item" :class="{ play: state.showHied }"></div>
            <div class="wave-item" :class="{ play: state.showHied }"></div>
            <div class="wave-item" :class="{ play: state.showHied }"></div>
            <div class="wave-item" :class="{ play: state.showHied }"></div>
            <div class="wave-item" :class="{ play: state.showHied }"></div>
          </div>
        </div>
      </div>
    </div>
    <audio :src="state.src" @canplay="getAudioDuration" ref="audio" controls style="display: none;"></audio>
    <div class="bottom">
      <div class="bottom-top">{{ state.titles }}</div>
      <div class="bottom-top1">{{ state.content.json_content.simple_author[0] }}</div>
      <div class="bottom-top2" @click="playMusic" v-if="state.details == '1'">
        有声读物| {{ state.content.anchor }} 总时长 {{
        state.duration
        }}
      </div>

      <div class="html-conten" v-html="state.vHtml" style="94vw"></div>

      <div class="bian">{{ state.content.json_content.copyright }}</div>
      <div class="bian1">{{ state.content.json_content.editor }}</div>

      <!-- 作者信息 -->
      <div class="author">
        <h3>作者</h3>
        <div class="ding"></div>
        <div class="nei">
          <div>
            <img class="tu" :src="state.webUrl" />
          </div>
          <div class="nei-content">
            <div class="nei-top">{{ state.userName }}</div>
            <div class>{{ state.desc }}</div>
          </div>
          <span class="btn-g">关注</span>
        </div>
      </div>

      <!-- 评论 -->
      <div class="comment">
        <h3>评论</h3>
        <div class="ding"></div>
        <div class="comment-contnet" v-for="i in articleReviews.articleReview" :key="i.created_at">
          <div class="comment-left">
            <img :src="i.user.web_url" />
          </div>
          <div class="commnet-right">
            <h4>{{ i.user.user_name }}</h4>
            <div class="quote" v-if="i.quote">{{ i.quote }}</div>
            <div class="right-content">{{ i.content }}</div>
            <div class="right-bottom">点赞{{ i.praisenum }}</div>
            <div class="right-top">{{ i.created_at }}</div>
          </div>
        </div>
      </div>
    </div>
    <playControl></playControl>
  </div>
</template>


<style lang="scss" scoped>
.articleSetails {
  font-size: 6vw;
  position: fixed;
  z-index: 20;
  width: 100vw;
  height: 100vh;
  font-size: 6vw;
  overflow-x: hidden;
  background: v-bind("state.bg");
  color: v-bind("state.color");
}

.fr-fil {
  width: 100%;
}

.top {
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 12;
  padding: 0 3vw;
  display: flex;
  justify-content: space-between;
  height: 6vh;
  font-size: 16px;
  background-color: rgb(255, 255, 255, 0.8);

  img {
    width: 20px;
    height: 20px;
  }

  div {
    display: flex;
    align-items: center;
  }
}

.aduio-banner {
  position: relative;
  margin-top: 6vh;

  img {
    width: 100vw;
  }

  .aduio-content {
    width: 90vw;
    height: 32px;
    position: absolute;
    left: 5vw;
    bottom: 32px;

    .content-content {
      display: flex;

      .content2 {
        width: 32px;
        height: 32px;
        margin: 0 30px;

        img {
          width: 32px;
          height: 32px;
        }
      }

      .content1 {
        width: calc((100% - 90px) / 2);
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 12px;

        .wave-item {
          width: 5px;
          height: 8px;
          background-color: rgb(255, 255, 255);

          &:nth-child(6) {
            transform: scaleY(3);
          }

          &:nth-child(5),
          &:nth-child(7) {
            transform: scaleY(2);
          }

          &:nth-child(4),
          &:nth-child(8) {
            transform: scaleY(1.5);
          }

          &.play {
            &:nth-child(6) {
              animation: animations 1s linear infinite;
            }

            &:nth-child(5),
            &:nth-child(7) {
              animation: animationTwo 1s linear infinite;
            }

            &:nth-child(4),
            &:nth-child(8) {
              animation: animationThree 1s linear infinite;
            }

            &:nth-child(3),
            &:nth-child(9) {
              animation: animationTwo 1s linear infinite;
            }
          }
        }
      }
    }
  }
}

.bottom {
  padding: 0 15px;
  margin-top: 6vh;
  line-height: 4vh;
  letter-spacing: 0.2vw;

  .bottom-top {
    margin-top: 5px;
    font-size: 28px;
    font-weight: bold;
  }

  .bottom-top1 {
    margin-top: 30px;
    font-size: 12px;
    color: #777;
  }

  .bottom-top2 {
    margin-top: 30px;
    border: 1px solid #000;
    border-radius: 5px;
    padding: 10px;
    line-height: 20px;
    font-size: 16px;
  }

  .html-conten {
    margin-top: 26px;
    font-size: 17px;
  }

  .bian {
    margin-top: 30px;
    font-size: 13px;
    color: #777;
  }

  .bian1 {
    margin-top: 8px;
    font-size: 13px;
    color: #777;
  }

  h3 {
    font-size: 16px;
  }

  .ding {
    width: 80px;
    margin-top: 10px;
    height: 2px;
    background-color: #000;
  }

  .author {
    margin-top: 25px;

    .tu {
      width: 38px;
      height: 38px;
      border-radius: 50%;
    }

    .nei {
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .btn-g {
        border: 1px solid #777;
        border-radius: 3px;
        padding: 10px;
        font-size: 14px;
        color: #777;
        margin-left: 10px;
      }

      .nei-content {
        flex: 1;
        margin-left: 10px;
        font-size: 12px;
        color: #777;
      }
    }
  }

  .comment {
    margin-top: 15px;

    .comment-contnet {
      display: flex;
      border-bottom: 1px solid #ccc;
      padding: 15px 0;
      color: #777;

      .comment-left {
        width: 20px;

        img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
      }

      .commnet-right {
        width: calc(100% - 20px);
        position: relative;

        h4 {
          margin-left: 5px;
          font-size: 16px;
        }

        .right-content {
          margin-top: 20px;
          font-size: 14px;
          line-height: 18px;
          color: #555;
        }

        .right-bottom {
          margin-top: 15px;
          display: flex;
          justify-content: flex-end;
          padding-right: 20px;
          font-size: 12px;
          color: #777;
        }

        .right-top {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 12px;
          color: #777;
        }
      }

      .quote {
        border: 1px solid #ccc;
        padding: 5px 8px;
        font-size: 14px;
        color: #555;
        margin-top: 10px;
      }
    }
  }
}

::v-deep .fr-fil {
  width: 100% !important;
}

::v-deep p {
  margin-top: 25px !important;
}

#container {
  overflow: auto;
}

@keyframes animations {
  0% {
    transform: scaleY(1);
  }

  50% {
    transform: scaleY(3);
  }

  100% {
    transform: scaleY(1);
  }
}

@keyframes animationTwo {
  0% {
    transform: scaleY(1.8);
  }

  50% {
    transform: scaleY(1);
  }

  100% {
    transform: scaleY(1.8);
  }
}

@keyframes animationThree {
  0% {
    transform: scaleY(2.5);
  }

  50% {
    transform: scaleY(1);
  }

  100% {
    transform: scaleY(2.5);
  }
}
</style>
