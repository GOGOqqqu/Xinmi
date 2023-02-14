<template>
  <!-- 招聘页面 -->
  <div class="zhao">
    <div class="tou">
      <div class="zhao-tou">
        <router-link tag="div" to="/chaozhi">
          <div class="hi">今日精选</div>
        </router-link>
        <router-link tag="div" to="/zhaopin">
          <div class="hi jia">招聘必买</div>
        </router-link>
        <router-link tag="div" to="/tese">
          <div class="hi">特色商品</div>
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

    <div class="zhao-content">
      <!-- 上面的12条数据 -->
      <div class="content" v-for="(item, i) in special" :key="i">
        <img
          class="img1"
          :src="`https://img01.yimishiji.com/v1/img/${item.banner_id}.webp`"
          @click="ObtainTiao(item, tu)"
        />
        <div class="content-nei">
          <div
            class="nei"
            v-for="(p, n) in item.products.length > 6
              ? item.products.slice(0, 6)
              : item.products"
            :key="n"
          >
            <div :class="tu[p.product_ids[0]] == undefined ? 'active' : ''">
              <img
                class="img2"
                @click="ObtainId(p.product_ids[0])"
                :src="`https://img01.yimishiji.com/v1/img/${
                  tu[p.product_ids[0]]?.images.split(',')[0]
                }.webp`"
              />
              <div class="hong" @click="ObtainId(p.product_ids[0])">
                {{ tu[p.product_ids[0]]?.cpn_tag }}
              </div>
              <div class="biao" @click="ObtainId(p.product_ids[0])">
                {{ tu[p.product_ids[0]]?.name }}
              </div>
              <div class="text1" @click="ObtainId(p.product_ids[0])">
                {{ tu[p.product_ids[0]]?.describe }}
              </div>
              <div class="text2">
                <span
                  class="span1"
                  :class="
                    tu[p.product_ids[0]]?.afterpromotion_price ==
                    tu[p.product_ids[0]]?.price
                      ? 'lu'
                      : ''
                  "
                  @click="ObtainId(p.product_ids[0])"
                  >￥{{ tu[p.product_ids[0]]?.afterpromotion_price }}</span
                >
                <span
                  class="span2"
                  :class="
                    tu[p.product_ids[0]]?.afterpromotion_price ==
                    tu[p.product_ids[0]]?.price
                      ? 'active'
                      : ''
                  "
                  @click="ObtainId(p.product_ids[0])"
                  >￥{{ tu[p.product_ids[0]]?.price }}</span
                >
                <div
                  class="imgd"
                  @click="
                    ObtainsId(
                      p.product_ids[0],
                      `ming${p.product_ids[0]}`,
                      tu[p.product_ids[0]]
                    )
                  "
                >
                  <img
                    class="img3"
                    src="../../assets/img/btn_add_product_new.png"
                  />
                  <div class="zi active" :ref="`ming${p.product_ids[0]}`">
                    0
                  </div>
                </div>
              </div>
              <span
                class="text3"
                :class="
                  tu[p.product_ids[0]]?.afterpromotion_price ==
                  tu[p.product_ids[0]]?.price
                    ? 'actives'
                    : ''
                "
                >特惠</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- 下面的18条数据 -->
      <div class="content2">
        <div class="content2-tou" v-for="(item, i) in rank" :key="i">
          <div class="tou-left">
            <img
              :src="`https://img01.yimishiji.com/v1/img/${
                tu[item.product_ids[0]].images.split(',')[0]
              }.webp`"
            />
          </div>
          <div class="tou-right">
            <div class="right-text1" @click="ObtainId(item.product_ids[0])">
              <span>{{ item.cutting_min_sku }}</span>
              <span class="jia">{{
                item.spec_list[0].spec.slice(
                  0,
                  item.spec_list[0].spec.length - 2
                )
              }}</span>
            </div>

            <div class="right-text2" @click="ObtainId(item.product_ids[0])">
              <span>{{ tu[item.product_ids[0]].brand }}</span>
              <span class="shuzi">{{ tu[item.product_ids[0]].describe }}</span>
            </div>

            <div
              class="right-text3"
              @click="ObtainId(item.product_ids[0])"
              :class="
                tu[item.product_ids[0]].selling_points_first == '' ? 'ying' : ''
              "
            >
              <span>有机</span>
              <span
                class="kai"
                :class="
                  tu[item.product_ids[0]].selling_points_second == ''
                    ? 'ying'
                    : ''
                "
                >开袋即食</span
              >
            </div>

            <div
              class="right-text4"
              @click="ObtainId(item.product_ids[0])"
              :class="
                tu[item.product_ids[0]].selling_points_first == ''
                  ? 'shang'
                  : ''
              "
            >
              <span
                class="span1"
                :class="
                  tu[item.product_ids[0]].price ==
                  tu[item.product_ids[0]].afterpromotion_price
                    ? 'luse'
                    : ''
                "
                >￥{{ tu[item.product_ids[0]].afterpromotion_price }}</span
              >
              <span class="span2">{{
                item.spec_list[0].spec.slice(
                  item.spec_list[0].spec.length - 2,
                  item.spec_list[0].spec.length
                )
              }}</span>
              <span
                class="span3"
                :class="
                  tu[item.product_ids[0]].price ==
                  tu[item.product_ids[0]].afterpromotion_price
                    ? 'ying'
                    : ''
                "
                >￥{{ tu[item.product_ids[0]].price }}</span
              >
            </div>

            <div class="right-text5" @click="ObtainId(item.product_ids[0])">
              热销{{ tu[item.product_ids[0]].buy_count }}件
            </div>

            <!-- 购物车 添加功能区域 -->
            <div
              @click="
                ObtainsId(
                  item.product_ids[0],
                  `ming${item.product_ids[0]}`,
                  tu[item.product_ids[0]]
                )
              "
            >
              <img
                class="right-text6"
                src="../../assets/img/btn_add_product_new.png"
              />
              <!-- <div class="zi active" :ref="`ming${p.product_ids[0]}`">0</div> -->
              <div class="zi active" :ref="`ming${item.product_ids[0]}`">0</div>
            </div>
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
      tu: Array, //图片获取区
      special: Array, //上面的商品区域
      rank: Array, //下面的数据图片列表
      // zi: 1,  //控制点击购买出现数字/
      wu: String, //无用数据
    };
  },
  methods: {
    //请求数据区
    async ZhaoShow() {
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
        url: `chaozhi/front-ux/growth_zero/api/v2/new_cust_list`,
      });
      // .then(({ data }) => {
      console.log(re);
      this.special = re.data.results.special_list;
      this.rank = re.data.results.rank_list;
      this.tu = re.data.results.productsData;
      console.log(this.tu);
      console.log(this.rank);
      console.log(this.special);
      // // })
      // .catch(error => {
      //   console.log(error);
      // });
      this.$toast.clear(); //请求完成 关闭loading
    },

    //点击跳转路由
    ObtainTiao(e, tu) {
      this.$router.push({
        name: "shipin",
        params: {
          name: {
            tu: tu,
            e: e,
          },
        },
      });
      console.log(e);
      console.log(tu);
    },

    //点击跳出遮罩层操作
    ObtainId(e) {
      console.log("id", e);
    },
    //购物车加入按钮
    ObtainsId(id, fu, shu) {
      console.log("id", id);
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
  beforeMount() {
    this.ZhaoShow();
  },
};
</script>

<style lang="scss" scoped src="./ScssWengJian/ZhaoPin.scss"></style>
