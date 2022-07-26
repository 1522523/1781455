<template>
<!-- model:表单对象 -->
  <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
      class="login-container"
  >
    <h3 class="login_title">登陆</h3>
    <el-form-item
        label="用户名"
        label-width="80px"
        prop="username"     
        class="username"
    >
      <el-input
          type="input"
          v-model="form.username"
          auto-complete="off"
          placeholder="请输入账号"
      ></el-input>
      
    </el-form-item>

    <el-form-item
        label="密码"
        label-width="80px"
        prop="password"
    >
      <el-input
          type="password"
          v-model="form.password"
          auto-complete="off"
          placeholder="请输入密码"
      ></el-input>
      
    </el-form-item>
    <el-form-item class="login_submit">
      <el-button type="primary" @click="login" class="login_submit1">登陆</el-button>
      <el-button type="primary" @click="register" class="login_submit2">注册</el-button>
    </el-form-item>


  </el-form>
</template>
<script>

// import Mock from 'mockjs'
import {getMenu} from '../../api/data'

export default {
  name: 'login-1',
  data() {
    return {
      form: {
          username:'',
          password:'',
      },
      rules: {
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"},
          {
            min: 3,
            message: "用户名长度不能小于3位",//矫正提示语
            trigger: "blur"      //https://blog.csdn.net/sunhuaqiang1/article/details/115859916?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522165711278916781647598924%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=165711278916781647598924&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-2-115859916-null-null.142^v31^pc_search_v2,185^v2^control&utm_term=trigger%3A%20blur&spm=1018.2226.3001.4187
          }
        ],
        password: [
          {
            required: true, message: "请输入密码", trigger: "blur"
          }
        ]
      },

    }
  },
  methods: {
    login() {
      //调用接口，向接口请求返回的数据，传入所填的表单对象
      getMenu(this.form).then(({data: res}) => {
        console.log('res', res)
        //如果返回的数据表示登录成功
        if (res.code === 20000) {
         //改变token的值
          this.$store.commit('setToken', res.data.token)
          this.$router.push({name: 'home'})
        //权限管理
          this.$store.commit('clearMenu')
          this.$store.commit('setMenu', res.data.menu)
          this.$store.commit('addMenu', this.$router)

        } else {
          this.$message.warning(res.data.message)
        }
      })
    },
    register(){

      this.$store.commit('setToken', 1)
          
      this.$router.push({name: 'register'})
    },
  }
}
</script>

<style lang="less" scoped>//scoped 使style内的样式只作用于当前的界面,防止对其他页面进行影响
//less可以简化代码的编写，降低css维护的成本
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

.login_submit {
  //为什么无效呢
  margin: 10px auto 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.login_submit1{
  margin-right: 60px;
}
.login_submit2{
margin-right: 40px;
}

</style>