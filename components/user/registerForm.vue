<template>
  <el-form :model="formList" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机" v-model="formList.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="formList.captcha">
        <template slot="append">
          <el-button @click="clickvalid">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="formList.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="formList.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkword">
      <el-input placeholder="确认密码" v-model="formList.checkword" type="password"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="register">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formList.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      formList: {
        username: "13800138000",
        nickname: "索克萨尔",
        captcha: "000000",
        password: "123456",
        checkword: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        nickname: [{ required: true, message: "请输入马甲", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkword: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 手机验证码
    clickvalid() {
      if (!this.formList.username) {
        this.$message.erro("手机不能为空");
        return;
      }
      this.$axios({
        url: "/captchas",
        method: "POST",
        data: { tel: this.formList.username }
      }).then(res => {
        console.log(res);
        const { code } = res.data;
        this.$alert(`手机号码验证码是:${code}`, "提示");
      });
    },
    // 注册
    register() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const { checkword, ...rest } = this.formList;
          this.$axios({
            url: "/accounts/register",
            method: "POST",
            data: rest
          }).then(res => {
            // console.log(res)
            this.$store.commit("user/setUserInfo", res.data);
            this.$message({
              message: "注册成功，正在跳转",
              type: "success"
            });
            setTimeout(() => {
              this.$router.push("/");
            }, 1000);
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>