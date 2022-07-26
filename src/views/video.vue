<template>
  <el-row>
    <div class="d1">
      <el-col :span="8" v-for="o in 6" :key="o">
        <el-card :body-style="{ padding: '1px', height: '300px' }">
          <div class="b6">
            <div>
              <a href=""
                ><img
                  class="imgage"
                  src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F811%2F040915120S0%2F150409120S0-5-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660731560&t=7de145ff2b5ab786ac6ab5e6502ee565"
                  alt=""
                  style="display: block; width: 100%; height: 50%"
              /></a>
              <i class="bigbackground"></i>
              <i class="littlebackground"></i>
            </div>
            <span>李灿宇</span>
          </div>
        </el-card>
      </el-col>
    </div>
    <div class="d2">
      <div class="d2-1">
        <el-pagination background layout="prev, pager, next" :total="12">
        </el-pagination>
      </div>
    </div>
  </el-row>
</template>
<script>
export default {
  name: "",
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.el-row {
  display: flex;
  flex-direction: column;
}
.d2 {
  display: flex;
  justify-content: flex-end;
}
.b6 {
  /* justify-content: space-between; */
  position: relative;
  overflow: hidden;
  flex-direction: column;
  width: 100%;
  height: 283px;
}

.b6 div:nth-child(2) {
  margin-top: 5px;
  /* text-decoration: none; */
}

.b6 div:nth-child(3) {
  text-align: left;
  font-size: 12px;
  color: #c2c2c2;
  background: transparent;
}
.b6 div a {
  text-decoration: none;
  color: #000;
  font-size: 14px;
}
.littlebackground {
  position: absolute;
  left: 150px;
  top: 100px;
  margin: -35px;
  width: 70px;
  height: 70px;
  /* filter: alpha(opacity=0); */
  opacity: 0;
  transform: scale(0.7) translateZ(0);
  /* 为甚么是0.7呢？原来是70px，0.7倍变为49px,下面当鼠标移入时再变为1倍70px */
  /* transition-property: opacity, transform; */
  /* transition-duration: .5s; */
  /* zoom:1 */
}

.bigbackground {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 50%;
  background-color: #000;
  opacity: 0;
  /* filter: alpha(opacity=0); */
  /* transition: opacity .5s; */
  /* transition:opacity .5s */
}

.b6 div:hover .littlebackground {
  opacity: 0.9;
  transform: scale(1) translateZ(0);
  transition-property: opacity, transform;
  transition-duration: 0.5s;
  /* cursor:pointer */
}

.b6 div:hover .littlebackground {
  background-image: url(https://y.qq.com/ryqq/static/media/cover_play@2x.53a26efb.png?max_age=2592000);
  background-repeat: no-repeat;
  background-size: 70px 70px;
  opacity: 1;
  /* filter:none */
}

.b6 div:hover .imgage {
  transform: scale(1.06);
}

/* img:hover无效 */
.b6 div:hover .littlebackground {
  opacity: 1;
  /* filter:none */
}

.b6 div:hover .bigbackground {
  opacity: 0.2;
  /* filter: alpha(opacity=20); */
  transition: opacity 0.5s;
  /* transition:opacity .5s */
}

/* 动画效果部分完结 */

.b6 div img {
  transition: all 0.6s;
}

.d1 {
  margin-left: 60px;
}
.el-card {
  width: 300px;
  margin-bottom: 20px;
}
</style>