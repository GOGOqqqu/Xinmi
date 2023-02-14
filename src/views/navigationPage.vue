<template>
  <div class="navigationPage">
    <beInHeader :title="`选择地区`" :isShowNav="false" />
    <van-popup v-model="show" position="bottom" :style="{ height: '308px' }">
      <van-area
        title="选择城市"
        :area-list="areaList"
        :columns-num="2"
        @cancel="cancel"
        @confirm="confirm"
      />
    </van-popup>
    <div class="searchPageBar">
      <div class="city_button" @click="open">
        {{ thisCity }}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-caret-down-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
          />
        </svg>
      </div>
      <div class="site_search">
        <div class="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
            />
          </svg>
        </div>
        <input type="text" placeholder="小区/街道/写字楼" v-model.trim="key" />
      </div>
    </div>
    <div class="mapPage">
      <mapPage />
    </div>
    <div class="list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          class="li"
          v-for="item in list"
          :key="item.longitude"
          @click="SET_SITE(item.poi_address, item.poi_name)"
        >
          <div class="title">{{ item.poi_address }}</div>
          <div class="main">{{ item.poi_name }}</div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import beInHeader from "@/components/beInHeader.vue"; //引入通用头部组件
import mapPage from "@/views/mapPage.vue"; //引入百度地图组件

import { areaList } from "@vant/area-data"; //引入地图列表
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "navigationPage",
  data() {
    return {
      key: "",
      list: [],
      loading: false,
      finished: false,
      areaList,
      show: false,
      thisCity: "",
      canSearch: true, //是否可以搜索 用于防抖

      addressInfo: {},
    };
  },

  created() {
    // this.sendData();
    this.thisCity = this.city;
  },

  watch: {
    key() {
      if (this.canSearch) {
        this.onLoad();
        //触发技能后，关闭开关
        this.canSearch = false;

        //在3秒后打开开关
        setTimeout(() => (this.canSearch = true), 1000); //函数防抖
      }
    },
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
    ...mapMutations(["ShowAppNavBar", "set_poi_address", "set_poi_name"]),
    ...mapMutations("homePage", ["setCity"]),
    ...mapMutations(["map_lat", "map_lng"]),

    ...mapMutations("shopping", ["showShoppingPage", "setTransitionName"]),

    // linkPlay() {
    //   this.$router.push("/playPage");
    //   this.$store.commit("setNavIndex", -1); //调用store的commit方法 直接调用mutations对state的数据进行修改 将app的nav隐藏
    // },

    confirmMapAddress(addressInfo) {
      this.addressInfo = addressInfo;
    },

    onLoad() {
      //请求地址列表
      this.$axios({
        method: "get",
        url: `api/v3/addresses?system_version=23&region=${
          this.thisCity
        }&platform=ANDROID&access_token=49c1d73371f21b802fc1aa80e5328dc815fbd3e5&addr_id=268598&suppress_response_code=true&keyword=${
          this.thisCity + this.key
        }&version=91&device_model=SM-G9550&device_token=3a9d878bbe058d4cf6f6f3dfc689900f&channel=tencent`,
      })
        .then(({ data }) => {
          console.log("aaaaaaaaaaaaaaaa", data.results[0].query.latitude);
          this.list = data.results[0].addrs;
          this.loading = false;
          this.finished = true;
          this.map_lat(data.results[0].query.longitude);
          this.map_lng(data.results[0].query.latitude);

          console.log("this.thisCity", this.thisCity);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    open() {
      this.show = true;
    },

    cancel() {
      this.show = false;
    },

    confirm(n) {
      console.log("n", n);
      console.log("点击了确认");
      this.thisCity = n[1].name;
      this.onLoad();
      this.show = false;
    },

    SET_SITE(poi_address, poi_name) {
      this.set_poi_address(poi_address);
      this.set_poi_name(poi_name);
      this.$router.go(-1);
    },
  },
  computed: {
    ...mapState("homePage", ["city"]), //向vuex的playPage模块中的state取值

    center_p() {
      return { lng: this.list[0]?.longitude, lat: this.list[0]?.latitude };
    },
  },
  mounted() {},

  deactivated() {
    //失活周期 销毁该组件 防止残留数据
    this.$destroy();
  },

  components: {
    beInHeader,
    mapPage,
  },
};
</script>

<style lang="scss" scoped>
.navigationPage {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #f5f8fa;

  .searchPageBar {
    width: 100%;
    height: 6vh;
    margin: 0 0 2vh;
    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 0 3vw;
    .city_button {
      height: 100%;
      width: 20%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000;
      font-size: 1.6vh;
      font-weight: bold;
      svg {
        height: 36%;
        aspect-ratio: 1/1; //保持宽高等比
      }
    }

    .site_search {
      height: 100%;
      width: 70%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      .icon {
        height: 100%;
        aspect-ratio: 1/1; //保持宽高等比
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 0%;
        top: 0;
        svg {
          width: 36%;
          height: 36%;
          color: #333;
        }
      }
      input {
        height: 90%;
        width: 90%;
        padding-left: 12vw;

        &::placeholder {
          color: #999;
          font-size: 1.6vh;
        }
      }
    }
  }

  .mapPage {
    width: 100%;
    height: 30vh;
  }

  .list {
    width: 100%;

    .li {
      width: 100%;
      height: 12vh;
      font-size: 1.6vh;
      display: flex;
      padding: 1vh 5vw;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: space-evenly;
      border-bottom: 0.5px solid rgba($color: #000000, $alpha: 0.05);
      .title {
        color: #304759;
        font-weight: 600;
      }

      .main {
        color: #9a9c9e;
        font-weight: 300;
      }
    }
  }
}
</style>
