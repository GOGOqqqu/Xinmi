// 异步加载高德地图
export default {
    loadMap(
        v = '1.4.15',
        // v = '2.0',
        key = '21ea1cee8186cfac66d619548dfa8323') {
        return new Promise(function (resolve, reject) {
            let hasLoaded = document.getElementById("amap");
            if (hasLoaded) { // 只加载一次
                //如果版本一致则直接返回，避免重复请求
                if (hasLoaded._version === v && hasLoaded._key === key) {
                    resolve(window.AMap);
                    return;
                }
                document.head.removeChild(hasLoaded);
            }
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.id = "amap";
            script.src = `https://webapi.amap.com/maps?v=${v}&key=${key}&callback=initAMap`;
            //此处若缺失callback，则页面在刷新后地图会变为空白不显示
            script.onerror = reject;
            script._version = v;
            script._key = key;
            document.head.appendChild(script)
            window.initAMap = () => {
                resolve(window.AMap)
            }
        });
    },
}
// import { mapState } from "vuex";

// ...mapState("homePage", ["x", "y"]), //向vuex的playPage模块中的state取值
