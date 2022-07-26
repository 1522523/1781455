<template>
  <!-- model:表单对象 -->
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <div class="d1">注       册</div>
    <el-form-item label="用户名" prop="name" class="i1">
      <el-input
        type="name"
        v-model="ruleForm.name"
        autocomplete="off"
        class="i2"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass" class="i1">
      <el-input
        type="password"
        v-model="ruleForm.pass"
        autocomplete="off"
        class="i2"
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass" class="i1">
      <el-input
        type="password"
        v-model="ruleForm.checkPass"
        autocomplete="off"
        class="i2"
      ></el-input>
    </el-form-item>
    <el-form-item label="年龄" prop="age" class="i1">
      <el-input v-model.number="ruleForm.age" class="i2"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="register">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
// import Mock from 'mockjs'
// import { getMenu } from "../../api/data";

export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatename = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      }
      callback();
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        age: "",
        name:'',
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
        name: [{ validator: validatename, trigger: "blur" }],
      },
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    register() {
      this.$store.commit("setToken", 1);

      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style lang="less" scoped>
.d1{
    font-family: Avenir, Helvetica, Arial, sans-serif;
    margin-bottom: 25px;
    font-weight: 300;
    font-size: 20px;
}
//scoped 使style内的样式只作用于当前的界面,防止对其他页面进行影响
//less可以简化代码的编写，降低css维护的成本
.demo-ruleForm {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 310px;
  padding: 40px 40px 25px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.i1{
    display: block;
    text-align: center;
   padding-right: 20px;
}
.login_submit {
  margin: 10px auto 0 auto;
}
.login_submit2 {
  margin-right: 40px;
}
</style>