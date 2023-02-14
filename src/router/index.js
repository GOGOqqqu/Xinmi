import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeMe from '@/views/HomeMe.vue'
import homePage from '../views/homePage.vue'
import choicenessPage from '../views/choicenessPage.vue'
import classifyPage from '../views/classifyPage.vue'
import mePage from '../views/mePage.vue'
import shoppingPage from '../views/shoppingPage.vue'
// import commentPage from '../views/commentPage.vue'
import topPage from '../views/topPage.vue'
import searchPage from '../views/searchPage.vue'
import messagePage from '../views/messagePage.vue'
import loginPage from '../views/loginPage.vue'
import settingPage from '../views/settingPage.vue'
import submitOrderPage from '../views/submitOrderPage.vue'
import sitePage from '../views/sitePage.vue'
import navigationPage from '../views/navigationPage.vue'




import HomeView from '../components/chaozhi/ChaoZhi.vue'
import CiDeView from '@/components/chaozhi/CiDeView'
import FuLiView from '@/components/chaozhi/FuLiView'
import TeSeView from '@/components/chaozhi/TeSeView'
import ZhaoPinView from '@/components/chaozhi/ZhaoPinView'
import RouterPageView from '@/components/chaozhi/route/RouterPageView.vue'
import ArticleView from '@/components/chaozhi/wengzhang/ArticleView.vue'
import store from "@/store"


Vue.use(VueRouter)
//     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')   //懒加载示例
const routes = [{
    path: '/',
    name: 'homePage',
    component: homePage,
    meta: { //路由层级 用于判断 路由是前进还是后退 做出不同的切换动画
      index: 1
    },
  },
  {
    path: '/choicenessPage',
    name: 'choicenessPage',
    component: choicenessPage,
    meta: { //路由层级 用于判断 路由是前进还是后退 做出不同的切换动画
      index: 3
    },
  },
  {
    path: '/classifyPage',
    name: 'classifyPage',
    component: classifyPage,
    // components: {
    //   default: classifyPage,
    //   commentPage: commentPage
    // },
    meta: { //路由层级 用于判断 路由是前进还是后退 做出不同的切换动画
      index: 2
    },
    // children: [{
    //   path: '/classifyPage/searchPage',
    //   name: 'searchPage',
    //   component: () => import('../views/searchPage.vue'),
    //   meta: { //路由层级 用于判断 路由是前进还是后退 做出不同的切换动画
    //     index: 99
    //   },
    // }, ]
  },
  {
    path: '/mePage',
    name: 'mePage',
    component: mePage,
    meta: { //路由层级 用于判断 路由是前进还是后退 做出不同的切换动画
      index: 5
    },
    beforeEnter: (to, from, next) => {
      if (!store.state.isLogin) {
        next({
          name: 'loginPage'
        })
      } else {
        next()
      }
    }
  },
  {
    path: '/shoppingPage',
    name: 'shoppingPage',
    component: shoppingPage,
    meta: { //路由层级 用于判断 路由是前进还是后退 做出不同的切换动画
      index: 4
    },
    children: [{
      path: '/shoppingPage/topPage',
      name: 'topPage',
      component: topPage,
      meta: { //路由层级 用于判断 路由是前进还是后退 做出不同的切换动画
        index: 99
      },
    }, ]
  },
  {
    path: '/searchPage', //搜索页
    name: 'searchPage',
    component: searchPage,
    meta: { //路由层级 用于判断 路由是前进还是后退 做出不同的切换动画
      index: 6
    },
  },
  {
    path: '/messagePage', //消息页
    name: 'messagePage',
    component: messagePage,
    meta: { //路由层级 用于判断 路由是前进还是后退 做出不同的切换动画
      index: 6
    },
  },
  {
    path: '/loginPage', //登录页
    name: 'loginPage',
    component: loginPage,
    meta: { //路由层级 用于判断 路由是前进还是后退 做出不同的切换动画
      index: 6
    },
  },
  {
    path: '/settingPage', //设置页
    name: 'settingPage',
    component: settingPage,
    meta: { //路由层级 用于判断 路由是前进还是后退 做出不同的切换动画
      index: 7
    },
  },

  {
    path: '/submitOrderPage', //提交订单页面
    name: 'submitOrderPage',
    component: submitOrderPage,
    meta: { //路由层级 用于判断 路由是前进还是后退 做出不同的切换动画
      index: 7
    },
  },
  {
    path: '/sitePage', //填写地址页
    name: 'sitePage',
    component: sitePage,
    meta: { //路由层级 用于判断 路由是前进还是后退 做出不同的切换动画
      index: 8
    },
  },
  {
    path: '/navigationPage', //导航页
    name: 'navigationPage',
    component: navigationPage,
    meta: { //路由层级 用于判断 路由是前进还是后退 做出不同的切换动画
      index: 9
    },
  },


  {
    path: '/chaozhi',
    name: 'chaozhi',
    component: HomeView,
  },

  {
    //吃的页面
    path: '/cide',
    name: 'cide',
    component: CiDeView,
  },
  {
    //特色页面
    path: '/tese',
    name: 'tese',
    component: TeSeView,
  },
  {
    //福利页面
    path: '/fulin',
    name: 'fulin',
    component: FuLiView,
  },
  {
    //招聘页面
    path: '/zhaopin',
    name: 'zhaopin',
    component: ZhaoPinView,
  },

  {
    //跳转页面
    path: '/shipin',
    name: 'shipin',
    component: RouterPageView,
  },
  {
    //文章跳转页面
    path: '/wengzhang',
    name: 'wengzhang',
    component: ArticleView,
  },




]

// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
//新版本路由 在路由重定向之后 使用next方法重定向到不同路径 会报出错误(不影响功能)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})


export default router