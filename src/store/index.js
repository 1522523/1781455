//npm install vuex@3.6.2
import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import tab from './tab'
Vue.use(Vuex)
export default new Vuex.Store(
    {
        modules:{
        user,
        tab,
        }
    }
)