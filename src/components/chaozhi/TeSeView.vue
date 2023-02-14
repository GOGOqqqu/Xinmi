<template>
  <!-- 特色页面 -->
  <div class="te" @scroll="ScrollSlide">
    <div class="tou" :class="to == true ? 'tous' : ''">
      <div class="te-tou">
        <router-link tag="div" to="/chaozhi">
          <div class="hi">今日精选</div>
        </router-link>
        <router-link tag="div" to="/zhaopin">
          <div class="hi">招聘必买</div>
        </router-link>
        <router-link tag="div" to="/tese">
          <div class="hi jia">特色商品</div>
        </router-link>
        <router-link tag="div" to="/fulin">
          <div class="hi">福利社区</div>
        </router-link>
        <router-link tag="div" to="/cide">
          <div class="hi">吃的百科</div>
        </router-link>
        <router-view />
      </div>
    </div>

    <!-- 轮播图 -->
    <div class="te-Carousel">
      <van-swipe class="my-swipe" indicator-color="white">
        <div class="content-banner" v-for="(item, i) in banner" :key="i">
          <van-swipe-item>
            <div class="swipe-he">
              <!-- 标题  -->
              <div class="title1">
                {{ products[item.product_ids[0]].min_sku }}系列
              </div>
              <span class="title2">{{
                products[item.product_ids[0]].describe
              }}</span>
              <div class="he-da">
                <div
                  class="he-img"
                  v-for="(a, b) in item.product_ids"
                  :key="b"
                  :class="i == 2 && b == 1 ? 'grow' : ''"
                >
                  <!--商品图片 -->
                  <img
                    @click="ClickJump(a)"
                    class="img1"
                    :src="`https://img01.yimishiji.com/v1/img/${
                      products[a]?.images.split(',')[0]
                    }.webp`"
                    alt
                  />

                  <!--商品标题 -->
                  <div @click="ClickJump(a)" class="he-text">
                    {{
                      item.spec_list[0].tastes.length == item.product_ids.length
                        ? item.spec_list[0].tastes[b]
                        : item.spec_list[0].tastes.concat(
                            item.spec_list[1].tastes
                          )[b]
                    }}
                  </div>

                  <!-- 商品添加 -->
                  <div
                    class="imgd"
                    @click="ObtainId(a, `ming${a}`, products[a])"
                  >
                    <img
                      class="img3"
                      src="../../assets/img/btn_add_product_new.png"
                    />
                    <div class="zi active" :ref="`ming${a}`">0</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 背景图片区 -->
            <div class="swipe-bg">
              <img
                :src="`https://img01.yimishiji.com/v1/img/${
                  products[item.product_ids[0]]?.images.split(',')[1]
                }.webp`"
              />
            </div>
          </van-swipe-item>
        </div>
      </van-swipe>
    </div>

    <!-- 文本内容 -->
    <div class="content">
      <div class="content-text">
        <div class="text1">
          <div class="mi">一米特色系列</div>
          <div class="se"></div>
          <span>优先选择有机或天然食材;优先选择高蛋白、</span>
        </div>

        <div class="text1">
          <span>健康脂肪、低碳水等;尽量选择低糖、低盐、少精致碳水等。</span>
        </div>
      </div>

    </div>

    <!-- 商品区 -->
    <div class="shang">
      <!-- 商品区 头部 -->
      <div class="shang-bian" v-for="(item, i) in list" :key="i">
        <div class="shang-top">
          <div class="top-left">
            <div class="left-one">{{ item.cat_name }}热卖</div>
            <div class="left-two">大家都在吃的好滋味</div>
            <span class="left-three">逛更多 ></span>
          </div>
          <div class="top-right">
            <div class="right-top">
              <span>{{
                products[item.cat_products[0].product_ids[0]].comment == ""
                  ? products[item.cat_products[0].product_ids[0]].describe
                  : products[item.cat_products[0].product_ids[0]].comment
              }}</span>
            </div>
            <div class="right-bottom">
              <p
                :class="
                  products[item.cat_products[0].product_ids[0]]
                    .afterpromotion_price ==
                  products[item.cat_products[0].product_ids[0]].price
                    ? 'ch'
                    : ''
                "
              >
                <span
                  >￥{{
                    products[item.cat_products[0].product_ids[0]]
                      .afterpromotion_price
                  }}</span
                >
                <span
                  class="xx"
                  :class="
                    products[item.cat_products[0].product_ids[0]]
                      .afterpromotion_price ==
                    products[item.cat_products[0].product_ids[0]].price
                      ? 'active'
                      : ''
                  "
                  >￥{{
                    products[item.cat_products[0].product_ids[0]].price
                  }}</span
                >
              </p>
            </div>
          </div>
        </div>

        <!-- 第一个商品展示区域 -->
        <div class="he-img first">
          <img
            class="img1"
            @click="ClickJump(item.product_ids[0])"
            :src="`https://img01.yimishiji.com/v1/img/${
              products[item.product_ids[0]]?.images.split(',')[0]
            }.webp`"
          />
          <div class="he-text" @click="ClickJump(item.product_ids[0])">
            <span>{{ products[item.product_ids[0]].taste }}</span>
            <span>{{ products[item.product_ids[0]].min_sku }}</span>
          </div>
          <div
            class="imgd"
            @click="
              ObtainId(
                item.product_ids[0],
                `ming${item.product_ids[0]}`,
                products[item.product_ids[0]]
              )
            "
          >
            <img class="img3" src="../../assets/img/btn_add_product_new.png" />
            <div class="zi active" :ref="`ming${item.product_ids[0]}`">0</div>
          </div>

          <img class="di" src="../../assets/img/rangk1.png" />
        </div>

        <!-- 商品展示区域 -->
        <div class="content-nei">
          <div
            class="nei"
            v-for="(p, n) in item.product_ids.slice(1, item.product_ids.length)"
            :key="n"
          >
            <!-- 特殊商品图片 -->
            <img
              class="img2 active"
              :class="item.cat_name == '叶菜类' && n == 0 ? 'chun' : ''"
              @click="ClickJump(p)"
              :src="`https://img01.yimishiji.com/v1/img/${
                products[list[8].product_ids[2]]?.images
              }.webp`"
            />
            <img
              class="img2 active"
              :class="item.cat_name == '叶菜类' && n == 1 ? 'chun' : ''"
              @click="ClickJump(p)"
              :src="`https://img01.yimishiji.com/v1/img/${
                products[list[8].product_ids[2]]?.images
              }.webp`"
            />
            <img
              class="img2 active"
              :class="item.cat_name == '叶菜类' && n == 2 ? 'chun' : ''"
              @click="ClickJump(p)"
              :src="`https://img01.yimishiji.com/v1/img/${
                products[list[8].product_ids[3]]?.images
              }.webp`"
            />
            <img
              class="img2 active"
              :class="item.cat_name == '叶菜类' && n == 3 ? 'chun' : ''"
              @click="ClickJump(p)"
              :src="`https://img01.yimishiji.com/v1/img/${
                products[list[8].product_ids[4]]?.images.split(',')[1]
              }.webp`"
            />

            <img
              class="img2"
              :class="item.cat_name == '叶菜类' ? 'active' : ''"
              @click="ClickJump(p)"
              :src="`https://img01.yimishiji.com/v1/img/${
                products[p].images.split(',')[1] == ''
                  ? '80f20411066c4fc14aa325e0bf791170'
                  : products[p]?.images.split(',')[1]
              }.webp`"
            />

            <div class="hong" @click="ClickJump(p)">
              {{ products[p].cpn_tag }}
            </div>
            <div class="biao" @click="ClickJump(p)">{{ products[p].name }}</div>
            <div class="text1" @click="ClickJump(p)">
              {{ products[p].describe }}
            </div>

            <div class="text2">
              <!-- 优惠后的价格 -->
              <span
                class="span1"
                :class="
                  products[p].afterpromotion_price == products[p].price
                    ? 'lu'
                    : ''
                "
                @click="ClickJump(p)"
                >￥{{ products[p].afterpromotion_price }}</span
              >

              <!-- 优惠前的价格 -->
              <span
                class="span2"
                :class="
                  products[p].afterpromotion_price == products[p].price
                    ? 'active'
                    : ''
                "
                @click="ClickJump(p)"
                >￥{{ products[p].price }}</span
              >

              <!-- 商品添加按钮 -->
              <div class="imgd" @click="ObtainId(p, `ming${p}`, products[p])">
                <img
                  class="img3"
                  src="../../assets/img/btn_add_product_new.png"
                />
                <div class="zi active" :ref="`ming${p}`">0</div>
              </div>
            </div>

            <!-- 特惠 -->
            <span
              class="text3"
              :class="
                products[p].afterpromotion_price == products[p].price
                  ? 'actives'
                  : ''
              "
              >特惠</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      banner: Array, //头部轮播图
      list: Array, //下面的图片列表
      products: Object, //数据拿取区
      to: false,
      wu: "",
    };
  },
  methods: {
    // 请求数据
    async Request() {
      this.$toast.loading({
        //开始loading
        //开始网络请求时 进行loading
        duration: 0, //持续加载
        forbidClick: true, //禁止在加载过程中点击背景
        message: "加载中...",
        className: "showList_toast", //自定义类名 用于更改样式
      });

      let re = await this.$axios({
        method: "get",
        url: `chaozhi/front-ux/growth_zero/api/v2/yimi_list`,
      });
      // console.log(re);
      console.log(re.data.results[0]);
      // .then(({ data }) => {
      this.banner = re.data.results[0].banner; //头部轮播图
      this.list = re.data.results[0].hot_yimi_list; //下面的图片列表
      this.products = re.data.results[0].products; //数据拿取区

      console.log("头部轮播图", this.banner);
      console.log("下面的图片列表", this.list);
      console.log("数据拿取区", this.products);

      this.$toast.clear(); //请求完成 关闭loading
    },
    // 变色
    ScrollSlide(e) {
      if (e.target.scrollTop >= 50) {
        this.to = true;
      }
      if (e.target.scrollTop < 50) {
        this.to = false;
      }
    },

    //点击跳出遮罩层
    ClickJump(e) {
      console.log("这是id", e);
    },

    // 购物车添加 事件
    ObtainId(id, fu, shu) {
      console.log("id", id);
      // console.log("数据", shu);
      this.addGoods = {
        name: shu.name,
        size: shu.sales_specification,
        price: shu.price,
        sell_price: shu.afterpromotion_price,
        num: 1,
        checked: true,
        img: `https://img01.yimishiji.com/v1/img/${shu.pic_default_id}.webp`,
        good_id: id,
      };
      this.$toast.success("已添加购物篮");
      console.log("this.addGoods", this.addGoods);

      let refs = this.$refs;
      for (let key in refs) {
        this.wu = key;
        if (fu == key) {
          var as = refs[key];
          as[0].innerHTML++;
          as[0].classList.remove("active");
          // console.log(as[0].innerHTML)
          return as;
        }
      }
    },
  },
  created() {
    this.Request();
  },
};
</script>

<style lang="scss" scoped src="./ScssWengJian/TeSe.scss"></style>
