<!-- 长方形 商品 卡片 -->
<template>
  <div class="rectangularCard">
    <div class="pic">
      <img :src="'https://img01.yimishiji.com/v1/img/' + commodityData.images[1] +'.webp'" alt="">
      <!--      <img src="https://img01.yimishiji.com/v1/img/1c6b19bf1090182254335feeaebd758f.webp" alt="">-->
    </div>

    <div class="text">
      <!-- 商品名 -->
      <div class="title van-multi-ellipsis--l2">
        {{ commodityData.name }}
      </div>

      <div class="tag">
        <span class="new" v-if="commodityData.group.g_type_txt">{{ commodityData.group.g_type_txt }}</span>
        <span>{{ commodityData.group.mem_quantity_txt }}</span>
        <span>{{ commodityData.group.free_postage_txt }}</span>
      </div>

      <!-- 人数 -->
      <div class="people_counting">
        <i>
          <img src="@/assets/img/ic_fire.png" alt="">
        </i>
        <span>{{ commodityData.group_sale_info.quantity_txt }}</span>
      </div>

      <!-- 价格 -->
      <div class="price">
        <div class="left">
          <span class="current_price"><i>&yen;</i>{{ parseFloat(commodityData.discount_price) }}</span>
          <span class="original_price">&yen;{{ parseFloat(commodityData.price) }}</span>
        </div>
        <div class="btn" @click.stop="addClick(commodityData)">去开团</div>
      </div>

    </div>


  </div>
</template>

<script>
// 这里可以导入其他文件 例如：组件、工具js、第三方插件js,json文件、图片文件等
// eg: import 《组件名称》 from '《文件路径》'
import {mapMutations} from "vuex";

export default {
  name: "rectangularCard",
  // import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    commodityData: {
      type: Object,
      require: true
    }
  },
  // 这里用于存放数据
  data() {
    return {}
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

.rectangularCard {
  display: flex;
  background-color: #ffffff;
  border-radius: 3vw;
  overflow: hidden;

  .pic {
    width: 48vw;
  }

  // 文字盒子
  .text {
    padding: 2vw;


    // 商品名
    .title {
      color: #213b4e;
      font-size: 16px;
      margin-bottom: 2vw;
      //height: 32px;
      overflow: hidden;
    }

    .tag {
      margin-bottom: 1vw;

      span {
        display: inline-block;
        font-size: 14px;
        margin-right: 1vw;
        padding: 1vw;
        background-color: #f6f6f6;
        border-radius: 1vw;
        color: #666666;
      }

      .new {
        background-color: #ffeee8;
        color: #ff6532;
      }
    }

    // 人数
    .people_counting {
      color: #999999;
      font-size: 14px;
      display: flex;
      align-items: center;
      margin-bottom: 1vw;
    }

    // 价格
    .price {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {

        // 现价
        .current_price {
          color: #fa5555;
          font-weight: bold;
          font-size: 18px;

          i {
            font-size: 13px;
          }
        }

        // 原价
        .original_price {
          margin-left: 1vw;
          font-size: 13px;
          color: #999999;
          text-decoration: line-through;
        }

      }

      .btn {
        background-color: #fa5555;
        color: #fff;
        padding: 2vw 3vw;
        border-radius: 999px;
        font-size: 15px;
      }
    }


    .people_counting {

      i {
        display: inline-block;
        width: 4vw;
      }
    }
  }

}

</style>