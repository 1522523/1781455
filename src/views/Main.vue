<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <aside-header></aside-header>
    </el-aside>
    <el-container>
      <el-header class="head">
        <div class="a0">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- 用v-for 要给每个元素加上key -->
            <el-breadcrumb-item
              v-for="item in tags"
              :key="item.path"
              :to="{ path: item.path }"
              >{{ item.label }}</el-breadcrumb-item
            >
          </el-breadcrumb>
        </div>
        <div class="a1"><h1>公 益 活 动 管 理 平 台</h1></div>
        <div class="a2">
          <img class="user" :src="userIcon" @click="ctnclick" />
        </div>
        <header></header>
        <!--为什么显示不出来-->
      </el-header>
      <div class="tags">
        <el-tag
          v-for="(tag, index) in tags"
          :key="tag.name"
          :closable="tag.name !== 'home'"
          :effect="$route.name === tag.name ? 'dark' : 'plain'"
          @click="changeMenu(tag)"
          @close="handleClose(tag, index)"
          size="small"
        >
          {{ tag.label }}
        </el-tag>
      </div>
      <el-main>
        <router-view></router-view
        ><!--嵌套路由的显示-->
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import AsideHeader from "../components/AsideHeader";
import Header from "../components/Header";
import { mapState,mapMutations } from "vuex";

export default {
  name: "home-1",
  data() {
    return {
      userIcon: require("../assets/logo.png"), //require是什么意思呢
    };
  },
  methods: {
    ctnclick() {
      this.$router.push({ name: "person" });
    },
      ...mapMutations({
        close: "closeTag",
      }), 
      //点击跳转网页
      changeMenu(item) {
        this.$router.push({ name: item.name });
      },
      //手动删除
      handleClose(tag, index) {
        const length = this.tags.length - 1;
        this.close(tag);
        if (tag.name !== this.$route.name) {
          return;
        }
        if (index === length) {
          this.$router.push({
            name: this.tags[index - 1].name,
          });
        } else {
          this.$router.push({
            name: this.tags[index].name,
          });
        }
      },
    },
  components: {
    AsideHeader,
    Header,
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
};
</script>
<style  scoped>
.head {
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  align-items: center;
}
.a0 {
  width: 400px;
  /* flex: 4; */
  align-items: center;
  color: aliceblue;
}
.a1 {
  /* flex: 4; */
  margin-left: 80px;
  margin-right: 500px;
}
.user {
  display: block;
  width: 70px;
  height: 60px;
  /* flex: 1; */
}
.tags {
  text-align: left;
  padding: 10px;
  padding-bottom: 0px;
}
.el-tag {
  margin-right: 15px;
  cursor: pointer;
}
</style>