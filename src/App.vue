
<router-link to="/">
Home
</router-link>

<template>
  <div id="app">
    <nav>
      <div class="container">
        <ul class="nav__left">
          <el-row :gutter="0">
              <el-col :span="8">
                  <el-link href="/"><i class="el-icon-s-home el-icon--left"></i>首页 
              </el-link>
              </el-col>

              <el-col :span="8">
                  <el-link href="/admin"><i class="el-icon-s-shop el-icon--left"></i>我要卖车 
              </el-link>
              </el-col>
              
              <el-col :span="8">
                  <el-link href="/cart"><i class="el-icon-s-goods el-icon--left"></i>我要买车 
              </el-link>
              </el-col>
              
          </el-row>
        </ul>
      </div>
    </nav>
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
