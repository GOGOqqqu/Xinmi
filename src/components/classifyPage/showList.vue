<template>
  <div class="classifyPage_showList" v-if="showType != 0">
    <div class="headerImg" v-if="isLoad && imgSrc">
      <img :src="`https://img01.yimishiji.com/v1/img/${imgSrc}.webp`" />
    </div>
    <div class="showListMain" v-if="isLoad">
      <van-tabs
        v-model="active"
        background="#fefefe"
        color="transparent"
        animated
        swipeable
        title-active-color="#000"
        title-inactive-color="#666"
        @change="tabChange"
      >
        <van-tab
          v-for="item in [
            { cat_id: typeList.cat_id, cat_name: '全部品类' },
            ...typeList.second_cat_ids,
          ]"
          :key="item.cat_id"
          :title="item.cat_name"
        >
          <div class="list_classifyPage">
            <shopItem
              v-for="i in trueList"
              :key="i.goods_id"
              :img="i.image_default_id"
              :title="i.name"
              :Main="i.describe"
              :size="i.unit"
              :price="i.price"
              :sellPrice="i.discount_price"
              :shopId="i.goods_id"
            />
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import shopItem from "@/components/shopItem.vue";

import { mapState } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "showList",
  props: {
    // swipe: { type: Array, requited: true },
    list: Array, //用于遍历的 除了热销之外的所有分类的数组
    showType: Number, //当前展示的index
  },

  data() {
    return {
      isLoad: false,
      active: 0,
      typeList: [], //类型数组
      trueList: [], //用于遍历的数组
      imgSrc: null, //顶层图片路径
    };
  },

  created() {},

  watch: {
    showType() {
      //父组件选择发生改变时 当前展示的商品类型也进行相应的改变
      //监听父组件是否请求完成

      this.typeList = this.list[this.showType - 1]; //拿到初始分类
      if (this.imgSrc) {
        //如果切换大类时存在顶部图片 则更换顶部图片
        this.imgSrc = null;
      }

      this.active = 0;
      console.log("this.typeList", this.typeList);
      if (this.showType == 0) {
        //如果父组件选择热销分类 则不进行请求 该请求由父盒子进行
        return;
      } else {
        // Toast.loading({
        //   //启动加载动画
        //   message: "加载中...",
        //   forbidClick: true,
        // });

        this.sendData(this.typeList.cat_id); //根据选择的大类id进行请求数据
      }
    },
  },

  mounted() {
    //数据挂载完毕后
  },

  computed: {
    ...mapState("playPage", ["duration", "playTime", "playState"]), //向vuex的playPage模块中的state取值
    ...mapGetters("playPage", ["songDuration", "songNowTime"]),
  },

  methods: {
    sendData(id) {
      this.$toast.loading({
        //开始网络请求时 进行loading
        duration: 0, //持续加载
        forbidClick: true, //禁止在加载过程中点击背景
        message: "加载中...",
        className: "showList_toast", //自定义类名 用于更改样式
      });
      this.trueList = []; //请求数据时 先将遍历数组清空
      this.isLoad = true; //将页面隐藏起来

      this.$axios({
        method: "get",
        url: ` api/v1/categories/products?longitude=113.270796&cat_id=${id}&page_size=20&latitude=23.135312011187&page=1`,
      })
        .then(({ data }) => {
          // console.log("aaa", data);
          // console.log("trueList", data.results[0].products); //当前应该渲染的全部的商品
          this.trueList = data.results[0].products;
          this.isLoad = true; //同意页面渲染出来
          this.$toast.clear(); //请求完成 关闭loading
          if (!this.imgSrc) {
            //在一大类商品中切换小类时 保持顶部图片的存在
            this.imgSrc =
              data?.results?.[0]?.cms_rows?.[0]?.elements?.[0]?.value; //确保在没有顶部图片的时候也不会出现undefined
          }

          //cat_id=24  商品大类id
          //  请使用懒加载
          //加上经纬度之后 会根据当前所在地筛选可购买商品 不加上经纬度商品将增加很多
        })
        .catch((error) => {
          console.log(error);
        });
    },

    tabChange(name) {
      //切换种类时
      console.log("name", name);

      if (name == 0) {
        console.log("this.typeList.cat_id", this.typeList.cat_id);
        this.sendData(this.typeList.cat_id);
      } else {
        console.log(
          "this.typeList.second_cat_ids[name - 1].cat_id",
          this.typeList.second_cat_ids[name - 1].cat_id
        );
        this.sendData(this.typeList.second_cat_ids[name - 1].cat_id);
      }
    },
  },

  components: {
    shopItem,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss">
.classifyPage_showList {
  width: 100%;
  height: 100%;

  // background-color: aqua;
  padding: 0 2vw;
  position: relative;

  .headerImg {
    background-color: transparent;
    width: 100%;
    height: 20vh;
    padding: 0 2% 2% 0;

    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: fill;
      border-radius: 8px;
    }
  }

  .showListMain {
    .van-tabs__wrap {
      // width: 75%;
      height: 4vh;

      .van-tab {
        border-radius: 1vh;
        font-size: 1vh;
      }

      .van-tab--active {
        background-color: #e8f0f6;
      }
    }
  }

  .list_classifyPage {
    width: 100%;
  }
}
</style>
