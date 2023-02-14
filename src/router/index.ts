import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: '/',
        component: () => import('../view/container.vue'),
        children: [
            {
                path: '',
                name: 'index',
                component: () => import('../components/index.vue'),
                meta: {
                    hierarchy: 1
                }
            },
            {
                path: '/article',
                name: 'article',
                component: () => import('../components/article.vue'),
                meta: {
                    hierarchy: 2
                }
            },
            {
                path: '/details',
                name: 'details',
                component: () => import('../view/articleSetails.vue'),
                meta: {
                    hierarchy: "文章详情页"
                },
            },
            {
                path: '/planning',
                name: 'planning',
                component: () => import('../components/planning/planning.vue'),
                meta: {
                    hierarchy: 3
                },
            },
            {
                path: '/shop',
                name: 'shop',
                component: () => import('../components/shop.vue'),
                meta: {
                    hierarchy: 4
                }
            },
            {
                path: '/me',
                name: 'me',
                component: () => import('../components/me.vue'),
                meta: {
                    hierarchy: 5
                }
            },

        ]
    },
    { // todo添加页
        path: '/addTodoDail',
        name: 'addTodoDail',
        component: () => import('@/view/todo/addTodoDetail.vue')
    },
    { // 单个todo详情页
        path: '/todoDetail',
        name: 'todoDetail',
        component: () => import('@/view/todo/todoDetail.vue')
    },
    {
        path:'/settingTodo',
        name:'settingTodo',
        component:()=>import('@/view/index/settingTodo.vue'),
    },
    {
        path:'/addTodo',
        name:'addTodo',
        component:()=>import('@/view/index/addTodo.vue'),
    },
    {
        path:'/global_vision',
        name:'global_vision',
        component:()=>import('@/view/index/global_vision.vue'),
    },

]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router