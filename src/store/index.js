import Vue from 'vue'
import Vuex from 'vuex'

import playPage from './playPage' //上一个项目的 参考文件
import shopMain from './shopMain' //商品内容模块
import homePage from './homePage' //主页模块
import shopping from './shopping' //购物篮模块
import searchPage from './searchPage' //购物篮模块




// 引入播放页的模块

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShowAppNavBar: true, //是否显示app的底部导航
    isLogin: false,
    userPhone: null,
    poi_address: '', //位置路径
    poi_name: '', //位置名
    site_list: [], //用户的地址的列表
    map_lat: '',
    map_lng: '',
  }, //数据库
  getters: {},
  mutations: {
    ShowAppNavBar(state) { //显示导航栏
      state.isShowAppNavBar = true
    },
    HideAppNavBar(state) { //隐藏导航栏
      state.isShowAppNavBar = false
    },
    setLogin(state, value) {
      state.isLogin = value
      let YiMiUser = localStorage.YiMiUser ? JSON.parse(localStorage.YiMiUser) : {}
      localStorage.YiMiUser = JSON.stringify({
        ...YiMiUser,
        isLogin: value
      })
    },
    setUserPhone(state, value) {
      state.userPhone = value
      let YiMiUser = localStorage.YiMiUser ? JSON.parse(localStorage.YiMiUser) : {}
      localStorage.YiMiUser = JSON.stringify({
        ...YiMiUser,
        userPhone: value
      })
    },
    set_poi_address(state, value) {
      state.poi_address = value
    },
    set_poi_name(state, value) {
      state.poi_name = value
    },
    add_site(state, i) {
      state.site_list = [{
        name: i.name,
        main: i.main,
        doorplate: i.doorplate,
        consignee: i.consignee, //收货人
        phone: i.phone, //手机号
      }, ...state.site_list]
    },
    map_lat(state, value) {
      state.map_lat = value
    },
    map_lng(state, value) {
      state.map_lng = value
    },
  },
  actions: {},
  modules: {
    playPage,
    shopMain,
    homePage,
    shopping,
    searchPage,
    // 注册播放页模块
  }
})