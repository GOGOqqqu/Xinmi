<template>
  <div class="defaultPage">
    <div class="searchHistory hotSearch" v-if="searchHistory.length != 0">
      <div class="searchHistory_title hotSearch_title">
        历史记录
        <div class="icon" @click="delete_history">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-basket"
            viewBox="0 0 16 16"
          >
            <path
              d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z"
            />
          </svg>
        </div>
      </div>
      <div class="hotSearch_box">
        <div
          class="searchHistory_item"
          v-for="item in searchHistory"
          :key="item"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="hotSearch" v-if="hot">
      <div class="hotSearch_title">热门搜索</div>
      <div class="hotSearch_box">
        <div class="hotSearch_item" v-for="item in hot" :key="item.value">
          {{ item.value }}
        </div>
      </div>
    </div>
    <div class="SearchTop" v-if="top != []">
      <div class="SearchTop_img">
        <img src="@/assets/search/hot.png" />
      </div>
      <div class="SearchTop_main">
        <div
          class="SearchTop_main_item"
          v-for="(i, index) in top"
          :key="i.image_default_id"
          @click="linkShopMain(i.goods_id)"
        >
          <div class="goods_img">
            <img
              :src="`https://img01.yimishiji.com/v1/img/${i.image_default_id}.webp`"
            />
            <div class="icon">
              <img src="@/assets/search/ic_search_1.png" v-if="index == 0" />
              <img
                src="@/assets/search/ic_search_2.png"
                v-else-if="index == 1"
              />
              <img
                src="@/assets/search/ic_search_3.png"
                v-else-if="index == 2"
              />
              <img
                src="@/assets/search/ic_search_4.png"
                v-else-if="index == 3"
              />
              <img
                src="@/assets/search/ic_search_5.png"
                v-else-if="index == 4"
              />
              <img
                src="@/assets/search/ic_search_6.png"
                v-else-if="index == 5"
              />
              <img
                src="@/assets/search/ic_search_7.png"
                v-else-if="index == 6"
              />
              <img
                src="@/assets/search/ic_search_8.png"
                v-else-if="index == 7"
              />
              <img src="@/assets/search/ic_search_9.png" v-else />
            </div>
          </div>
          <div class="goods_main">
            <div class="goods_main_name van-ellipsis">{{ i.name }}</div>
            <div class="goods_main_text van-ellipsis">{{ i.describe }}</div>
            <div class="price" v-if="i.discount_price == i.price">
              {{ `￥${parseFloat(i.price)}` }}
            </div>
            <div class="sell_Price price" v-else>
              {{ `￥${parseFloat(i.discount_price)}`
              }}<span class="black">{{ `￥${parseFloat(i.price)}` }}</span>
            </div>
            <div class="addButton" @click.stop="addGoodsButton(i.goods_id)">
              +
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件 例如：组件、工具js、第三方插件js,json文件、图片文件等
// eg: import 《组件名称》 from '《文件路径》'
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import { Dialog } from "vant";
export default {
  // import 引入的组件需要注入到对象中才能使用

  name: "defaultPage",
  components: {},
  props: {},
  // 这里用于存放数据
  data() {
    return {
      hot: [],
      top: [],
    };
  },
  //  计算属性 类似于data概念
  computed: {
    ...mapState("searchPage", ["searchHistory"]), //向vuex的playPage模块中的state取值
    ...mapState("shopMain", ["shopMessage"]), //向vuex的playPage模块中的state取值
  },
  //  监控data 中数据变化
  watch: {},
  //  方法集合
  methods: {
    ...mapMutations("searchPage", ["setSearchHistory", "addSearchHistory"]),
    ...mapMutations("shopMain", ["setShopMessage", "setShowShopMain"]),
    ...mapMutations("shopping", ["addGoods"]),

    sendData() {
      this.$toast.loading({
        //开始loading
        //开始网络请求时 进行loading
        duration: 0, //持续加载
        forbidClick: true, //禁止在加载过程中点击背景
        message: "加载中...",
        className: "showList_toast", //自定义类名 用于更改样式
      });
      this.$axios({
        method: "get",
        url: "api/v3/apppages/layout?platform=ANDROID&system_version=23&aaid=6e978207e5218d5ba332cec7b1b55953&sign=FB66CB95EE96A5E04731ACB987D04CA2&access_token=03e32273466e40edbee9e7111a559f1879f35a85&suppress_response_code=true&longitude=113.270796&page_type=search_keywords&version=91&device_model=SM-G9550&latitude=23.135312011187&device_token=3a9d878bbe058d4cf6f6f3dfc689900f&channel=tencent",
      })
        .then(({ data }) => {
          // console.log("sendData", data.results[0].rows[0].elements);
          this.hot = data.results[0].rows[0].elements;
          this.$emit(
            "setPlaceholder",
            data.results[0].rows[0].elements[0].value
          );
        })
        .catch((error) => {
          console.log(error);
        });

      this.$axios({
        method: "get",
        url: "api/v3/products/search-recommended?platform=ANDROID&system_version=23&aaid=6e978207e5218d5ba332cec7b1b55953&sign=E6D1516A97B33C8A95BFDE8CBB8BB509&access_token=03e32273466e40edbee9e7111a559f1879f35a85&suppress_response_code=true&longitude=113.270796&version=91&device_model=SM-G9550&latitude=23.135312011187&device_token=3a9d878bbe058d4cf6f6f3dfc689900f&channel=tencent",
      })
        .then(({ data }) => {
          console.log("item", data.results[0].products);
          this.top = data.results[0].products;
        })
        .catch((error) => {
          console.log(error);
        });

      let History = localStorage.searchHistory
        ? JSON.parse(localStorage.searchHistory)
        : []; //从localStorage中取出历史记录

      this.setSearchHistory(History);
      this.$toast.clear(); //请求完成 关闭loading
    },

    delete_history() {
      Dialog.confirm({
        message: "确认删除历史记录？",
      })
        .then(() => {
          // on confirm

          localStorage.searchHistory = JSON.stringify([]);
          this.setSearchHistory([]);
        })
        .catch(() => {
          // on cancel
        });
    },

    linkShopMain(id) {
      if (id != this.shopMessage.goods_id) {
        //如果点击了非同一个商品 进行加载
        //跳转商品详情页
        this.setShopMessage({}); //请求前清空原有数据

        this.$axios({
          method: "get",
          url: `api/v3/products/${id}?longitude=113.270796&version=90&latitude=23.135312011187`,
        })
          .then(({ data }) => {
            console.log("data", data.results[0]);
            this.setShopMessage(data.results[0]);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      this.setShowShopMain(true); //让商品详情页显示出来
    },

    addGoodsButton(id) {
      this.$axios({
        method: "get",
        url: `api/v3/products/${id}?longitude=113.270796&version=90&latitude=23.135312011187`,
      })
        .then(({ data }) => {
          let goods = data.results[0];
          this.addGoods({
            name: goods.name,
            size: goods.unit,
            price: parseFloat(goods.price),
            sell_price: parseFloat(goods.discount_price),
            num: 1,
            checked: true,
            img: `https://img01.yimishiji.com/v1/img/${goods.image_default_id}.webp`,
            goods_id: goods.goods_id,
          }); //调用添加商品事件
          this.$toast.success("已添加购物篮");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  //  生命周期 -创建完成（可以访问当前this 实例）
  created() {
    this.sendData();
  },
  //  生命周期 - 挂载完成（可以访问Dom元素）
  mounted() {},
  //  生命周期 - 创建之前
  beforeCreate() {},
  //  生命周期 - 挂载之前
  beforeMount() {},
  //  生命周期 - 更新之前
  beforeUpdate() {},
  //  生命周期 - 更新之后
  updated() {},
  //  生命周期 - 销毁之前
  beforeDestroy() {},
  //  生命周期 - 销毁完成
  destroyed() {},
  // 如果页面有keep-alive 缓存功能，这个函数会触发
  activated() {},
};
</script>

<style lang="scss" scoped>
.defaultPage {
  width: 100%;

  .searchHistory {
    width: 100%;
    padding: 2vh 3vw;
    .hotSearch_title {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .icon {
        height: 2.5vh;

        svg {
          height: 100%;
        }
      }
    }
  }

  .hotSearch {
    width: 100%;
    padding: 2vh 3vw;

    .hotSearch_title {
      width: 100%;
      font-size: 2vh;
      font-weight: 600;
      margin: 1vh 0;
    }

    .hotSearch_box {
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      .searchHistory_item {
        padding: 1.2vh 6vw;
        letter-spacing: 0.5px;
        color: #666;
        font-size: 1.6vh;
        margin: 1vh 3vw;
        background-color: #f5f8fa;
        border-radius: 2vh;
      }

      .hotSearch_item {
        padding: 1.2vh 6vw;
        letter-spacing: 0.5px;
        color: #666;
        font-size: 1.6vh;
        margin: 1vh 3vw;
        background-color: #f5f8fa;
        border-radius: 2vh;

        &:nth-child(1) {
          color: #fa5555;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 2.4vh;
          &::before {
            content: "";
            display: block;
            height: 2.4vh;
            aspect-ratio: 1/1; //保持宽高等比
            background: url(@/assets/search/fire.png) no-repeat center center;
            background-size: cover;
            margin-right: 1.5vw;
          }
        }
      }
    }
  }

  .SearchTop {
    width: 100%;
    .SearchTop_img {
      width: 100%;
      padding: 1vh 4vw 2vh;
      img {
        width: 100%;
        display: block;
      }
    }

    .SearchTop_main {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      margin-bottom: 4vh;
      .SearchTop_main_item {
        width: 30%;
        height: 25vh;
        // background-color: cyan;
        margin: 1vw 0;
        .goods_img {
          width: 100%;
          height: 14vh;
          position: relative;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            display: block;
            border-radius: 2.5vh;
          }

          .icon {
            position: absolute;
            left: 0%;
            top: 0%;
            width: 50%;
            img {
              width: 100%;
              display: block;
            }
          }
        }
        .goods_main {
          padding: 1.2vh 1vw;
          height: calc(100% - 14vh);
          display: flex;
          flex-wrap: wrap;
          position: relative;
          .goods_main_name {
            font-size: 1.6vh;
            font-weight: 600;
            color: #333;
            padding-top: 0.2vh;
          }

          .goods_main_text {
            font-size: 1vh;
            color: #999;
            font-weight: 200;
            height: 2vh;
          }

          .addButton {
            position: absolute;
            right: 0%;
            bottom: 16%;
            width: 4vw;
            height: 4vw;
            border-radius: 999px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
            background: #e3f2fe;
            padding: 1.2vh;
          }

          .price {
            font-size: 1.6vh;
            color: #72b567;
            font-weight: bold;
            margin-top: 1vh;

            &.sell_Price {
              color: #fa5555;
              display: flex;
              align-items: center;

              .black {
                color: #666;
                font-size: 0.8vh;
                font-weight: 200;
                text-decoration: line-through;
              }
            }
          }
        }
      }
    }
  }
}
</style>
