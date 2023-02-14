export default {
    namespaced: true, //开启命名空间
    state: {
        showShopMain: false,
        shopMessage: {}, //当前应该展示的商品总信息
        isShowShoppingPage: true, //是否显示商品页 让评论区显示出来
    },
    mutations: {
        setShowShopMain(state, value) {
            state.showShopMain = value
        },
        setShopMessage(state, value) {
            state.shopMessage = value
        },
        ShowShoppingPage(state) {
            state.isShowShoppingPage = true
        },
        HideShoppingPage(state) {
            state.isShowShoppingPage = false
        }
    },
    actions: {
        // addZhang(context, value) {
        //     //value参数是一个对象
        //     if (value.name.indexOf('张') === 0) {
        //         context.commit('ADD_PERSON')
        //     } else {
        //         alert('这个人不姓张！')
        //     }
        // },
        // addServer(context, value) {
        //     axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(res => {
        //         context.commit('ADD_PERSON', {
        //             name: res.data
        //         })
        //     }, error => {
        //         alert(error.message)
        //     })
        // }
    },
    getters: {
        // songDuration(state, getters) {


        // }



    }
}