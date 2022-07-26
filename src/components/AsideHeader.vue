<template>

  <el-aside width="200px" background-color="#545c64" style="border: 1px  #eee">
    <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template v-slot:title><i class="el-icon-message"></i>用户管理</template>
  
          <el-menu-item @click="clickpage1"      :key="1">学生信息</el-menu-item>
          <el-menu-item @click="clickpage2"      :key="2">反馈中心</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template v-slot:title><i class="el-icon-menu"></i>物业信息</template>
        <el-menu-item-group>
          <el-menu-item index="2-1" @click="clickpage3">资源中心</el-menu-item>
          <el-menu-item index="2-2" @click="clickpage4">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template v-slot:title><i class="el-icon-setting"></i>设置</template>
        <el-menu-item-group  >
          <!-- 如果像这样写的话，一刷新的话，设置下面的子目录就会消失，因为没有存入state中的cookie中，一刷新就会消失，所以我要在data中定义一下，并用计算属性进行赋值-->
          <!-- 但是还是没有解决问题，所以就暂时用cookie存了一下 -->
          <!-- <el-menu-item index="3-1" @click="clickpage5" v-for="item in this.$store.state.tab.menu" :key="item.name">{{item.label}}</el-menu-item> -->
          <el-menu-item index="3-1" @click="clickpage5(item)" v-for="item in changesonmenu" :key="item.name">{{item.label}}</el-menu-item>
          <el-menu-item index="3-2" @click="clickpage6">注销</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
</template>
<style>
  .el-header {
    background-color: gray;
    color: #333;
    
  }
  
  .el-aside {
    
    color: #333;
  }
</style>

<script>
import Cookies from "js-cookie"
  export default {
    name:'AsideHeader',
    data() {
      return {
       sonmenu:[],
      }
    },
    computed:{
      changesonmenu() {
        const sonmeanu1=this.$store.state.tab.menu
        Cookies.set('sonmenu', JSON.stringify(sonmeanu1))
        this.sonmenu=JSON.parse(Cookies.get('menu'))
        return this.sonmenu
      }
    },
    mounted(){
      console.log(this.sonmenu);
    },
    methods:{
       clickpage1(){
         this.$router.push({
           name:'user1'//注意这里要加上‘’
         })
         let cur1={
                path: '/user',
                name: 'user1',
                label: '学生信息',
                icon: 'user1'
            }
        //控制面包屑的出现，向vuex中的mutations调取selectMenu方法改变vuex中state中的 tabsList的值（响应式）
        this.$store.commit('selectMenu', cur1)
       },
       clickpage2(){
         this.$router.push({
           name:'user2'
         })
         let cur2={
                path: '/mall',
                name: 'user2',
                label: '反馈中心',
                icon: 'user2'
            }
            this.$store.commit('selectMenu', cur2)
       },
       clickpage3(){
         this.$router.push({
           name:'user3'
         })
         let cur3={
                path: '/page1',
                name: 'user3',
                label: '选项1',
                icon: 'user3'
            }
            this.$store.commit('selectMenu', cur3)
       },
       clickpage4(){
         this.$router.push({
           name:'user4'
         })
         let cur4={
                path: '/page2',
                name: 'user4',
                label: '选项2',
                icon: 'user4'
            }
            this.$store.commit('selectMenu', cur4)
       },
       clickpage5(item){
         console.log("licanyuxjab",item.url);
         this.$router.push({
           name:item.url
         })
        //  let cur5={
        //         path: '/person',
        //         name: 'person',
        //         label: '个人中心',
        //         icon: 'person'
        //     }
            this.$store.commit('selectMenu', item)
       },
       clickpage6(){
        this.$store.commit('clearToken')
        this.$router.push('/login')
       },
    }
  };
</script>