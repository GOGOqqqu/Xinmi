<template>
  <div class="shopMain_app" @scroll.passive="getScroll($event)">
    <div
      class="shopMain_app_header"
      :style="{ backgroundColor: `rgba(255,255,255,${rgba})` }"
    >
      <div
        class="button goBack"
        @click="goBack"
        :style="{
          background: `rgba(0,0,0,${
            0.1 + rgba / 10 > 0.3 ? 0.3 : 0.1 + rgba / 10
          })`,
        }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-chevron-down"
        >
          <path
            fill-rule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </div>
      <div
        class="button share"
        @click="share"
        :style="{
          background: `rgba(0,0,0,${
            0.1 + rgba / 10 > 0.3 ? 0.3 : 0.1 + rgba / 10
          })`,
        }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-share"
        >
          <path
            d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"
          />
        </svg>
      </div>
    </div>

    <div class="shopMain_app_footer" v-if="shopMessage.growth_location_detail">
      <shopPageFooter />
    </div>
    <van-tabs
      v-model="active"
      scrollspy
      :color="`rgba(65,139,192,${rgba})`"
      background="transparent"
      line-width="10vw"
      :title-active-color="`rgba(65,139,192,${rgba})`"
      :title-inactive-color="`rgba(102,102,102,${rgba})`"
    >
      <van-tab title="商品">
        <div class="box goods">
          <div class="slide">
            <van-swipe @change="onChange">
              <van-swipe-item
                v-for="(item, index) in shopMessage.images"
                :key="item"
              >
                <div class="slide_item" @click="img_click(index)">
                  <!-- <img
                    :src="`https://img01.yimishiji.com/v1/img/${item}.webp`"
                  /> -->
                  <van-image
                    width="100%"
                    height="100%"
                    radius="12px"
                    show-loading
                    :src="`https://img01.yimishiji.com/v1/img/${item}.webp`"
                  />
                </div>
              </van-swipe-item>

              <template #indicator>
                <div class="custom-indicator">
                  {{ current + 1 }}/{{ shopMessage?.images?.length }}
                </div>
              </template>
            </van-swipe>
          </div>
          <div class="goodsMessage" v-if="shopMessage.price">
            <div
              class="character_description"
              v-if="shopMessage?.character_description?.length != 0"
            >
              <div
                class="character_description_item"
                v-for="item in shopMessage.character_description"
                :key="item.character_image_id"
                :style="{
                  width: `${90 / shopMessage.character_description.length}%`,
                }"
              >
                <div class="img">
                  <img
                    :src="`https://img01.yimishiji.com/v1/img/${item.character_image_id}.webp`"
                  />
                </div>
                <div class="text">{{ item.desc }}</div>
              </div>
            </div>

            <div class="goodsMessage_Main" v-if="shopMessage.price">
              <div class="price" v-if="isSell">
                {{ `￥${parseFloat(shopMessage.price)}` }}
              </div>
              <div class="sell_Price price" v-else>
                {{ `￥${parseFloat(shopMessage.discount_price)}`
                }}<span class="black">{{
                  `￥${parseFloat(shopMessage.price)}`
                }}</span>
              </div>
              <div class="name">{{ shopMessage.name }}</div>
              <div class="text">{{ shopMessage.describe }}</div>
              <div class="rankList" v-if="shopMessage.rank_list.cat_id">
                <div class="rank">
                  <div class="title">排行榜</div>
                  <div class="rank_main">
                    {{ shopMessage.rank_list.cat_name
                    }}<span class="num">{{
                      `热卖排行榜${shopMessage.rank_list.rank_num}`
                    }}</span>
                  </div>
                  <div class="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      class="bi bi-chevron-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div class="goodsTags">
              <div class="preservation_method goodsTag">
                <div class="main">{{ shopMessage.preservation_method }}</div>
                <div class="text">存储条件</div>
              </div>
              <div class="farmer_name goodsTag">
                <div class="main">{{ shopMessage.farmer_name }}</div>
                <div class="text">农场</div>
              </div>
              <div class="farmer_farmer_addr goodsTag">
                <div class="main">{{ shopMessage?.farmer?.farmer_addr }}</div>
                <div class="text">产地</div>
              </div>
            </div>

            <div class="line"></div>

            <div class="goodsSize">
              <div class="specifications goodsSize_item">
                <div class="title">规格</div>
                <div class="text">{{ shopMessage.unit }}</div>
              </div>
              <div class="serve goodsSize_item">
                <div class="title">服务</div>
                <div class="text">{{ shopMessage.sale_service?.title }}</div>
              </div>
              <div class="activity goodsSize_item">
                <div class="title">活动</div>
                <div class="salesMain">
                  <div
                    class="sales_item"
                    v-for="item in shopMessage.salesRules"
                    :key="item.rule_id"
                  >
                    <div class="icon">{{ item.rule_tag }}</div>
                    <div class="text">{{ item.name }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="line"></div>
          </div>
        </div>
      </van-tab>
      <van-tab title="评价"
        ><div class="box comment"><shopPageComment /></div
      ></van-tab>
      <van-tab title="详情">
        <div class="box detail" v-if="shopMessage.growth_location_detail">
          <div class="line"></div>
          <div class="detailMessage">
            <div class="title">商品详情</div>
            <div class="detailMessage_item">
              <div class="text">规格</div>
              <div class="main">{{ shopMessage.unit }}</div>
            </div>
            <div class="detailMessage_item">
              <div class="text">保存方式</div>
              <div class="main">{{ shopMessage.preservation_method }}</div>
            </div>
            <div class="detailMessage_item">
              <div class="text">保质期</div>
              <div class="main">{{ shopMessage.best_before }}</div>
            </div>
            <div class="detailMessage_item">
              <div class="text">
                {{ shopMessage.growth_location_detail.col_key }}
              </div>
              <div class="main">
                {{ shopMessage.growth_location_detail.col_val }}
              </div>
            </div>

            <div
              class="detailMessage_item"
              v-for="i in shopMessage.increase_line"
              :key="i.title"
            >
              <div class="text">
                {{ i.title }}
              </div>
              <div class="main">
                {{ i.text }}
              </div>
            </div>
          </div>
          <div class="introduction">
            <div
              class="introductionItem_img"
              v-for="item in shopMessage.introduction_blocks[0].detail"
              :key="item.content"
            >
              <img
                :src="`https://img01.yimishiji.com/v1/img/${item.content}.webp`"
                v-if="item.type == 'image'"
              />
              <div class="introductionItem_img_text" v-if="item.type == 'text'">
                {{ item.content }}
              </div>
            </div>
          </div>
          <div class="widgets">
            <img
              v-for="i in shopMessage.widgets[0].elements"
              :key="i.value"
              :src="`https://img01.yimishiji.com/v1/img/${i.value}.webp`"
            />
          </div>
          <div class="farmer">
            <div class="farmer_title">农友伙伴</div>
            <div class="farmer_img">
              <img
                v-if="shopMessage.farmer.farm_first_img"
                :src="`https://img01.yimishiji.com/v1/img/${shopMessage.farmer.farm_first_img}.webp`"
              />
            </div>
            <div class="farmer_name">{{ shopMessage.farmer.farmer_name }}</div>
            <div class="farmer_text">{{ shopMessage.farmer.farmer_desc }}</div>
          </div>
        </div>
      </van-tab>
      <van-tab title="推荐">
        <div class="box Guess_You_Like" v-if="shopMessage.similar_products">
          <div class="Guess_You_Like_title">
            <div class="img_left">
              <img src="@/assets/shopMain/Guess_You_Like_title_left.png" />
            </div>
            猜你喜欢
            <div class="img_right">
              <img src="@/assets/shopMain/Guess_You_Like_title_right.png" />
            </div>
          </div>
          <div class="Guess_You_Like_main">
            <shopPageGuessYouLike />
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import shopPageComment from "@/components/shopPage/shopPageComment.vue"; //引入商品评论区组件
import shopPageFooter from "@/components/shopPage/shopPageFooter.vue"; //引入商品导航组件
import shopPageGuessYouLike from "@/components/shopPage/shopPageGuessYouLike.vue"; //引入猜你喜欢商品组件

import { mapState } from "vuex";
import { mapMutations } from "vuex";
import { ImagePreview } from "vant"; //图片预览
export default {
  name: "shopMainPage",
  data() {
    return {
      active: 0, //底部标签栏当前激活的索引
      current: 0, //顶部轮播图当前index
      rgba: 0,
      imgIsLoaded: false, // 图片是否已经加载完成 如果图片为请求到 则显示默认图片
    };
  },

  // created() {
  //   this.sendBookMain(); //请求书本主数据
  // },

  activated() {
    //路由激活时触发
    console.log("激活组件钩子");
  },

  // beforeRouteLeave(to, from, next) {
  //   console.log("to", to);
  //   console.log("from", from);

  //   if (to.name != "HomePage") {
  //     next();
  //   } else {
  //     this.$store.commit("setNavIndex", 1); //调用store的commit方法 直接调用mutations对state的数据进行修改 将app的nav显示
  //     next();
  //   }
  // },
  methods: {
    ...mapMutations("playPage", ["PLAY", "set_list", "set_sylloge"]),
    ...mapMutations("shopMain", ["setShowShopMain"]), //设置是否显示弹出层(商品详情页)

    goBack() {
      console.log("关闭弹出层");
      this.setShowShopMain(false);
    },

    share() {
      console.log("分享");
    },

    onChange(index) {
      //顶部轮播图切换
      this.current = index;
    },

    getScroll(event) {
      //滚动事件
      // 滚动条距离底部的距离scrollBottom
      // console.log("event.target.scrollHeight", event.target.scrollHeight);
      // console.log("event.target.scrollTop", event.target.scrollTop);

      this.rgba = event.target.scrollTop / 310; //这个数字 为刚好拉到轮播图以下时的数字
      // if (this.finished && scrollBottom < 40) {
      //  操作
      // }
    },

    img_click(n) {
      let list = [];
      for (let i = 0; i < this.shopMessage?.images?.length; i++) {
        list = [
          ...list,
          `https://img01.yimishiji.com/v1/img/${this.shopMessage.images[i]}.webp`,
        ];
      }
      ImagePreview({
        images: list,
        startPosition: n,
      });
    },

    // linkPlay() {
    //   this.$router.push("/playPage");
    //   this.$store.commit("setNavIndex", -1); //调用store的commit方法 直接调用mutations对state的数据进行修改 将app的nav隐藏
    // },
  },
  computed: {
    ...mapState("shopMain", ["shopMessage", "isShowShoppingPage"]), //向vuex的playPage模块中的state取值

    isSell() {
      //商品是否折扣
      if (this.shopMessage.price == this.shopMessage.discount_price) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {},

  components: {
    shopPageFooter,
    shopPageComment,
    shopPageGuessYouLike,
  },
};
</script>

<style lang="scss" scoped>
.shopMain_app {
  width: 100vw;
  height: 90vh;
  background-color: #fefefe;
  // border-radius: 6vw 6vw 0 0;
  overflow-y: auto;
  position: relative;
  border-radius: 16px 16px 0 0;

  .shopMain_app_header {
    position: fixed;
    top: 10vh;
    left: 0;
    width: 100%;
    height: 6vh;
    // background-color: aquamarine;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 4%;
    z-index: 19;
    // background-color: #fefefe;
    border-radius: 16px 16px 0 0;

    .button {
      width: 8vw;
      height: 8vw;
      background: rgba($color: #000000, $alpha: 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;

      svg {
        width: 50%;
        height: 50%;
        color: #ffffff;
        font-size: 1vh;
      }
    }
  }

  .shopMain_app_footer {
    width: 100%;
    height: 6vh;
    background-color: #fefefe;
    position: fixed;
    left: 0;
    bottom: 0;
    border-top: 0.5px solid rgba($color: #000000, $alpha: 0.1);
    z-index: 19;
  }

  .box {
    width: 100%;
    // background-color: chartreuse;
    z-index: 9;

    &.goods {
      //商品层
      width: 100%;
      .slide {
        //轮播图
        width: 100%;
        height: calc(80vw + 6vh);
        // background-color: aqua;

        .van-swipe {
          height: 100%;

          .slide_item {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            // background-color: chartreuse;

            img {
              width: 100%;
              height: 100%;
              display: block;
            }
          }

          .custom-indicator {
            position: absolute;
            right: 4vw;
            bottom: 4vw;
            padding: 1vh 2vh;
            font-size: 12px;
            letter-spacing: 2px;
            border-radius: 12px;
            color: #fff;
            background: rgba(0, 0, 0, 0.1);
          }
        }
      }

      .goodsMessage {
        width: 100%;
        // height: 1000px;
        // background-color: blueviolet;

        .character_description {
          height: 6vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          // background-color: blue;

          .character_description_item {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .img {
              height: 3vh;
              width: 3vh;

              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }

            .text {
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1vw;
              font-weight: 200;
              padding-left: 1vw;
              line-height: 2vh;
            }
          }
        }

        .goodsMessage_Main {
          width: 100%;
          padding: 1vh 2vw;
          .price {
            font-size: 3vh;
            color: #72b567;
            font-weight: bold;
            padding: 1vh 0;

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

          .name {
            font-size: 1.8vh;
            font-weight: 600;
            padding: 1vh 0 1vh 2vw;
          }

          .text {
            color: #666;
            font-size: 1.2vh;
            font-weight: 200;
            padding: 1vh 0 1vh 2vw;
          }

          .rankList {
            width: 100%;
            height: 3vh;
            border-radius: 4px;
            overflow: hidden;
            margin: 1vh 0;
            .rank {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              background-color: #ffefe1;
              position: relative;
              .title {
                background-color: #ffd5b2;
                display: flex;
                align-items: center;
                color: #733613;
                font-weight: bold;
                height: 100%;
                padding: 0 2vw;
                font-size: 1.6vh;
              }

              .rank_main {
                display: flex;
                align-items: center;
                color: #ab6135;
                font-weight: 200;
                font-size: 1.2vh;
                padding-left: 3vw;
              }

              .icon {
                display: flex;
                align-items: center;
                height: 100%;
                width: 3vh;
                position: absolute;
                right: 0;
                top: 0;

                svg {
                  width: 60%;
                  height: 60%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: #733613;
                }
              }
            }
          }
        }

        .goodsTags {
          width: 96%;
          height: 8vh;
          background-color: #ebf2f7;
          margin: 0vh 2% 1vh;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;

          .goodsTag {
            flex: 0 0 33.3%;
            font-size: 1.2vh;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            .main {
              color: #000;
              font-weight: bold;
            }

            .text {
              color: #666;
            }
          }
        }

        .line {
          width: 100%;
          height: 1.5vh;
          background-color: #f5f8fa;
        }

        .goodsSize {
          width: 100%;
          color: #999;
          padding: 1vh 3vw 0;
          font-size: 1.6vh;

          .goodsSize_item {
            padding: 1.4vh 0;
            display: flex;

            .title {
              margin-right: 2vw;
            }

            .text {
              font-size: 1.2vh;
              color: #333;
            }

            .sales_item {
              display: flex;
              padding: 0 0 1.2vh;

              .icon {
                img {
                  width: 100%;
                  height: 100%;
                  display: block;
                }
              }

              .text {
                margin-left: 2vw;
              }
            }
          }
        }
      }
    }

    &.comment {
      width: 100%;
      // height: 1000px;
      // background-color: #fa5555;
    }

    &.detail {
      width: 100%;
      // height: 1000px;
      // background-color: #fa5555;

      .line {
        width: 100%;
        height: 1.5vh;
        background-color: #f5f8fa;
      }

      .detailMessage {
        padding: 2vh 3vw;
        width: 100%;
        background-color: #fefefe;
        color: #333;
        line-height: 5vh;
        .title {
          font-size: 2vh;
          // margin-bottom: 2.4vh;
        }

        .detailMessage_item {
          display: flex;
          align-items: flex-start;
          // margin-bottom: 2.4vh;
          font-size: 1.8vh;
          .text {
            color: #999;
            width: 20vw;
            display: flex;
            align-items: center;
            flex: 0 0 20%;
          }

          .main {
            display: flex;
            align-items: center;
            white-space: pre-line; //让vue的插值语法能够识别到\n换行符并进行换行
          }
        }
      }

      .introduction {
        //商品介绍图片模块
        width: 100%;

        .introductionItem_img {
          width: 100%;

          img {
            width: 100%;
            display: block;
          }

          .introductionItem_img_text {
            padding: 1vh 4vw;
            line-height: 4vh;
            color: #666;
          }
        }
      }

      .widgets {
        width: 100%;

        img {
          width: 100%;
          display: block;
        }
      }

      .farmer {
        width: 100%;
        padding: 2vh 4vw;

        .farmer_title {
          margin-bottom: 2vh;
          font-size: 1.8vh;
          font-weight: 500;
          color: #333;
        }

        .farmer_img {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2vh;

          img {
            width: 100%;
            display: block;
            border-radius: 8px;
          }
        }

        .farmer_name {
          color: #000;
          font-size: 2vh;
          font-weight: bold;
          margin-bottom: 2vh;
        }

        .farmer_text {
          color: #666;
          font-size: 1.6vh;
          font-weight: 400;
          line-height: 4vh;
        }
      }
    }

    &.Guess_You_Like {
      width: 100%;
      background-color: #f5f8fa;
      padding-bottom: 3vh;

      .Guess_You_Like_title {
        width: 100%;
        height: 6vh;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2vh;
        font-weight: bold;
        color: #000;

        .img_left,
        .img_right {
          height: 3vh;
          margin: 0 2vw;
          img {
            height: 100%;
            display: block;
          }
        }
      }

      .Guess_You_Like_main {
        width: 100%;
      }
    }
  }
}

::v-deep .van-tabs--line .van-tabs__wrap {
  //竖向标签页样式
  position: fixed;
  top: 10vh;
  left: 15%;
  height: 6vh;
  width: 70%;
  z-index: 99;

  .van-tabs__nav {
    // background-color: transparent;

    .van-tab {
      align-items: flex-end;
      padding-bottom: 0.5vh;
      font-size: 2vh;
    }
  }
}
</style>
