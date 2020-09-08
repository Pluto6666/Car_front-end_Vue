<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      Header
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">Aside</el-aside>
      <!-- 右侧内容主体 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    logout() {
      // 清空token
      //window.sessionStorage.clear('token')
      // 跳转到登录页
      //this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background: #373d41;
  color: #fff;
}
.el-aside {
  background: #333744;
}
.el-main {
  background: #eaedf1;
}
</style>