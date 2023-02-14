<template>
  <!-- 特色页面 -->
  <div class="ci">
    <div class="tou">
      <div class="ci-tou">
        <router-link tag="div" to="/chaozhi">
          <div class="hi">今日精选</div>
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
          <div class="hi jia">吃的百科</div>
        </router-link>
        <router-view />
      </div>
    </div>

    <!-- 顶部文章 -->
    <div class="top">
      <div class="img1"></div>

      <div class="bian">
        {{ top.name }}
        <span class="zui">最新</span>
      </div>

      <div class="text" v-html="top.preview"></div>
      <div class="shiji">
        <span class="span1">{{ top.date?.slice(0, 10) }}</span>
        <span class="span2">{{ top.read_num }}</span>
        <span class="span3">阅读</span>
        <span class="span4">阅读更多 ></span>
      </div>
    </div>

    <!-- 轮播图 -->
    <div class="tu" @click="BANb">
      <van-swipe :loop="false" :width="300">
        <div class="tu-swipe" v-for="(item, i) in banner" :key="i">
          <van-swipe-item>
            <div class="iamge">
              <!-- <img src="../../assets/img" alt=""> -->
              <img v-if="i == 0" src="../../assets/img/lu0.png" />
              <img v-if="i == 1" src="../../assets/img/lu1.png" />
              <img v-if="i == 2" src="../../assets/img/lu2.png" />
              <img v-if="i == 3" src="../../assets/img/lu3.png" />

              <span class="bg-text1">猜你想了解</span>
              <div class="bg-text2">{{ item.name }}</div>
            </div>
          </van-swipe-item>
        </div>
      </van-swipe>
    </div>

    <!-- 日报区域 -->
    <div class="content" key="13df21456">
      <div class="content-top top2">热门文章</div>
      <div class="content-content con">
        <!-- 渲染开始 -->
        <div
          class="content-text te"
          v-for="(item, i) in weng"
          :key="i"
          @click="JumpPage(item)"
          to="/chaozhi"
        >
          <!-- 文本的左边内容 -->
          <div class="text-left">
            <div class="text-top van-multi-ellipsis--l2">{{ item.title }}</div>

            <div class="text-botom">
              <div class="shiji">
                <span class="span1"
                  >{{ item.catename }}:{{ item.releasetime.slice(0, 10) }}</span
                >
                <span class="span2">{{ item.clicknum }}阅读</span>
                <span class="span4">更多 ></span>
              </div>
            </div>
          </div>

          <!-- 文本的右边内容 -->
          <div class="text-right">
            <img :src="item.breviaryimges" />
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
      banner: Array, //轮播图
      list: Array, //下面的文章列表
      top: Array, //顶部文章
      stories: "",
      top_stories: "",
      weng: "",
    };
  },
  methods: {
    // 文章数据
    RequestA() {
      this.$axios({
        method: "get",
        url: `shishi/?Method=news.content.list&Params=C8290BD6CA6DB1B7FAB60BD54CD32B79B131ED3DFD1BBBF6B951CCBF2887F04DDA671CEDDD824CAC442DF609D6F9AA8F9C31B812C367BFA81F5CA21C314016675CEB5A5BF8A8355D9832DF18B5DD9A456CB08931B694F674687BB7FE41436AD45508E8C4EFC749EC5594C4D4422026323A2445BC8E7CE6F3159A05958B2C4A20C95FEA98DD6C6CD3D42FFF3EE9A2DEF40ED7CC2F786F24564631B979CBCF03939A17B1D55829B4E1EE059DC8F12475F60DCF47FC55000C55196F019CE25B37FE&Sign=8A3FE8CD87EAA526F98390F57943074C`,
      })
        .then(({ data }) => {
          console.log("data2311", data.data);
          this.weng = data.data; //顶部文章
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // 请求数据
    Request() {
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
        url: `chaozhi/front-ux/growth_zero/api/v1/wechat/mp_article/list`,
      })
        .then(({ data }) => {
          console.log("data", data);
          this.top = data.results[0].latest; //顶部文章
          this.banner = data.results[0].recent; //轮播图
          this.list = data.results[0].most_read; //下面的文章列表
          console.log("顶部文章", this.top);
          console.log("头部轮播图", this.banner);
          console.log("下面的图片列表", this.list);
        })
        .catch((error) => {
          console.log(error);
        });

      this.$toast.clear(); //请求完成 关闭loading
    },

    BANb() {
      console.log(this.lists);
    },
    //点击跳转 https://apis.netstart.cn/zhihudaily/story/9741200
    // `http://newwap.hebiw.com/news/${this.id}.html`
    JumpPage(e) {
      console.log(e);
      console.log(e.newsid);
      this.$toast.clear(); //请求完成 关闭loading、
      this.$router.push({
        name: "wengzhang",
        params: {
          id: e.newsid,
          name: e.title,
          url: `http://newwap.hebiw.com/news/${e.newsid}.html`,
        },
      });
    },
  },
  created() {
    this.RequestA();
    this.Request();
  },
};
</script>
<style lang="scss" scoped src="./ScssWengJian/CiDe.scss"></style>
