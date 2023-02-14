<template>
  <!-- 这是通用组件 -->
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

  <div class="generalModule">
    <!-- 下拉菜单 -->
    <div class="dropdown">
      <van-dropdown-menu>
        <!-- 筛选1 -->
        <van-dropdown-item get-container="body" v-model="value1" :options="option1"/>
        <!-- 筛选2 -->
        <van-dropdown-item get-container="body" v-model="value2" :options="option2"/>
        <!-- 筛选2 -->
        <van-dropdown-item get-container="body" title="筛选" ref="item" @closed="closedFilter3">

          <template>
            <div class="filter_box">

              <!-- 筛选一 -->
              <div class="filter">

                <div class="btn_list">
                  <div class="item_box" v-for="item in web_tags" :key="item.tag_id"
                       :class="{active: temp_web_tags.includes(item.tag_id)}" @click="changeTag(item.tag_id)">
                    {{ item.tag_name }}
                  </div>
                </div>
              </div>

              <!-- 价格范围 -->
              <div class="double-slider" style="">
                <div class="title">价格范围</div>
                <div class="showPrice" style="">
                  <span>&yen;{{ sliderValue[0] }}</span>
                  <span>&yen;{{ sliderValue[1] }}</span>
                </div>
                <van-slider v-model="sliderValue" range :min="min_price ? min_price : 0"
                            :max="max_price ? max_price : 0"/>
              </div>

              <!-- 农村筛选 -->
              <div class="filter">
                <div class="title">农场</div>
                <div class="btn_list">
                  <div class="item_box" v-for="item in farmer" :key="item.farmer_id"
                       :class="{active: temp_farmer.includes(item.farmer_id)}" @click="changeFarmer(item.farmer_id)">
                    {{ item.farmer_name }}
                  </div>
                </div>
              </div>

              <!-- 做个选择 -->
              <div class="filter">
                <div class="title">做个选择</div>
                <div class="btn_list">
                  <div class="item_box" v-for="item in goods_tags" :key="item.tag_id" @click="changeGoods(item.tag_id)"
                       :class="{active: temp_goods_tags.includes(item.tag_id)}">
                    {{ item.tag_name }}
                  </div>
                </div>
              </div>

            </div>
          </template>

          <div style="padding: 5px 16px;">
            <van-button type="danger" block round color="#274e6c" @click="onConfirm">
              确认
            </van-button>
          </div>

        </van-dropdown-item>

      </van-dropdown-menu>
    </div>

    <!-- 内容列表 -->
    <div class="content">
      <!-- 图片 1 -->
      <div class="pic_1" v-if="titlePic?.pic_1">
        <img :src="'https://img01.yimishiji.com/v1/img/' + titlePic.pic_1 + '.webp'"
             alt="pic">
      </div>
      <!-- 图片 2 -->
      <div class="pic_2" v-if="titlePic?.pic_2">
        <img :src="'https://img01.yimishiji.com/v1/img/' + titlePic.pic_2 + '.webp'"
             alt="pic">
      </div>

      <!-- 商品卡片 -->
      <div class="card_list" v-show="commodityList.length !== 0">
        <div class="commodity_card" v-for="(item, index) in commodityList" :key="index" @click="clickCard(item.goods_id)">
          <commodity-card :merchandiseNews="item"/>
        </div>
      </div>
      <van-divider :style="{ color: '#97999b', borderColor: '#97999b', padding: '0 30vw' }"
                   v-show="commodityList.length !== 0">已经到底了
      </van-divider>

      <van-empty image="search" description="筛选无结果，请尝试其他选项或者：" v-show="commodityList.length === 0">
        <van-button round type="danger" class="bottom-button" color="#1e384b" @click="listNoData">清空筛选器
        </van-button>
      </van-empty>
    </div>
  </div>
  </van-pull-refresh>
</template>

<script>

import CommodityCard from "@/components/commodityCard";
import {mapMutations, mapState} from "vuex";
import { Toast } from 'vant';

export default {
  // import 引入的组件需要注入到对象中才能使用
  components: {CommodityCard},
  props: {
    catId: {
      type: String,
      require: true
    }
  },
  // 这里用于存放数据
  data() {
    return {
      id: this.catId, //  请求Id
      titlePic: null, // 顶部图片
      commodityList: [], // 商品列表
      isLoading: false,

      // 下拉菜单 data >>>>>>>>>>
      // 筛选1
      value1: this.catId,
      option1: [
        {text: '全部分类', value: this.catId},
      ],

      // 筛选2
      value2: 'default_sort',
      option2: [
        {text: '综合排序', value: 'default_sort'},
        {text: '评价最高', value: 'comment_desc'},
        {text: '销量最高', value: 'sales_volume_desc'},
        {text: '价格优先', value: 'price_asc'},
        {text: '新品优先', value: 'fresh'},
      ],

      // 筛选3 上
      web_tags: [],
      temp_web_tags: [],
      tagsList: [],
      // 滑块
      sliderValue: [], // 滑块
      // sliderValue: [5.5, 20000], // 滑块
      activeSliderValue: [],
      max_price: '',
      min_price: '',
      // 筛选3 中
      farmer: [],
      temp_farmer: [],
      farmerList: [],
      // 筛选3 下
      goods_tags: [],
      temp_goods_tags: [],
      goodsList: [],
      // 下拉菜单 data <<<<<
    }
  },
//  计算属性 类似于data概念
  computed: {
    listUrl() {
      return `api/v2/products/list?goods_tag=${this.goodsList.join('_')}&farmer_id=${this.farmerList.join('_')}&web_tag=${this.tagsList.join('_')}&cat_id=${this.value1}&order_by=${this.value2}&price_range=${this.activeSliderValue.join('_')}&page_size=30&page=1`
    },
    ...mapState("shopMain", ["shopMessage"]), //向vuex的playPage模块中的state取值
  },
//  监控data 中数据变化
  watch: {
    listUrl(newValue) {
      this.getCommodityList(newValue)
    }
  },
//  方法集合
  methods: {
    ...mapMutations("shopMain", ["setShopMessage", "setShowShopMain"]),

    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 1000);
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
    },

    // 获取第一个筛选数据
    getOption_1() {
      this.$axios({
        method: 'get',
        url: `api/v2/categories/subclass?parent_id=${this.id}`,
      }).then(({data}) => {
        // console.log('通用 data',data.results)
        data.results.map(i => {
          let t = {
            text: i.cat_name,
            value: i.cat_id
          }
          this.option1 = [...this.option1, t]
        })
      })
          .catch((error) => {
            console.log(error);
          });
    },

    // 获取第三个筛选数据
    getOption_3() {
      this.$axios({
        method: 'get',
        url: `api/v2/products/list_conditions?cat_id=${this.id}`,
      }).then(({data}) => {
        console.log('第三个筛选数据', data.results[0])
        let d = data.results[0]
        this.web_tags = d.web_tags;
        this.farmer = d.farmer;
        this.goods_tags = d.goods_tags;

        this.sliderValue = [Number(d.price_range.min_price), Number(d.price_range.max_price)];
        this.activeSliderValue = this.sliderValue
        this.min_price = d.price_range.min_price;
        this.max_price = d.price_range.max_price;

        this.getCommodityList(this.listUrl)
      })
          .catch((error) => {
            console.log(error);
          });
    },

    // 获取title 头图 && 视频
    getTitleData() {
      this.$axios({
        method: 'get',
        url: `api/v3/categories/${this.catId}?system_version=23&aaid=6e978207e5218d5ba332cec7b1b55953&sign=C68408A246BC2D02C7BBD24750307F69&longitude=113.270796&platform=ANDROID&area_id=440100&access_token&suppress_response_code=true&version=91&device_model=SM-G9550&latitude=23.135312011187&device_token=3a9d878bbe058d4cf6f6f3dfc689900f&channel=tencent`,
      }).then(({data}) => {
        // console.log('getTitleData', data)
        this.titlePic = {
          pic_1: data.results[0].banner_list_cms[0].elements[0].value,
          pic_2: data.results[0].product_selection_concept_image[0].imageId,
        }
        // console.log('this.titlePic', this.titlePic);
      })
          .catch((error) => {
            console.log(error);
          });
    },

    // 获取商品列表
    getCommodityList(url) {
      this.commodityList = []
      console.log(url);
      // 预加载
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: "加载中...",
        className: "showList_toast",
      });

      this.$axios({
        method: 'get',
        url: url,
      }).then(({data}) => {
        // console.log('商品列表', data.results[0].products)

        this.commodityList = data.results[0].products
        // console.log('this.commodityList', this.commodityList);
        this.$toast.clear(); //请求完成 关闭loading
      })
          .catch((error) => {
            console.log(error);
          });
    },

    changeTag(value) {
      if (this.temp_web_tags.includes(value)) {
        this.temp_web_tags = this.temp_web_tags.filter(i => {
          return value !== i
        })
        return
      }
      this.temp_web_tags = [...this.temp_web_tags, value]
      console.log('temp_web_tags', this.temp_web_tags);
    },
    changeFarmer(value) {
      if (this.temp_farmer.includes(value)) {
        this.temp_farmer = this.temp_farmer.filter(i => {
          return value !== i
        })
        return
      }
      this.temp_farmer = [...this.temp_farmer, value]
      console.log('this.temp_farmer', this.temp_farmer);
    },
    changeGoods(value) {
      if (this.temp_goods_tags.includes(value)) {
        this.temp_goods_tags = this.temp_goods_tags.filter(i => {
          return value !== i
        })
        return
      }
      this.temp_goods_tags = [...this.temp_goods_tags, value]
      console.log('this.temp_goods_tags', this.temp_goods_tags);
    },

    // 下拉菜单 确认事件
    onConfirm() {
      this.$refs.item.toggle();

      this.activeSliderValue = this.sliderValue

      this.tagsList = this.temp_web_tags;
      this.farmerList = this.temp_farmer
      this.goodsList = this.temp_goods_tags
      console.log('确认关闭')
    },

    // 下拉菜单 关闭事件
    closedFilter3() {
      console.log('动画关闭');
      this.temp_web_tags = this.tagsList
      this.temp_farmer = this.farmerList
      this.temp_goods_tags = this.goodsList
    },

    // 列表无数据事件
    listNoData() {
      this.value1 = this.id

      this.tagsList = [];
      this.farmerList = []
      this.goodsList = []
    }
  },
//  生命周期 -创建完成（可以访问当前this 实例）
  created() {
    this.getOption_1();
    this.getTitleData();
    this.getOption_3();

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

// 空列表组件 按钮
.bottom-button {
  width: 160px;
  height: 40px;
}

// 插槽 过滤
.filter_box {
  background-color: #ffffff;
  height: 40vh;
  overflow: scroll;

  & > div {
    padding: 2vw 3vw;
  }

  // 过滤
  .filter {

    .title {
      color: #b3b3b3;
      font-size: 13px;
      margin-bottom: 4vw;
    }

    .btn_list {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      column-gap: 1vw;
      row-gap: 2vw;

      .item_box {
        height: 10vw;
        line-height: 10vw;
        background-color: #fafafb;
        color: #6d6d6d;
        text-align: center;
        font-size: 14px;
      }

      // 点击
      .active {
        background-color: #e8f0f6;
        color: #1e384b;
      }
    }


  }

  // 双滑块
  .double-slider {
    height: 20vw;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .title {
      color: #b3b3b3;
      font-size: 13px;
      margin-bottom: 4vw;
    }

    .showPrice {
      margin-bottom: 3vw;
      font-size: 15px;
      display: flex;
      justify-content: space-between
    }
  }
}


// 根
.generalModule {
  height: 78vh;
  //height: 50vh;
  overflow: scroll;
  background-color: #f4f8fb;

  // 下拉菜单
  .dropdown {
    position: sticky;
    top: 0;
  }

  // 内容列表
  .content {

    & > div {
      padding: 2vw;
      margin: 2vw 0;
      width: 100vw;
    }

    .card_list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 2vw;
      row-gap: 3vw;

      .commodity_card {
        background-color: #ffffff;
        width: 47vw;
        padding: 3vw 3vw;
      }
    }


  }


}
</style>