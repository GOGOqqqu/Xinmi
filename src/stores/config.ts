import type { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
const store = createPinia()   //创建仓库实例
store.use(piniaPluginPersist)  //给pinia挂载上数据持久化的功能

export function setupStore(app: App<Element>) {   //导出一个函数 用于main.ts 配置pinia的数据持久化
    app.use(store)  //给app挂载上pinia本体
}

export { store }   
