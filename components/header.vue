<template>
  <div class="container">
    <el-row type="flex" justify="space-between" class="main">
      <!-- 图片 -->
      <div class="log">
        <img src="http://157.122.54.189:9093/images/logo.jpg" alt>
      </div>
      <el-row type="flex" class="link">
        <nuxt-link to="/">
          首页
        </nuxt-link>
        <nuxt-link to="/post">
          旅游攻略
        </nuxt-link>
        <nuxt-link to="/hotel">
          酒店
        </nuxt-link>
        <nuxt-link to="/air">
          国内机票
        </nuxt-link>
      </el-row>
      <div class="login">
        <nuxt-link to="/user/login">
          登录 / 注册
        </nuxt-link>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {}
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
        &:hover,&:focus,&:active{
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
}
</style>
