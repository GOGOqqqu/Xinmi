<template>
  <!-- 超值精选 主页面 -->
  <div class="chao" @scroll="ScrollSlide">
    <!-- 头部导航栏 -->
    <div class="tou" :class="to == true ? 'tous' : ''">
      <div class="chao-tou">
        <router-link tag="div" to="/chaozhi">
          <div class="hi jia">今日精选</div>
        </router-link>
        <router-link tag="div" to="/zhaopin">
          <div class="hi">招聘必买</div>
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

    <!-- 内容  -->
    <div class="chao-content">
      <!-- 头部得上面两个模块 -->
      <div class="content-content">
        <!-- 人气优选 -->
        <div class="nav content-ren">
          <div class="navs">
            <div class="navs-yi">
              <div class="yi-ren">人气优选</div>
              <p class="yi-zhi">值得买</p>
            </div>
            <div class="navs-er">上海60万粉丝之选</div>
            <div class="navs-sans">
              <div class="navs-san">
                <img
                  :src="`https://img01.yimishiji.com/v1/img/${ren?.brands?.[0]?.products?.[0]?.pic_default_id}.webp`"
                />
              </div>
              <div class="navs-san">
                <img
                  :src="`https://img01.yimishiji.com/v1/img/${ren?.brands?.[1]?.products?.[0]?.pic_default_id}.webp`"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 视频种草 -->
        <div class="nav content-ren">
          <div class="navs">
            <div class="navs-yi">
              <div class="yi-ren">视频种草</div>
              <div class="yi-zhi ship">
                <div class="zhi-yi"></div>
                <div class="zhi-er"></div>
                <div class="zhi-sans"></div>
              </div>
            </div>
            <div class="navs-er lan">采购专家带你懂吃</div>
            <div class="navs-sans">
              <div class="navs-san">
                <img
                  :src="`https://img01.yimishiji.com/v1/img/${shi?.videos?.[3]?.relate_products?.[0]?.pic_default_id}.webp`"
                />
              </div>
              <div class="navs-san">
                <img
                  :src="`https://img01.yimishiji.com/v1/img/${shi?.videos?.[4]?.relate_products?.[0]?.pic_default_id}.webp`"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="xian"></div>
      </div>

      <!-- 头部得下面两个模块 -->
      <div class="content-content">
        <!-- 超值精选  -->
        <div class="nav content-ren">
          <div class="navs">
            <div class="navs-yi">
              <div class="yi-ren">超值精选</div>
              <p class="yi-zhi xing">限时</p>
            </div>
            <div class="navs-er xings">性价比之选</div>
            <div class="navs-sans">
              <div
                class="navs-san"
                v-if="xuan?.[0]?.discount_products?.[5]?.pic_default_id"
              >
                <img
                  :src="`https://img01.yimishiji.com/v1/img/${xuan?.[0]?.discount_products?.[5]?.pic_default_id}.webp`"
                />
                <span class="qiang"
                  >￥{{
                    xuan?.[0]?.discount_products?.[5]?.afterpromotion_price
                  }}</span
                >
              </div>

              <div
                class="navs-san"
                v-if="xuan?.[0]?.discount_products?.[6]?.pic_default_id"
              >
                <img
                  :src="`https://img01.yimishiji.com/v1/img/${xuan?.[0]?.discount_products?.[6]?.pic_default_id}.webp`"
                />
                <span class="qiang"
                  >￥{{
                    xuan?.[0]?.discount_products?.[6]?.afterpromotion_price
                  }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- 好评推荐 -->
        <div class="nav content-ren">
          <div class="navs">
            <div class="navs-yi">
              <div class="yi-ren">好评推荐</div>
              <p class="yi-zhi gg">跟着买</p>
            </div>
            <div class="navs-er ss">精选每日口碑好物</div>
            <div class="navs-sans">
              <div class="navs-san">
                <img
                  :src="`https://img01.yimishiji.com/v1/img/${hao?.[0]?.products?.[0]?.pic_default_id}.webp`"
                />
                <span class="qiang1"
                  >{{ hao?.[0]?.products?.[0]?.comments_count }}会员推荐</span
                >
              </div>
              <div class="navs-san">
                <img
                  :src="`https://img01.yimishiji.com/v1/img/${hao?.[0]?.products?.[1]?.pic_default_id}.webp`"
                />
                <span class="qiang1"
                  >好评率{{ hao?.[0]?.products?.[1]?.rate_praise }}%</span
                >
              </div>
            </div>
          </div>
        </div>

        <div class="xian xians"></div>
      </div>
    </div>

    <!-- 图片数据区 -->
    <div class="shu">
      <van-list
        class="hn"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="img-bao">
          <!-- 渲染盒子 -->
          <div
            class="mq"
            :class="item.type == 'group' ? 'active' : ''"
            v-for="(item, index) in list"
            :key="index"
          >
            <!-- 图片区域 有图片就出现 -->
            <img
              @click="Pictures(item.goods_id)"
              v-if="item.images"
              :src="`https://img01.yimishiji.com/v1/img/${
                item.images.split(',')[1]
              }.webp`"
            />

            <!-- 视频区域 有视频就出现 -->
            <div
              class="video1"
              v-if="item.originVideoUrl"
              :ref="`video${index}`"
            >
              <video
                width="100%"
                height="100%"
                class="video2"
                :src="item.previewMP4Url"
                @ended="handlePause"
                @click="ShowSuspend"
              ></video>
            </div>

            <!-- 控制视频播放按钮 -->
            <div class="yin" v-if="item.originVideoUrl">
              <img
                class="bo"
                src="../../assets/img/ic_video_play.png"
                @click="ShowPlay"
              />
              <!-- <img class="zan active" src="../../assets/img/ic_video_pause.png" /> -->
            </div>

            <!-- mq  下面图片类型 有图片就出现 的文本区 -->

            <div class="picturesDisplaying" v-if="item.images">
              <!-- 有折扣就出现 -->
              <div class="discount" v-if="item.aftercpn_price">
                <div class="discount-one" @click="Pictures(item.goods_id)">
                  {{ item.describe }}
                </div>
                <div class="discount-two">{{ item.name }}</div>

                <!-- 价格与折扣1 -->
                <div class="discount-three" @click="Pictures(item.goods_id)">
                  <span
                    :class="
                      item.price == item.afterpromotion_price ? 'luse' : ''
                    "
                    >￥</span
                  >
                  <span
                    :class="
                      item.price == item.afterpromotion_price ? 'luse' : ''
                    "
                    >{{ item.afterpromotion_price }}</span
                  >
                  <span>/{{ item.sales_specification.split("/")[1] }}</span>
                  <span v-if="item.price !== item.afterpromotion_price"
                    >￥{{ item.price }}</span
                  >
                </div>

                <!-- 添加商品按钮1 -->
                <div
                  class="discount-img"
                  @click="ObtainId(item.goods_id, `ming${item.goods_id}`, item)"
                >
                  <img
                    class="img3"
                    src="../../assets/img/btn_add_product.png"
                  />
                  <div class="zi active" :ref="`ming${item.goods_id}`">0</div>
                </div>
              </div>

              <!-- 没有折扣就出现 -->
              <div class="discount bai" v-if="!item.aftercpn_price">
                <div
                  class="discount-one1"
                  v-if="item.min_sku"
                  @click="Pictures(item.goods_id)"
                >
                  {{ item.taste }}{{ item.min_sku }}
                </div>
                <div class="discount-two2" @click="Pictures(item.goods_id)">
                  {{ item.brand }} {{ item.describe }}
                </div>
                <div
                  class="discount-three2"
                  v-if="!item.min_sku"
                  @click="Pictures(item.goods_id)"
                >
                  <img
                    :src="`https://img01.yimishiji.com/v1/img/${item.buyer_picture}.webp`"
                  />
                  <span class="cai">采购专家</span>
                  <span>{{ item.buyer_name }}</span>
                  <span>推荐</span>
                </div>

                <!-- 价格与折扣2 -->
                <div class="discount-three" @click="Pictures(item.goods_id)">
                  <span
                    :class="
                      item.price == item.afterpromotion_price
                        ? 'luse'
                        : 'hongse'
                    "
                    >￥</span
                  >
                  <span
                    :class="
                      item.price == item.afterpromotion_price
                        ? 'luse'
                        : 'hongse'
                    "
                    >{{ item.afterpromotion_price }}</span
                  >
                  <span class="baise"
                    >/{{ item.sales_specification.split("/")[1] }}</span
                  >
                  <span
                    class="baise"
                    v-if="item.price !== item.afterpromotion_price"
                    >￥{{ item.price }}</span
                  >
                </div>

                <!-- 添加商品按钮2 -->
                <div
                  class="discount-img2"
                  @click="ObtainId(item.goods_id, `ming${item.goods_id}`, item)"
                >
                  <img
                    class="img3"
                    src="../../assets/img/btn_add_product_new.png"
                  />
                  <div class="zi sa active" :ref="`ming${item.goods_id}`">
                    0
                  </div>
                </div>
              </div>

              <div class="buy_count" v-if="!item.aftercpn_price">
                热销{{ item.buy_count }}件
              </div>

              <!-- 特价  立省 -->
              <div
                class="special-offer"
                :class="item.price == item.afterpromotion_price ? 'active' : ''"
                v-if="!item.aftercpn_price"
              >
                <div class="te">
                  <div class="te-left">
                    <div>特价</div>
                    <div>￥{{ item.afterpromotion_price }}</div>
                  </div>
                  <div class="te-right"></div>
                </div>
                <div class="li">
                  立省
                  <span>{{
                    (item.price - item.afterpromotion_price).toFixed(1)
                  }}</span>
                </div>
              </div>
            </div>

            <!-- mq  下面视频类型 有视频就出现 的文本区 -->

            <div class="video-text" v-if="item.originVideoUrl">
              <!-- 商品名字 -->
              <div class="text-text">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ren: Array, //人气优选
      shi: Object, //视频种草
      xuan: Array, //超值精选
      hao: Array, //好评推荐
      xia: Array, //下面的一大堆图片及数据
      length: "", //加载的图片总长度
      // video1: "",
      // video2: "",
      to: false,
      chang: 8, //初始长度
      list: "",
      loading: false,
      finished: false,
      wu: [], //无用的数据
    };
  },

  methods: {
    // 数据请求区

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
        url: `chaozhi/front-ux/growth_zero/api/v2/feeds`,
      });
      // console.log(re);
      this.ren = re.data.results[0].brand.results; //人气优品
      this.xia = re.data.results[0].cards; //下面的一大堆图片及数据
      this.xuan = re.data.results[0].low_price.results; //超值精选
      this.hao = re.data.results[0].praise.results; //好评推荐
      this.shi = re.data.results[0].video.results; //视频种草

      this.list = this.xia.slice(0, 8);
      this.length = re.data.results[0].cards.length;
      // console.log(this.list);
      console.log("好评", this.hao);
      // console.log("视频", this.shi);
      console.log("精选", this.xuan);
      // console.log("下面", this.xia);
      this.$toast.clear(); //请求完成 关闭loading
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

    // // 变色
    ScrollSlide(e) {
      if (e.target.scrollTop >= 50) {
        this.to = true;
      }
      if (e.target.scrollTop < 50) {
        this.to = false;
      }
    },
    //瀑布流
    WaterFall() {
      let arrays = [];
      let div = document.querySelectorAll(".mq");
      let divs = document.querySelector(".van-list__loading");
      let suspend = document.querySelector(".van-list__finished-text");
      let shuHeight = document.querySelector(".img-bao");

      div.forEach((item, i) => {
        this.wu = item;
        let height = div[i].offsetHeight;
        let width = div[i].offsetWidth;
        if (i < 2) {
          div[i].style.top = 0 + "px";
          arrays.push(height);

          if (width * i == width) {
            div[i].style.right = 0 + "px";
          } else {
            div[i].style.left = 0 + "px";
          }
        } else {
          let minHeight = Math.min(...arrays);
          let index = arrays.indexOf(minHeight);
          arrays[index] = arrays[index] + height + 20;
          div[i].style.top = minHeight + 20 + "px";
          let maxHeights = Math.max(...arrays);
          if (shuHeight) {
            shuHeight.style.height = maxHeights + 50 + "px";
          }
          if (divs) {
            divs.style.top = maxHeights + "px";
          }
          if (suspend) {
            suspend.style.top = maxHeights + "px";
          }
          if (width * index == width) {
            div[i].style.right = 0 + "px";
          } else {
            div[i].style.left = width * index + "px";
          }
        }
      });
      // }
    },

    // 点击
    Pictures(e) {
      console.log("这是ID", e);
    },

    //视频播放结束
    handlePause(e) {
      e.currentTarget.parentElement.nextElementSibling.firstElementChild.classList.remove(
        "active"
      );
      console.log("视频播放完毕！");
    },

    // 播放
    ShowPlay(e) {
      e.currentTarget.parentElement.previousElementSibling.firstElementChild.play();
      e.target.classList.add("active");
    },
    //暂停
    ShowSuspend(e) {
      e.currentTarget.pause();
      e.currentTarget.parentElement.nextElementSibling.firstElementChild.classList.remove(
        "active"
      );
    },

    // vant2 懒加载
    onLoad() {
      // console.log("初始长度", this.chang);
      setTimeout(() => {
        this.chang += 6;
        this.list = [];
        let re1 = this.xia;
        let re = re1.slice(0, this.chang);

        for (let i = 0; i < this.chang; i++) {
          if (re[i].type == "group") {
            this.wu = [];
          } else {
            this.list.push(re[i]);
          }
        }

        // console.log("", this.chang);
        // console.log("list1", this.list);
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= this.length) {
          this.finished = true;
        }
      }, 1000);
      // }
    },
  },
  updated() {
    this.WaterFall();
  },
  created() {
    this.Request();
  },
};
</script>

<style lang="scss" scoped src="./ScssWengJian/Chao.zhi.scss"></style>
