<script lang="ts" setup>
import { onMounted, onUnmounted, onUpdated, ref, nextTick,reactive, watch, watchEffect, onActivated, onDeactivated } from "vue";
import { useStateOne } from "../stores/one";   //引入pinia
import api from "../api";
import { showImagePreview, List } from 'vant';
import { useRouter } from "vue-router";
import { getPrevMonth,getPrevDate,getime, getMAndDObj,getThePreviousMont,categoryNames,getChineseMouths,getChineseMouth,returnMonth } from "../utils/date-tools"
import type { StoryType,SpecifyMonthTypes,stateArticleReview } from "../types";
import playControl from '@/components/playControl/index.vue'
// const props = defineProps<{  //父组件传来的数据
// }>()
// const date = ref('')
const state = useStateOne()  //仓库的使用
// const changeName = () => {m
//     state.changeName('小白')
// }
const showDate = ref(true)
const mm =reactive <{List :Array<SpecifyMonthTypes>}>({
    List:[]
})
const stateContentList=reactive <{ContentList :Array<StoryType>}>({
    ContentList:[]
})
// 控制选择日期的隐藏
const calendar = ref(false)

// 控制加载
const vanLoadings = ref(false)

const show = ref(false);  //是否显示
const images =ref([
    'http://image.wufazhuce.com/Fv65f_fYwvLVyg2wRpbyVgoCRUKA',
])
const index = ref(0);  //目前是第几张
const onChange = (newIndex: any) => {
    index.value = newIndex;
}

// 点击日历上的时间请求
const clickSearch = async (date:string) => {
    if(state.date == date) {
      console.log("重复了");
    }else {
      console.log("date:",date);
      let data = await api.one.getData(date)
      console.log('date信息',data.data.data);

      state.contentList = data.data.data.content_list
      stateContentList.ContentList =data.data.data.content_list
      state.weather = data.data.data.weather
      state.date = date
      daz.value =date
      let tt=getMAndDObj(daz.value)
      let yue = getChineseMouth(tt.m)
      state.months = yue
      state.monthDate = Number(tt.m)
      state.days = `${tt.d}`
      state.years = `${tt.f}`
      calendar.value = false
    }
}

/* 控制日历的显示与隐藏 */
const calendarHide = () => {
  if(calendar.value){
    calendar.value = false
  }else{
    calendar.value = true
  }
}

const stateInformations = ref(state.informations)

const router = useRouter();

// 实时月份
const daz= ref('')
// 屏幕可ds高度
const clientHeight = ref('')
const headerRef = ref()

// const timeMonth = ref()

// 仓库的informations.informationsDate 
// const timeInformationsDate =ref()

const wu = ref([] as any)

// 懒加载
const ScrollTops = async (e:any) => {
  //  let height= this.$refs.init.$el.offsetHeight;
  clientHeight.value = `${document.documentElement.clientHeight}` //获取浏览器开始高度
   
   let height: number |string = clientHeight.value
   height = Math.floor(Number(height))
   let headerHeight = headerRef.value.clientHeight  // 获取元素的高度
   let top: number |string= Math.floor(Number(e.target.scrollTop))
   
  //  await nextTick()
   if(headerHeight - height +100 - top <= 2){
    console.log(headerHeight - height +100 -top );
    
       vanLoadings.value = true 
       console.log('加载中');
       if(vanLoadings.value ){
        let shi = state.useMonth 
        console.log(state.useMonth );
        
        let gg =getThePreviousMont(state.useMonth)
        
        if(gg == shi ){
           console.log('相对');
        }else {
          state.useMonth = gg
          // 请求下个月的信息
          let yues = await api.one.getMonth(gg)
          console.log('下个月的信息',yues.data.data);
          
          state.title = returnMonth(gg)
          console.log(state.title,'月');
          
          
          wu.dep.push(
        {
          monthDate: state.title + '月',
          informationsDate:yues.data.data,
        }
      )
          
          console.log(state.informations);
        }
        console.log('fdshfdsj',gg);
        await nextTick()
       }
       vanLoadings.value = false
    
   } else {
    vanLoadings.value = false
   }
}

// 变色
const ScrollTop = (e:any)=> {
  // console.log('scrollTop:',e.target.scrollTop ); 
  if(e.target.scrollTop >= 70) {
    showDate.value =false
  }else {
    showDate.value =true
  }
}

// 跳转加图片预览
const picturePopup = async (a:string, b:string ,c:string)=> {
  if(a == '0'){
    let array = []
    array.push(b)
    images.value = array
    show.value = true;

  }else {
  state.id=c
  state.details=a
  state.text = getChineseMouths(a)

  let shu = categoryNames(a)
  let url =  shu +  '/htmlcontent/' + c
  let url1 = shu + '/' + c + '/0' 
 
  let monthss = await api.one.getComment(url)
  console.log('详情页',monthss.data.data);
  state.content = monthss.data.data
  state.showHied = false;
  state.src= monthss.data.data.audio 
  state.vHtml = monthss.data.data.json_content.content
  state.titles = monthss.data.data.title
  state.userName = monthss.data.data.author_list[0].user_name
  state.desc = monthss.data.data.author_list[0].desc
  state.webUrl = monthss.data.data.author_list[0].web_url
  state.anchor =  monthss.data.data.anchor
  state.cover = monthss.data.data.json_content.cover
  let articleReview = await api.one.getArticleReview(url1)
  console.log('文章评论',articleReview.data.data.data);
  state.articleReview = articleReview.data.data.data
    // nextTick()
    router.push({
			name:'details',
      query: {
          id:c,
          types:a
        }
		})  
  }
}

onMounted(async () => {
    console.log('文章挂载完成');

    let time = await getime()
    console.log(time);
    let m9 = await api.one.getData(time)
    console.log('date信息',m9.data.data);
    if(m9.data.data == undefined) {
      console.log('口的');
      let date =getPrevDate(time)
      console.log(date);
      state.date = date
    }else {
      console.log('加油');
      state.date=time
    }

    let date = state.date 
    let { data } = await api.one.getData(date)
    console.log('date信息',data.data);

    // 上传仓库
    state.weather = data.data.weather
    state.contentList = data.data.content_list
    stateContentList.ContentList = data.data.content_list
    state.city_name = data.data.weather.city_name
    state.climate = data.data.weather.climate
    state.temperature = data.data.weather.temperature
    let month = getPrevMonth(time) 
    console.log(month);
    
    let months = await api.one.getMonth(month)
    console.log('dates月份',months.data);

    let monthDate = returnMonth(state.date)

    let general1 = {
      monthDate : monthDate + '月' ,
      informationsDate : months.data.data
    }
    let arr2= []
    arr2.push(general1)
    console.log(wu);
    
    wu.dep = arr2
    state.informations = wu.dep

    let monthss =await api.one.getComments()
    console.log('datesgfvdv',monthss.data.data);
    let tt=getMAndDObj(date)
    
    let yue = getChineseMouth(tt.m)
    console.log(tt);
    
    state.months = yue
    state.monthDate = Number(tt.m)
    state.days = `${tt.d}`
    state.years = `${tt.f}`

    
    if(months.data.data.length <= 8 ){
      let gg=getThePreviousMont(date)
      state.useMonth = gg
      state.title = returnMonth(gg)
      let xia = await api.one.getMonth(gg)
      wu.dep.push(
        {
          monthDate: state.title + '月',
          informationsDate:xia.data.data,
        }
      )
      mm.List = wu.dep
    }else {
      console.log(date);
    //   let gg=getThePreviousMont(date)
      state.useMonth = date
    //   console.log(gg);//
    //   state.title = returnMonth(gg)
    mm.List = wu.dep
    }
    
    console.log(stateInformations);
    console.log(mm.List.length);
})
watch(
  () => mm.List.length,
  (newVal: any, oldVal: any) => {
    //监听路由元对象 判断路由层级的变化 从而做出不同的路由动画
    if (newVal == oldVal) {
      console.log('没有');
      
    } else {
      console.log('变化');
      
      vanLoadings.value = false
    }
  }
)
// onUnmounted(() => {
//     // console.log('文章卸载之后');
    
// })
// onUpdated(() => {
//     // console.log('文章数据发生了更新')
// })

// onActivated(() => {
//     // console.log('文章组件激活')

// })
onDeactivated(() => {
    // console.log('文章组件失活')
    state.showHied = false
    state.closeAll = true
})
</script>
<template>
  <div class="article" @scroll="ScrollTop">
    <!-- 顶部 -->

    <div class="head">
      <div class="head-top" @click="calendarHide">
        <div>
          <transition name="move">
            <div class="day">{{ state.days }}</div>
          </transition>
        </div>
        <div>
          <transition name="move">
            <div class="month">{{ state.months}}.</div>
          </transition>
        </div>
        <div>
          <transition name="move">
            <div class="year">{{ state.years }}</div>
          </transition>
        </div>
        <span class="san"></span>
      </div>

      <div class="head-right" v-show="showDate">
        <span>{{ state.city_name }}</span>
        <span>{{ state.climate }}</span>
        <span>{{ state.temperature }}℃</span>
      </div>
    </div>

    <transition name="transitions">
      <div class="calendar" v-if="calendar" @scroll="ScrollTops">
        <div class="calendar-content" ref="headerRef">
          <div v-for="i in mm.List" :key="i.monthDate">
            <div class="content-top">
              <div
                class="line"
                style="background-color: rgb(153, 153, 153); margin: 0px 10px 0px 0px; top: 7px;"
              ></div>
              <h3 class="content-top">{{ i.monthDate }}</h3>
              <div
                class="line"
                style="background-color: rgb(153, 153, 153); margin: 0px 0px 0px 10px; top: 7px;"
              ></div>
            </div>

            <div class="content-bottom">
              <div
                class="bottom-content"
                v-for="a in i.informationsDate"
                :key="a.id"
                @click="clickSearch(a.date)"
              >
                <img :src="a.cover" />
                <p>{{ a.date }}</p>
              </div>
            </div>
          </div>

          <van-loading color="#1989fa" v-if="vanLoadings" />
        </div>
      </div>
    </transition>

    <div
      class="content"
      v-for="(i,a) in stateContentList.ContentList"
      :key="i.id"
      :class="a == 0 ? 'yi': ''"
    >
      <div v-if="i.category != '0'" class="tou">
        <div class="yue">- {{ getChineseMouths(i.category) }} -</div>
        <div v-if="i.category != '8'">
          <div class="title">{{i.title}}</div>
          <p class="sub-title">
            <span v-if="i.author.user_id !== '0'">文 /</span>
            {{i.author.user_name}}
          </p>
          <div class="nei">{{ i.forward }}</div>
        </div>
      </div>
      <div class="height">
        <van-image-preview v-model:show="show" :images="images">
          <template v-slot:index>第{{ index + 1 }}页</template>
        </van-image-preview>
        <img :src="i.img_url" @click="picturePopup(i.category,i.img_url,i.item_id)" />

        <!-- 电台栏目 -->
        <div v-if="i.category == '8'">
          <div class="height-top">ONE电台{{i.volume}}</div>
          <div class="nei">
            <p>{{ i.title }}</p>
            <img class="san" src="../assets/one/play/feeds_radio_play.png" alt />
          </div>
        </div>
      </div>

      <!-- 除了第一个,其他都有 -->
      <div class="content-bottom" v-if="i.category == '0'">
        <div>{{i.title}}|{{i.pic_info}}</div>
        <p>{{i.forward}}</p>
        <div class="tu">{{i.words_info}}</div>
      </div>

      <!-- 下面的爱心点赞框 -->
      <div class="content-frame" v-if="i.category == '0'">
        <div class="top-left">
          <img class="da" src="../assets/one/articles/discovery.png" /> 小记
        </div>

        <div class="top-right">
          <div class="le">
            <img class="da" src="../assets/one/articles/diary_icon.png" />
          </div>
          <div class="le">
            <img class="da" src="../assets/one/articles/bubble_collect.png" />
          </div>

          <div class="les">
            <img class="da you" src="../assets/one/articles/discover_laud_unselected.png" />
            {{i.like_count}}
          </div>
          <div>
            <img class="da" src="../assets/one/articles/feeds_share.png" />
          </div>
        </div>
      </div>

      <div class="feng content-frame" v-if="i.category !== '0'">
        <div class="yuan top-right">
          <div class="les">
            <img class="da you" src="../assets/one/articles/discover_laud_unselected.png" />
            {{i.like_count}}
          </div>
          <div>
            <img class="da" src="../assets/one/articles/feeds_share.png" />
          </div>
        </div>
        <div class="top-left" v-if="i.category == '8'">
          <img class="circle" :src="i.author.web_url" />
          {{ i.author.user_name }}
        </div>
      </div>
      <div class="bai" :class="a == state.contentList.length - 1 ? 'ying': ''"></div>
    </div>
    <playControl></playControl>
  </div>
</template>

<style lang="scss" scoped>
#container {
  overflow: auto;
  // height: ;
}
.article {
  font-size: 6vw;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  height: calc(100vh - 50px);
  width: 100vw;
  overflow-x: auto;
  background: v-bind("state.bg");
  color: v-bind("state.color");
  // position: relative;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: sticky;
    top: 0;
    left: 0;
    padding: 0 12px 10px;
    width: 100vw;
    height: 50px;
    font-size: 12px;
    z-index: 10;
    background-color: rgba(255, 255, 255, 0.68);
    .head-top {
      display: flex;
      font-weight: 600;
      align-items: flex-end;
      .day {
        margin-right: 2px;
        flex: 0 0 35px;
        height: 28px;
        font-size: 28px;
      }
      .month {
        margin-right: 2px;
        flex: 0 0 23px;
        height: 13px;
      }

      .year {
        margin-left: 2px;
        flex: 0 0 30px;
        height: 13px;
      }
      span {
        display: block;
        margin-left: 7px;
        border: 10px solid black;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 0;
        width: 0;
        margin-bottom: 2px;
        height: 0;
      }
      .move-enter {
        transform: translateY(100%);
      }
      .move-leave-to {
        transform: translateY(-100%);
      }

      .move-enter-active,
      .move-leave-active {
        transition: all linear 0.5s;
      }

      .move-leave,
      .move-enter-to {
        transform: translateY(0);
      }
    }

    .head-right {
      span {
        margin-left: 7px;
        color: #bbb;
      }
    }
  }
  .content {
    // height: ;
    width: 94vw;
    margin-left: 3vw;
    margin-bottom: 20px;
    .tou {
      width: 94vw;
      .yue {
        font-size: 16px;
        margin-bottom: 25px;
        text-align: center;
        color: #999;
      }
      .title {
        font-size: 22px;
        font-weight: 600;
      }
      p {
        margin-top: 10px;
        font-size: 14px;
        color: #999;
      }
      .nei {
        margin-top: 20px;
        margin-bottom: 15px;
        word-break: break-all;
        font-size: 15px;
        color: #777;
      }
    }
    .content-top {
      margin-bottom: 36px;
      text-align: center;
      font-size: 14px;
      color: #aaa;
    }
    .content-bottom {
      height: 38vh;
      padding: 10px 20px 30px;
      box-shadow: 0px 1px 9px #ddd;

      div {
        text-align: center;
        font-size: 14px;
        color: #aaa;
      }
      p {
        margin-top: 30px;
        margin-bottom: 100px;
        word-break: break-all;
        font-size: 15px;
        line-height: 28px;
      }
    }

    .content-frame {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      padding: 0 8px;
      font-size: 12px;
      color: #999;
      line-height: 20px;
      margin-bottom: 15px;

      .top-left {
        height: 20px;
        display: flex;
        justify-content: space-between;
        .da {
          margin-right: 3px;
        }
      }
      .top-right {
        display: flex;
        height: 20px;
        justify-content: space-between;

        div {
          line-height: 20px;
        }
        .le {
          margin-right: 30px;
        }
        .les {
          display: flex;
          margin-right: 20px;
        }
        .you {
          margin-right: 5px;
        }
      }
    }
    .height {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      width: 94vw;
      height: 35vh;
      overflow: hidden;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }
      .height-top {
        position: absolute;
        top: 15px;
        left: 15px;
        font-size: 12px;
        line-height: 12px;
        color: #fff;
      }
      .nei {
        position: absolute;
        left: 15px;
        right: 15px;
        bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        p {
          flex: 1;
          font-size: 16px;
          margin-right: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .san {
          width: 32px;
          height: 32px;
        }
      }
    }
  }
  .bai {
    width: 100vw;
    margin-left: -3vw;
    height: 10px;
    background-color: rgb(238, 238, 238, 0.8);
  }

  .ying {
    display: none;
  }
  .da {
    width: 20px;
    height: 20px;
  }
  .calendar {
    position: fixed;
    z-index: 9;
    width: 100vw;
    bottom: 50px;
    color: #999;
    height: calc(100vh - 50px);
    background-color: rgb(255, 255, 255);
    overflow-x: auto;

    .calendar-content {
      width: 94vw;
      margin-left: 3vw;
      margin-top: 50px;
      .van-loading {
        text-align: center;
      }
      .content-top {
        display: flex;
        color: #999;
        h3 {
          font-size: 16px;
        }
        .line {
          position: relative;
          flex: 1;
          height: 1px;
          transform: scaleY(0.5);
        }
      }

      .content-bottom {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 20px;

        .bottom-content {
          flex: 0 0 calc(50% - 7.5px);
          margin-bottom: 10px;
          width: calc(50% - 7.5px);

          img {
            width: 100%;
            display: block;
          }
          p {
            border: 1px solid #aaa;
            padding: 15px;
            background-color: #eee;
            font-size: 18px;
            color: #777;
            text-align: center;
          }
        }
      }
    }
  }
  .circle {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
  .yuan {
    line-height: 25px !important;
  }
  .yi {
    margin-top: 5px;
  }
  .hou {
    margin-bottom: 65px !important;
  }
  .feng {
    flex-direction: row-reverse;
  }
}

.transitions-enter,
.transitions-leave-to {
  /* 刚进入时或完全离开后透明度为0 */
  opacity: 0;
}
.transitions-enter-active,
.transitions-leave-active {
  /* 设置过渡 */
  transition: all 0.2s linear;
}
.transitions-enter-to,
.transitions-leave {
  /* 刚离开时或完全进入后透明度为1 */
  opacity: 1;
}
</style>
