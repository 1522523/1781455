//安装库js-cookie
import Cookies from "js-cookie"

export default {
    state: {
        token: ''
    },
    mutations: {
        //添加几个方法用来改变token的值
        setToken(state, val) {
            state.token = val
            Cookies.set('token', val)
        },
        clearToken(state) {
            state.token = ''
            Cookies.remove('token')
        },
        //用于获取token的值
        getToken(state) {
            //容错处理，如果当前的缓存中含有token，如果没有则还是state中的token值，不至于报错
            //如果登录成功过，则登录成功返回的token则会存储在内存（cookies）中，
            state.token = state.token || Cookies.get('token')
        }
    }
}