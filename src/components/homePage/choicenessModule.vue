<template>
    <!-- 这是精选页面 -->
  <van-pull-refresh v-model="isLoading" :head-height="80" @refresh="onRefresh">
    <template #pulling="props">
      <img
          id="doge"
          src="@/assets/img/pic_event_empty.png"
          :style="{ transform: `scale(${props.distance / 80})` }"
      />
    </template>

    <!-- 释放提示 -->
    <template #loosing>
      <img id="doge" src="@/assets/img/pic_event_empty.png" />
    </template>

    <!-- 加载提示 -->
    <template #loading>
      <img id="doge" src="@/assets/img/img_special_time.png" />
    </template>
  <div class="choicenessModule">
    <div class="box" v-for="(item) in pageData" :key="item.w_id">

      <!-- 广告图片 完成-->
      <div class="ad-config" v-if="item.type === 'ad-config'">
        <img :src="'https://img01.yimishiji.com/v1/img/' + item.elements[0].value + '.webp'" alt="广告图片">
      </div>

      <!-- 商品列表 完成-->
      <div class="area" v-if="item.type === 'area'">

        <div class="title">
          <div class="left">
            <span>{{ item.attrs.title }}</span>
            <span>{{ item.attrs.desc }}</span>
          </div>
          <!-- 更多 有点击事件 -->
          <div class="right">
            更多
            <van-icon name="arrow"/>
          </div>
        </div>

        <div class="card_list">
          <div class="commodity_card" @click="clickCard(e.goods_id)" v-for="(e, index) in item.elements[0].products"
               :key="index">
            <commodity-card :merchandiseNews="e"/>
          </div>
        </div>

      </div>

      <!-- 步骤条 完成-->
      <div class="order-process" v-if="item.type === 'order-process'">
        <!--        order-process步骤条{{ index }}-->
        <div class="left">
          <p class="text_1">{{ item.attrs.title }}</p>
          <p class="text_2">
            查看活动
            <van-icon name="arrow"/>
          </p>
          <div class="steps">
            <van-steps :active="processValue" active-color="#f38337" inactive-color="#f38338" active-icon="circle"
                       inactive-icon="circle" finish-icon="passed">
              <!--              <van-step>{{ item.elements[0].value }}</van-step>-->
              <!--              <van-step>{{ item.elements[1].value }}</van-step>-->
              <!--              <van-step>{{ item.elements[2].value }}</van-step>-->
              <van-step v-for="(e, index) in item.elements" :key="index">{{ e.value }}</van-step>
            </van-steps>
          </div>
        </div>
        <div class="right">
          <img :src="'https://img01.yimishiji.com/v1/img/' + item.attrs.poster + '.webp'" alt="">
        </div>
      </div>

      <!-- 品牌价值 完成-->
      <div class="brand-value" v-if="item.type === 'brand-value'">
        <span v-for="(e, index) in item.elements" :key="index">
          <van-icon name="checked"/> {{ e.value }}
        </span>
      </div>

      <!-- 公告 完成-->
      <div class="announcement" v-if="item.type === 'announcement'">
        <div class="title">一米公告</div>
        <div class="active_text">
          <van-swipe style="height: 4vw;" vertical height="15px" :show-indicators="false" :autoplay="3000">
            <van-swipe-item v-for="(e, index) in item.elements" :key="index">{{ e.value }}</van-swipe-item>
          </van-swipe>
        </div>
      </div>

      <!-- 最热销榜 -->
      <div class="top-selling" v-if="item.type === 'top-selling'">
        <!-- 背景板 -->
        <div class="bg"></div>

        <div class="crosswise_list">
          <van-swipe :loop="false" :width="130" :show-indicators="false">
            <van-swipe-item v-for="(e, index) in item.elements[0].products" :key="index">
              <div class="commodity_card" @click="clickCard(e.goods_id)">
                <div class="ranking"
                     :class="{ranking_1: index+1 === 1, ranking_2: index+1 >= 2, ranking_3: index+1 >= 4,} ">
                  {{ index + 1 }}
                </div>
                <commodity-card :merchandiseNews="e"/>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>

      <!-- 公告下的小图标 完成-->
      <div class="icon-config" v-if="item.type === 'icon-config'">
        <div class="commodity_item" v-for="(e, index) in item.elements" :key="index">
          <div class="pic">
            <img :src="'https://img01.yimishiji.com/v1/img/' + e.value + '.webp'" alt="">
          </div>
          <p>{{ e.attrs.title }}</p>
        </div>
      </div>

      <!-- 轮播图 完成-->
      <div class="slider" v-if="item.type === 'slider'">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(e, index) in item.elements" :key="index">
            <img :src="'https://img01.yimishiji.com/v1/img/' + e.value + '.webp'" alt="">
          </van-swipe-item>
        </van-swipe>
      </div>

      <!-- 猜你喜欢 完成-->
      <div class="guess-like" v-if="item.type === 'guess-like'">
        <!-- 标题 -->
        <div class="title">
          <div class="pic">
            <img src="@/assets/homePage/title_left.png" alt="">
          </div>
          <span>猜你喜欢</span>
          <div class="pic">
            <img src="@/assets/homePage/title_right.png" alt="">
          </div>
        </div>

        <!-- 商品卡片-->
        <div class="card_list">
          <div class="commodity_card" @click="clickCard(e.goods_id)" v-for="(e, index) in item.elements[0].products"
               :key="index">
            <commodity-card :merchandiseNews="e"/>
          </div>
        </div>
      </div>

      <!-- 右下角悬浮小窗口 完成-->
      <div class="float-window" v-if="item.type === 'float-window'">
        <img :src="'https://img01.yimishiji.com/v1/img/' + item.elements[0].value + '.webp'" alt="">
      </div>

      <!-- 弹出广告 完成-->
      <div class="popup-adv" v-if="item.type === 'popup-adv'">
        <!--        <van-dialog v-model="showAD" title="" confirmButtonText="关闭" confirmButtonColor="#000000">-->
        <!--          <img :src="'https://img01.yimishiji.com/v1/img/' + item.elements[0].value + '.webp'" alt=""/>-->
        <!--        </van-dialog>-->
      </div>

    </div>
  </div>
  </van-pull-refresh>
</template>

<script>
// 这里可以导入其他文件 例如：组件、工具js、第三方插件js,json文件、图片文件等
// eg: import 《组件名称》 from '《文件路径》'
import CommodityCard from "@/components/commodityCard";
import {mapMutations, mapState} from "vuex";
import { Toast } from 'vant';

export default {
  // import 引入的组件需要注入到对象中才能使用
  components: {CommodityCard},
  props: {},
  // 这里用于存放数据
  data() {
    return {
      pageData: [], // 页面数据 数组
      processValue: 2, // 步骤条的值
      isLoading: false,

      // popUpAdUrl: '', // 弹窗广告图片url
      showAD: true, // 弹出广告的布尔
    }
  },
//  计算属性 类似于data概念
  computed: {
    ...mapState("shopMain", ["shopMessage"]), //向vuex的playPage模块中的state取值
  },
//  监控data 中数据变化
  watch: {
    popUpAdUrl(newV) {
      console.log('newV', newV)
    }
  },
//  方法集合
  methods: {
    ...mapMutations("shopMain", ["setShopMessage", "setShowShopMain"]),
    ...mapMutations("homePage", ["setPopUpAdUrl"]),

    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 1000);
    },

    // 获取 axios 数据
    getData() {
      // 预加载
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: "加载中...",
        className: "showList_toast",
      });

      // 请求 首页精选 的数据
      this.$axios({
        method: "get",
        url: "api/v3/apppages/layout",
      })
          .then(({data}) => {
            // console.log("精选data", data.results[0].rows);
            this.pageData = data.results[0].rows

            let popUpAdUrl = this.pageData[this.pageData.length - 1].elements[0].value

            this.setPopUpAdUrl(popUpAdUrl)

            // console.log('this.popUpAdUrl', this.popUpAdUrl);

            this.$toast.clear(); //请求完成 关闭loading
          })
          .catch((error) => {
            console.log(error);
          });
    },

    //商品卡片点击事件
    clickCard(id) {
      console.log("点击商品卡片 id 为", id);
      // id != this.shopMessage.goods_id
      if (id !== this.shopMessage.goods_id) {
        //如果点击了非同一个商品 进行加载
        //跳转商品详情页
        this.setShopMessage({}); //请求前清空原有数据

        this.$axios({
          method: "get",
          url: `api/v3/products/${id}?longitude=113.270796&version=90&latitude=23.135312011187`,
        })
            .then(({data}) => {
              console.log("data", data.results[0]);
              this.setShopMessage(data.results[0]);
            })
            .catch((error) => {
              console.log(error);
            });
      }
      this.setShowShopMain(true); //让商品详情页显示出来
    }
  },
//  生命周期 -创建完成（可以访问当前this 实例）
  created() {
    this.getData()
  },
//  生命周期 - 挂载完成（可以访问Dom元素）
  mounted() {
  },
//  生命周期 - 创建之前
  beforeCreate() {
  },
//  生命周期 - 挂载之前
  beforeMount() {
  },
//  生命周期 - 更新之前
  beforeUpdate() {
  },
//  生命周期 - 更新之后
  updated() {
  },
//  生命周期 - 销毁之前
  beforeDestroy() {
  },
//  生命周期 - 销毁完成
  destroyed() {
  },
// 如果页面有keep-alive 缓存功能，这个函数会触发
  activated() {
  }

}
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  display: block;
}

#doge {
  width: 140px;
  height: 72px;
  //margin-top: 8px;
  border-radius: 4px;
  margin: 8px auto 0 ;
}

.choicenessModule {
  height: 78vh;
  overflow: scroll;
  background-color: #f4f8fb;

  .box {
    width: 100vw;


    & > div {
      padding: 2vw;
      margin: 2vw 0;
      width: 100vw;
    }

    // 广告图片
    .ad-config {
      margin: 0;

      img {
        border-radius: 5px;
      }
    }

    // 步骤条
    .order-process {
      width: 96vw;
      box-sizing: border-box;
      padding: 3vw;
      background-image: url("@/assets/homePage/order-process-bg_img.webp");
      background-size: 94vw;
      margin: 0 2vw;
      background-repeat: no-repeat;
      display: flex;
      justify-content: space-around;

      .left {
        width: 60vw;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .text_1 {
          font-size: 17px;
        }

        .text_2 {
          color: #f38337;
          font-size: 14px;
        }

        .steps {
          color: #f38337;
        }
      }

      .right {
        width: 25%;
      }
    }

    // 商品列表
    .area {
      background-color: #fff;
      padding: 3vw 2vw;

      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2vw;

        .left {
          display: flex;
          align-items: center;

          span:first-child {
            font-size: 15px;
          }

          span:last-child {
            margin-left: 2vw;
            font-size: 12px;
            color: #aaa;
          }
        }

        .right {
          font-size: 12px;
          color: #aaa;
        }
      }

      .card_list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: 2vw;
        row-gap: 3vw;

        .commodity_card {
          width: 30vw;
        }
      }

    }

    // 轮播图
    .slider {
      //border-radius: 1vw;
      //overflow: hidden;

      // vant 轮播图组件样式
      .my-swipe .van-swipe-item {
        border-radius: 2vw;
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        background-color: transparent;
      }
    }

    //品牌价值
    .brand-value {
      display: flex;
      justify-content: space-around;

      span {
        font-size: 13px;
        color: #8bb4d2;
      }
    }

    // 公告下的小图标
    .icon-config {
      background-color: #fff;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

      .commodity_item {

        .pic {
          width: 15vw;
          margin: 0 auto;
        }

        p {
          font-size: 12px;
          text-align: center;
          margin-top: 3vw;
        }
      }
    }

    // 公告
    .announcement {
      background-color: #f1f1f1;;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 96vw;
      margin: 2vw auto;
      border-radius: 1vw;

      .title {
        width: 20%;
        color: #f26160;
        font-weight: bold;
        height: 6vw;
        line-height: 6vw;
      }

      .active_text {
        width: 80%;
        color: #666;
        font-size: 14px;
      }
    }

    // 最热销榜
    .top-selling {
      padding: 0;
      position: relative;

      .bg {
        width: 100vw;
        height: 36vw;
        background: url("@/assets/img/ic_hot_sales_ranking_bg.png") no-repeat;
        background-size: 100%;
        position: absolute;
        top: 0;
        z-index: 0;
      }

      .crosswise_list {
        padding-top: 23vw;

        .commodity_card {
          width: 32vw;
          border-radius: 5px;
          padding: 2vw;
          background-color: #fff;
          position: relative;

          .ranking_1 {
            background-image: url("@/assets/img/ic_ranking_product_yellow.png");
          }

          .ranking_2 {
            background-image: url("@/assets/img/ic_ranking_product_brown.png");
          }

          .ranking_3 {
            background-image: url("@/assets/img/ic_ranking_product_green.png");
          }

          .ranking {
            background-repeat: no-repeat;
            position: absolute;
            top: -0.5vw;
            left: -1vw;
            z-index: 2;
            width: 9vw;
            height: 10vw;
            background-size: 100%;
            text-align: center;
            line-height: 7vw;
            color: #fff;
          }
        }
      }
    }

    // 猜你喜欢
    .guess-like {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .title {
        display: flex;
        margin: 0 auto;
        align-items: center;
        width: 96vw;
        justify-content: center;
        padding: 2vw 0;

        .pic {
          width: 6vw;
        }

        span {
          color: #24353d;
        }
      }

      .card_list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 2vw;
        row-gap: 3vw;

        .commodity_card {
          background-color: #fff;
          width: 46vw;
          padding: 3vw;
        }
      }
    }

    // 右下角悬浮小窗口
    .float-window {
      width: 16vw;
      position: fixed;
      bottom: 6px;
      right: 8px;
    }
  }
}

</style>