export default {
    namespaced: true, //开启命名空间
    state: { //放数据
        // showShopMain: false,
        goodsList: [], //存储所有商品的数组
        topSellingGoods: [],
        GuessYouLike_goods: [],
        isShowShoppingPage: true,
        transitionName: "", //当前路由切换进行的动画
    },
    mutations: { //处理数据的事件
        addGoods(state, value) { //传入商品的基本数据 以及商品的唯一id

            let i = state.goodsList.findIndex(item => //在购物车里查找 是否已存在该id的商品
                item.goods_id == value.goods_id
            )

            if (i == -1) { //如果商品不存在 则添加商品
                state.goodsList = [...state.goodsList, value]
            } else { //如果已存在该商品 则增加其数量
                state.goodsList[i].num++
            }


        },
        deleteGoods(state, id) { //删除该商品
            state.goodsList = state.goodsList.filter(item => item.goods_id != id)
        },
        Goods_Increase_And_Decrease(state, idAndNum) { // 增减该商品数量

            let i = state.goodsList.findIndex(item => //在购物车里查找 是否已存在该id的商品
                item.goods_id == idAndNum.id
            )
            state.goodsList[i].num += idAndNum.num

        },
        selectGoods(state, id) { //选择该商品
            let i = state.goodsList.findIndex(item => //在购物车里查找 是否已存在该id的商品
                item.goods_id == id
            )
            state.goodsList[i].checked = !state.goodsList[i].checked
        },
        deleteChangeGoods(state) { //删除所有已被选择的商品
            state.goodsList = state.goodsList.filter(item => item.checked != true)
        },
        check_all_goods(state) { //选择所有商品事件
            state.goodsList = state.goodsList.map(i => {
                return {
                    ...i,
                    checked: true
                }
            })
        },
        Invert_Selection_goods(state) { //反选所有商品事件
            state.goodsList = state.goodsList.map(i => {
                return {
                    ...i,
                    checked: false
                }
            })
        },
        setTopSellingGoods(state, value) {
            state.topSellingGoods = value
        },
        setGuessYouLike_goods(state, value) {
            state.GuessYouLike_goods = value
        },
        showShoppingPage(state) {
            state.isShowShoppingPage = true
        },
        hideShoppingPage(state) {
            state.isShowShoppingPage = false
        },
        setTransitionName(state, value) {
            state.transitionName = value

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
    getters: { //经过处理后的数据
        goodsNum(state) { //商品总数量

            let num = 0;

            state.goodsList.forEach(ele => {
                if (ele.checked) {
                    num += ele.num
                }
            });

            return num
        },
        total_price(state) { //商品总价格

            let price = 0;

            state.goodsList.forEach(ele => {
                if (ele.checked) {
                    price += ele.sell_price * ele.num
                }
            });

            return price.toFixed(2) //保留两位小数
        }


    }
}