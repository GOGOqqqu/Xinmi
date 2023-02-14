<template>
  <div class="mapPage">
    <div id="container"></div>
  </div>
</template>

<script>
// import AMapLoader from "@amap/amap-jsapi-loader";
import { mapState } from "vuex";

export default {
  name: "mapPage",
  data() {
    return {
      lat: 0,
      lng: 0,
      zoom: 15,
    };
  },

  created() {
    this.lat = this.x;
    this.lng = this.y;
  },

  mounted() {
    let self = this;
    setTimeout(function () {
      self.initMap();
    }, 800); //延时加载地图，保证数据获取成功
  },

  watch: {
    map_lat() {

      this.lng = this.map_lat;
      this.lat = this.map_lng;
    },
  },

  methods: {
    initMap() {
      this.$mapUtil
        .loadMap("2.0")
        .then((AMap) => {
          let map = new AMap.Map("container", {
            zoom: this.zoom,
            center: [this.lat, this.lng], //初始化地图中心点
            resizeEnable: true,
          });
          function onClick(e) {
            console.log(e.originEvent.lnglat);
            this.lat = e.originEvent.lnglat.lat;
            this.lng = e.originEvent.lnglat.lng;
            console.log("this.lat", this.lat);
            console.log("this.lng", this.lng);

            map.setCenter([this.lng, this.lat]); //设置地图中心点
          }
          // 给地图实例绑定点击事件 onClick
          map.on("click", onClick);
        })
        .catch(() => {
          console.log("地图加载失败！");
        });
    },
  },
  computed: {
    ...mapState("homePage", ["x", "y"]), //向vuex的playPage模块中的state取值
    ...mapState(["map_lat", "map_lng"]), //向vuex的playPage模块中的state取值
  },

  components: {},
};
</script>

<style lang="scss" scoped>
.mapPage {
  width: 100%;
  height: 100%;

  #container {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 100%;
  }
}
</style>
