<template>
  <el-row>
    <div class="d0">
      <el-carousel :interval="4000" type="card" height="250px">
        <el-carousel-item v-for="item in 3" :key="item" >
          <img :src="adress[item - 1]" @click="clickpage(item)" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <router-view></router-view>
  </el-row>
</template>

<script>
export default {
  name: "user3",
  data() {
    return {
      adress: [
        require("../assets/1.png"),
        require("../assets/2.png"),
        require("../assets/3.png"),
      ],
      page:[
        'arcticle',
        'image',
        'video',
      ]
    }
    
  },
  methods:{
    clickpage(value){
      this.$router.push({
           name:this.page[value-1]//注意这里要加上‘’
         })
         console.log("李灿宇");
    }
  },
};
</script>
<style lang="less" scoped>
.el-icon-arrow-right{
  margin-right: 100px;
}
.d0 {
  margin-left: 60px;
  width: 1200px;
}
.el-carousel__indicators{
  margin: 0 160px 0 0;
}
.el-carousel__item {
  height: 200px;
  width: 450px;
}
.el-carousel__item img {
  width: 100%;
  height: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

