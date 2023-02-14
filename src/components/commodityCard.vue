<template>
  <!-- 这是商品卡片 -->
  <div class="module">
    <div class="pic">
      <img :src="'https://img01.yimishiji.com/v1/img/' + newData.pic_default_id +'.webp'" alt="">
    </div>
    <div class="commodityData">
      <!-- 商品名称 -->
      <p class="name">{{ newData.name }} </p>
      <!-- 商品介绍 -->
      <p class="introduce">{{ newData.describe ? newData.describe : "暂无介绍" }} </p>
      <!-- 容量/分 量-->
      <p class="commoditySize">{{ newData.unit }} </p>
      <div class="interaction">
        <!-- 价格 -->
        <div class="price">
          <!-- 现价 如果现价和原价相同，则显示绿色-->
          <span class="spotPrice" :class="{spotPriceColor:newData.price === newData.discount_price}">&yen;{{
              parseFloat(newData.discount_price)
            }}</span>
          <!-- 原价 如果现价和原价相同，则不显示 -->
          <span class="originalPrice" v-if="newData.price !== newData.discount_price"> &yen;{{
              parseFloat(newData.price)
            }}</span>
        </div>

        <!-- 商品添加进购物车按钮 点击事件添加的到购物车 -->
        <span class="addBtn" @click.stop="addClick(newData)">+</span>
      </div>

    </div>

  </div>
</template>

<script>
// 这里可以导入其他文件 例如：组件、工具js、第三方插件js,json文件、图片文件等
// eg: import 《组件名称》 from '《文件路径》'
import {mapMutations} from "vuex";

export default {
  // import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    // 商品信息
    merchandiseNews: {
      type: Object,
      require: true
    },
  },
  // 这里用于存放数据
  data() {
    return {
      newData: this.merchandiseNews, // 商品信息
    }
  },
//  计算属性 类似于data概念
  computed: {},
//  监控data 中数据变化
  watch: {},
//  方法集合
  methods: {
    ...mapMutations("shopping", ["addGoods"]),
    // 点击 + 事件
    addClick(obj) {
      console.log('点击加号', obj);
      this.addGoods({
        name: obj.name,
        size: obj.unit,
        price: parseFloat(obj.price),
        sell_price: parseFloat(obj.discount_price),
        num: 1,
        checked: true,
        img: `https://img01.yimishiji.com/v1/img/${obj.image_default_id}.webp`,
        goods_id: obj.goods_id,
      }); //调用添加商品事件
      this.$toast.success("已添加购物篮");
    }
  },
//  生命周期 -创建完成（可以访问当前this 实例）
  created() {
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

.module {
  margin: 0 auto;

  .pic {
    margin-bottom: 3vw;
  }

  .commodityData {

    & > p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .name {
      color: #2d4758;
      font-size: 15px;
      margin-bottom: 2vw;
    }

    .introduce {
      color: #6c6c6c;
      font-size: 12px;
      margin-bottom: 2vw;
    }

    .commoditySize {
      font-size: 12px;
      margin-bottom: 2vw;
      color: #aaa;
    }


    .interaction {
      display: flex;
      justify-content: space-between;

      .price {

        .spotPrice {
          color: #f55757;
          font-size: 15px;
          font-weight: bold;
        }

        .spotPriceColor {
          color: #73b567;
        }

        .originalPrice {
          color: #aaa;
          font-size: 13px;
          text-decoration: line-through;
        }
      }


      .addBtn {
        width: 5vw;
        height: 5vw;
        border: none;
        background-color: #e3f3ff;
        border-radius: 999px;
        color: #456d86;
        text-align: center;
        line-height: 5vw;
        font-size: 18px;
      }
    }
  }
}
</style>