import Cookies from "js-cookie"

export default {
    state: {
        //面包屑，
        tabsList: [
            {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        currentMenu: null,
        menu:  [
            
        ],
    },
    mutations: {
        //控制面包屑的出现，改变state中tabsList的值
        selectMenu(state, val) {
            if (val.name !== 'home') {
                console.log(val.name);
                state.currentMenu = val
                //findIndex方法
                const result = state.tabsList.findIndex(item => item.name === val.name)
                //result==-1的话，说明tabsList中没有我们要添加的元素
                if (result === -1) {
                    state.tabsList.push(val)
                }
            } else {
                state.currentMenu = null
            }
        },
        closeTag(state, val) {
            const result = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(result, 1)
        },


        //权限管理：
        setMenu(state, val) {
            state.menu = val
            //cookie只能存字符串
            Cookies.set('menu', JSON.stringify(val))
        },

        clearMenu(state) {
            state.menu = []
            Cookies.remove('menu')
        },

        addMenu(state, router) {
            if (!Cookies.get('menu')) {
                return
            }
            const menu = JSON.parse(Cookies.get('menu'))
            state.menu = menu
            // const menuArray = []
            // menu.forEach(item => {
            //         item.component = () => import(`../views/${item.url}`)//这是什么写法
            //         menuArray.push(item)
            // })
            // 路由的动态添加为什么无效
            // menuArray.forEach(item => {
            //     router.addRoute('Main', item)
            // })
            // router.addRoutes('Main',menuArray)
        },
    }
}