import { createApp } from 'vue'
import './style.css'  //引入取出默认样式的css
import App from './App.vue'
import router from "./router";  //引入vue-router
import { setupStore } from '@/stores/config'   //引入pinia的数据持久化
import mitt from 'mitt'   //引入mitt
const Mit = mitt()  //创建mitt实例
declare module "vue" {   //为mitt添加类型验证 获得代码提示
    export interface ComponentCustomProperties {
        $Bus: typeof Mit
    }
} 

let app = createApp(App)
app.config.globalProperties.$Bus = Mit   //在全局挂载上mitt实例 可通过$Bus调用
setupStore(app)   //挂载pinia的数据持久化函数 并挂载pinia本体

app.use(router)  //挂载路由
// 注册全局的组件
app.mount('#app')


