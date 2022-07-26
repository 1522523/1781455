import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';//引入elementUI样式
import store from './store'
import '../api/mock'
import http from 'axios'

Vue.config.productionTip = false

Vue.use(ElementUI);//引入ElementUI
//未登录的时候不能访问我们的项目的其他内容，那么我们什么时候去校验我们的token是否存在呢
//书写导航守卫
//利用生命周期函数
// router.beforeEach((to, from, next) => {
//   // store.commit('clearToken')
//   //防止页面刷新之后丢失我们的token信息
//   //上面我们已经全局引入了，在这个页面我们使用store时不需要再进行全局引入了
//   store.commit('getToken')
//   //注意书写的顺序
//   let token = store.state.user.token
//   console.log('@token', token)
//   //如果 token 是undefined的话，则说明我们没有登录成功过
//   if (!token && to.name !== 'login') {
//     //当下一个要跳转的页面不是登录页时，则先登录，下面的login指得是路由的名称
//       next({name: 'login'})
//       console.log("李灿宇");
//   } else if (token && to.name === 'login') {
//       next({name: 'home'})
//       console.log("李慧敏");
//   } else {
//       next()
//       console.log(to.name);
//   }
// })
Vue.prototype.$http = http
http.defaults.headers.post["Content-type"]="application/json";
//登录失败的验证要用到，所以进行一下全局引入
Vue.prototype.$message =ElementUI.Message
new Vue({
  router,
  store,
  //千万不要忘了挂载以及上方的全局引入（需要全局使用的都要在这里进行挂载）
  //否则在登录的时候控制台会报错“vue使用$store.commit() undefined报错”
  render: h => h(App),
}).$mount('#app')
