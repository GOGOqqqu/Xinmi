<template>
  <!-- 第二页组件 -->
  <div class="secondM">
    <!-- 头图 img -->
    <div class="ad_Pic_1">
      <img :src="'https://img01.yimishiji.com/v1/img/' + adPic_1 + '.webp'" alt="广告图片">
    </div>
    <!-- 邀新团 img -->
    <div class="ad_Pic_2">
      <img :src="'https://img01.yimishiji.com/v1/img/' + adPic_2 + '.webp'" alt="广告图片">
    </div>

    <!-- 商品列表 1 -->
    <div class="product_list">
      <div class="commodity_list" @click="clickCard(item.goods_id)" v-for="item in productList_1"
           :key="item.product_id">
        <square-card :commodityData="item"/>
      </div>
    </div>

    <!-- 拼热团 img -->
    <div class="ad_Pic_3">
      <img :src="'https://img01.yimishiji.com/v1/img/' + adPic_3 + '.webp'" alt="广告图片">
    </div>

    <!-- 大商品卡片 -->
    <div class="product_card" @click="clickCard(productCard.goods_id)">
      <rectangular-card v-if="productCard !== {}" :commodityData="productCard"/>
    </div>

    <!-- 商品列表 2 -->
    <div class="product_list">
      <div class="commodity_list" @click="clickCard(item.goods_id)" v-for="item in productList_2"
           :key="item.product_id">
        <square-card :commodityData="item"/>
      </div>
    </div>

  </div>
</template>

<script>
// 这里可以导入其他文件 例如：组件、工具js、第三方插件js,json文件、图片文件等
// eg: import 《组件名称》 from '《文件路径》'
import SquareCard from "@/components/squareCard";
import RectangularCard from "@/components/rectangularCard";
import {mapMutations, mapState} from "vuex";

export default {
  // import 引入的组件需要注入到对象中才能使用
  components: {RectangularCard, SquareCard},
  props: {},
  // 这里用于存放数据
  data() {
    return {
      adPic_1: '', // 头图 img
      adPic_2: '', // 邀新团 img
      productList_1: [], // 商品列表 1
      adPic_3: '', // 拼热团 img
      productCard: {}, // 商品大卡片
      productList_2: [] // 商品列表 2
    }
  },
//  计算属性 类似于data概念
  computed: {
    ...mapState("shopMain", ["shopMessage"]), //向vuex的playPage模块中的state取值
  },
//  监控data 中数据变化
  watch: {},
//  方法集合
  methods: {
    getDat() {
      // 预加载
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: "加载中...",
        className: "showList_toast",
      });

      this.$axios({
        methods: 'get',
        url: 'api/v3/events/410899839472287744?system_version=23&platform=ANDROID&area_id=440100&access_token&version=91'
      }).then(({data}) => {
        // console.log('第二页 data', data.results[0]);
        let d = data.results[0]
        console.log('d', d);
        this.adPic_1 = d.rows[0].elements[0].value;
        this.adPic_2 = d.rows[1].elements[0].value;
        this.productList_1 = d.rows[2].elements[0].products;
        this.adPic_3 = d.rows[3].elements[0].value;
        this.productCard = d.rows[4].elements[0].products[0]
        this.productList_2 = d.rows[5].elements[0].products;

        this.$toast.clear(); //请求完成 关闭loading
      })
          .catch((error) => {
            console.log(error);
          })
    },

    ...mapMutations("shopMain", ["setShopMessage", "setShowShopMain"]),
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
    this.getDat()
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
  display: block;
  width: 100%;
}

.secondM {
  background-color: #f8eddf;
  height: 78vh;
  overflow: scroll;

  .product_list {
    padding: 2vw;
    //display: grid;
    //grid-template-columns: 1fr 1fr;
    //row-gap: 2vw;
    //column-gap: 2vw;

    // CSS 瀑布流
    column-count: 2;
    column-gap: 2vw;

    .commodity_list {
      border-radius: 2vw;
      overflow: hidden;
      margin-bottom: 2vw;
    }
  }

  .product_card {
    padding: 0 2vw;

  }

}

</style>