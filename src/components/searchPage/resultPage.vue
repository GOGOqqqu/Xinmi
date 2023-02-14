<template>
  <div class="resultPage" v-if="products != []">
    <div
      class="resultPage_item"
      v-for="i in products"
      :key="i.goods_id"
      @click="linkShopMain(i.goods_id)"
    >
      <div class="resultPage_item_img">
        <img
          :src="`https://img01.yimishiji.com/v1/img/${i.image_default_id}.webp`"
        />
      </div>
      <div class="resultPage_item_main">
        <div class="name van-ellipsis">{{ i.name }}</div>
        <div class="text van-ellipsis">{{ i.describe }}</div>
        <div class="size van-ellipsis">{{ i.unit }}</div>
        <div class="price" v-if="i.discount_price == i.price">
          {{ `￥${parseFloat(i.price)}` }}
        </div>
        <div class="sell_Price price" v-else>
          {{ `￥${parseFloat(i.discount_price)}`
          }}<span class="black">{{ `￥${parseFloat(i.price)}` }}</span>
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
export default {
  // import 引入的组件需要注入到对象中才能使用
  name: "resultPage",
  components: {},
  props: {
    result: [String, Number],
  },
  // 这里用于存放数据
  data() {
    return {
      products: [], //遍历所有商品的数组
    };
  },
  //  计算属性 类似于data概念
  computed: {
    ...mapState("shopMain", ["shopMessage"]), //向vuex的playPage模块中的state取值
  },
  //  监控data 中数据变化
  watch: {
    result() {
      console.log("this.result", this.result);
      this.sendData(this.result);
    },
  },
  //  方法集合
  methods: {
    ...mapMutations("shopMain", ["setShopMessage", "setShowShopMain"]),
    ...mapMutations("shopping", ["addGoods"]),
    sendData(value) {
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
        url: `api/v3/products/search?system_version=23&aaid=6e978207e5218d5ba332cec7b1b55953&sign=4E80D0534DCDC4C85A8BAC45AE388150&longitude=113.270796&platform=ANDROID&access_token=03e32273466e40edbee9e7111a559f1879f35a85&look_stock=true&suppress_response_code=true&keyword=${value}&version=91&device_model=SM-G9550&latitude=23.135312011187&device_token=3a9d878bbe058d4cf6f6f3dfc689900f&channel=tencent`,
      })
        .then(({ data }) => {
          console.log("item", data.results[0].products);
          this.products = data.results[0].products;
          this.$toast.clear(); //请求完成 关闭loading
        })
        .catch((error) => {
          console.log(error);
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
  },
  //  生命周期 -创建完成（可以访问当前this 实例）
  created() {},
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
.resultPage {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #f5f8fa;
  .resultPage_item {
    width: 45%;
    height: 36vh;
    margin: 1.2vh 2.5%;
    border-radius: 1.6vh;
    background-color: #fff;
    .resultPage_item_img {
      width: 100%;
      aspect-ratio: 1/1; //保持宽高等比
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 90%;
        display: block;
      }
    }

    .resultPage_item_main {
      width: 100%;
      padding: 0.5vh 3vw;
      display: flex;
      height: calc(100% - 45vw);
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: space-evenly;
      font-size: 1.2vh;
      .name {
        color: #333;
        width: 100%;
        font-weight: 600;
        font-size: 1.5vh;
      }

      .text {
        color: #666;
        width: 100%;
      }

      .size {
        color: #999;
        width: 100%;
        font-weight: 200;
        font-size: 1vh;
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
</style>
