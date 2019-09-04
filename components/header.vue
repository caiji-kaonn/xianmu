<template>
  <div class="container">
    <el-row type="flex" justify="space-between" class="main">
      <!-- 图片 -->
      <div class="log">
        <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
      </div>
      <el-row type="flex" class="link">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <!-- 在这里进行判断，如果有token值，
      就是登录过的，没有就显示已登录的状态-->
      <div class="login" v-if="!this.$store.state.user.userInfo.token">
        <nuxt-link to="/user/login">登录 / 注册</nuxt-link>
      </div>
      <!-- 设置登录成功的下拉菜单 -->
      <div v-else>
        <!-- {{ this.$store.state.user.userInfo.user.nickname}} -->
        <el-dropdown>
          <span class="el-dropdown-link">
               <img :src="` ${$axios.defaults.baseURL}${$store.state.user.userInfo.user.defaultAvatar} `" alt="">
            {{ this.$store.state.user.userInfo.user.nickname}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <!-- 退出的话，要清除登录过的数据 -->
            <el-dropdown-item @click.native='handleloginout'>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  methods:{
     handleloginout(){
     this.$store.commit('user/clearUserInfo')
     this.$message({
       message:'退出成功',
       type:'success'
     })
     }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px #ddd solid;
  box-shadow: 0 2px 2px #ddd;
  width: 100%;
  .main {
    margin: 0 auto;
    width: 1000px;
    .log {
      padding-top: 9px;
      img {
        width: 156px;
        height: 42px;
      }
    }
    .link {
      flex: 1;
      margin-left: 10px;
      a {
        padding: 0 20px;
        display: block;
        height: 60px;
        box-sizing: border-box;
        &:hover,
        &:focus,
        &:active {
          color: #6b9eff;
          border-bottom: 5px solid #6b9eff;
        }
      }
      .nuxt-link-active {
        background: #409eff;
        color: #fff;
        &:hover {
          color: #fff;
        }
      }
      .login {
        a {
          &:hover {
            color: #6b9eff;
            text-decoration: underline;
          }
        }
      }
    }
  }
  .el-dropdown-link{
    img{
      width: 36px;
      height: 36px;
      vertical-align: middle;
      border-radius: 50%;
      box-sizing:border-box;
      border: 2px solid #fff;
      &:hover{
        border: 2px solid #409eff;
      }
    }
  }
}
</style>
