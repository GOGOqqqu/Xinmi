export default {
    namespaced: true, //开启命名空间
    state: {
        address: '~正在定位中~',
        city: '',
        x: 0,
        y: 0,
        popUpAdUrl: '', // 首页弹窗广告图片url
    },
    mutations: {
        setAddress(state, value) {
            state.address = value
        },
        setCity(state, value) {
            state.city = value
        },
        set_x(state, value) {
            state.x = value
        },
        set_y(state, value) {
            state.y = value
        },
        setPopUpAdUrl(state, value) {
            state.popUpAdUrl = value
        },


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