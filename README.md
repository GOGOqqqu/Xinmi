```
技术栈 
1.vue3
2.vue-router4
3.sass
4.vant4
5.pinia
6.vueuse
7.axios
8.mitt
9.animete.css
10.git
```

```
模块一:日子
```

```
模块二:人升
```

```
模块三:one
```

```
一些注意事项:
1.路由元对象meta中的hierarchy代表路由的层级 用于判断做出不同的路由动画
2.写样式时背景和字体颜色需要调用pinia中写好的计算属性 区分开黑夜模式与非黑夜模式的颜色 需要添加可以在pinia中按照模板自行添加
3.网络请求
先在api文件中写好方法 api文件拆成了三个模块
再在组件内引入api
import api from "../api";
调用方法时 如调用one模块的方法 则
let { data } = await api.one.getData()
```

