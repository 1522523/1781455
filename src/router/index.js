import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Main',
        component: () => import('../views/Main'),//箭头函数按需引入的方法
        children: [

            {
                path: '/home',
                name: 'home',
                component: () => import('../views/home.vue')
            },
            {
                path: '/user',
                name: 'user1',
                component: () => import('../views/user1')
            },
            {
                path: '/mall',
                name: 'user2',
                component: () => import('../views/user2')
            },
            {
                //url
                path: '/page1',
                name: 'user3',
                redirect: '/video',
                //目录中的vue文件
                component: () => import('../views/user3'),
                children: [
                    {
                        path: '/video',
                        name: 'video',
                        component: () => import('../views/video'),
                    },
                    {
                        path: '/image',
                        name: 'image',
                        component: () => import('../views/image'),
                    },
                    {
                        path: '/arcticle',
                        name: 'arcticle',
                        component: () => import('../views/arcticle'),
                    }
                ]
            },
            {
                path: '/user4',
                name: 'user4',
                component: () => import('../views/user4')
            },
            {
                path: '/admin',
                name: 'admin',
                component: () => import('../views/admin')
            },
            //不要写死，动态添加
            {
                path: '/person',
                name: 'person',
                component: () => import('../views/person')
            },
        ]
    },
    {
        path: '/login',
        name: "login",
        component: () => import('../views/lojin.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/register.vue')

    },
]

const router = new VueRouter({
    mode: 'history',//保证url中不出现'/#/'
    routes,
})

export default router