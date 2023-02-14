<template>
  <!-- 福利页面 -->
  <div class="fu">
    <div class="tou">
      <div class="fu-tou">
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
          <div class="hi jias">福利社区</div>
        </router-link>
        <router-link tag="div" to="/cide">
          <div class="hi">吃的百科</div>
        </router-link>
        <router-view />
      </div>
    </div>

    <div class="fu-content">
      <img src="../../assets/img/fu1.png" alt="" />
      <img src="../../assets/img/fu2.png" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      ren: "", //人气优选
      zhong: "", //视频种草
      xuan: "", //超值精选
      hao: "", //好评推荐
      xia: "", //下面的一大堆图片及数据
    };
  },
  components: {},
  methods: {},
};
</script>

<style lang="scss" scoped src="./ScssWengJian/FuLi.scss"></style>
